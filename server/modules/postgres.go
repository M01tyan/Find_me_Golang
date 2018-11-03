package modules

import (
    "database/sql"
    "log"
    "fmt"
    "time"

    _ "github.com/lib/pq"
)

type Sites struct {
    URL_TITLE string `json:"url_title"`
    URL       string `json:"url"`
}

type Students struct {
    NAME       string   `json:"name"`
    FURIGANA   string   `json:"furigana"`
    UNIVERSITY string   `json:"university"`
    DEPARTMENT string   `json:"department"`
    SUBJECT    string   `json:"subject"`
    GRADUATE   int      `json:"graduate"`
    LIKED      int      `json:"liked"`
    SITES      []Sites  `json:"sites"`
}

type Todo struct {
    Id           int      `json:"id"`
    Title        string   `json:"title"`
    Detail       string   `json:"detail"`
    Motivation   string   `json:"motivation"`
    Technologies []string `json:"technologies"`
    SiteId       int      `json:"site_id"`
    Period       string   `json:"period"`
    Member       string   `json:"member"`
    Sites        []Sites  `json:"sites"`
    Images       []string `json:"images"`
}

type UserInfo struct {
    UserId      int     `json:"user_id"`
    UserType    string  `json:"user_type"`
    Furigana    string  `json:"furigana"`
    Status      bool    `json:"status"`
}

type NewUserInfo struct {
    UserId      int    `json:"user_id"`
    UserType    string `json:"user_type"`
    Status      bool   `json:"status"`
}

var Db *sql.DB

func OpenDB() (Db *sql.DB){
    Db, err := sql.Open("postgres", "user=m01tyan password=No.1runner dbname=Find_me sslmode=disable")
    if err != nil {
        log.Print(err)
        Db.Close()
    }
    return
}

func GetBaseSites(user_id int) (sites []Sites){
    Db := OpenDB()
    rows, errs := Db.Query("SELECT url_title, url FROM BaseSites WHERE user_id = $1", user_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var site Sites
        rows.Scan(&site.URL_TITLE, &site.URL)
        sites = append(sites, site)
    }
    fmt.Print(sites)
    fmt.Println(" GET BASE SITES")
    Db.Close()
    return 
}

func GetTodoSites(user_id int, todo_id int) (sites []Sites) {
    Db := OpenDB()
    rows, errs := Db.Query("SELECT url_title, url FROM TodoSites WHERE user_id=$1 AND todo_id=$2", user_id, todo_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var site Sites
        rows.Scan(&site.URL_TITLE, &site.URL)
        sites = append(sites, site)
    }
    fmt.Print(sites)
    fmt.Println(" GET TODO SITES")
    Db.Close()
    return
}

func PostSites(user_id int, sites []Sites) () {
    Db := OpenDB()
    for i, site := range sites {
        fmt.Print(site)
        fmt.Println(" GET SITE")
        _, err := Db.Exec("INSERT INTO BaseSites (user_id, id, url_title, url) VALUES ($1,$2,$3,$4)",user_id, i+1, site.URL_TITLE, site.URL)
        if err != nil {
            log.Println(err)
        }
    }
}

func GetStudents(user_id int) (student Students){
    Db := OpenDB()
    sites := GetBaseSites(user_id)
    err := Db.QueryRow("SELECT * FROM students WHERE user_id = $1", user_id).Scan(&user_id, &student.NAME, &student.FURIGANA, &student.UNIVERSITY, &student.DEPARTMENT, &student.SUBJECT, &student.GRADUATE, &student.LIKED)
    if err != nil {
        log.Println(err)
    }
    student.SITES = sites
    fmt.Print(student)
    fmt.Println(" GET STUDENT")
    Db.Close()
    return
}

func PostStudents(user_type string, user_id int, student Students) (bool) {
    Db := OpenDB()
    PostSites(user_id, student.SITES)
    if(user_type == "student") {
       _, err := Db.Exec("INSERT INTO Students (user_id, name, furigana, university, department, subject, graduate, liked) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",user_id, student.NAME, student.FURIGANA, student.UNIVERSITY, student.DEPARTMENT, student.SUBJECT, student.GRADUATE, student.LIKED)
        if err != nil {
            log.Println(err)
        }
    }
    return true
}

func GetUsers(login_id string, password string) (user_info UserInfo) {
    Db := OpenDB()
    err := Db.QueryRow("SELECT user_id, user_type from Users LEFt OUTER JOIN Auth ON users.id=auth.user_id WHERE login_id=$1 AND password=$2", login_id, password).Scan(&user_info.UserId, &user_info.UserType)
    if err != nil {
        log.Println(err)
    }
    fmt.Print(user_info.UserId)
    fmt.Println(" GET USERS ID")
    if(user_info.UserId != 0) {
        err = Db.QueryRow("SELECT furigana FROM Students WHERE user_id=$1", user_info.UserId).Scan(&user_info.Furigana)
        if err != nil {
            log.Println(err)
        }
        fmt.Print(user_info.Furigana)
        fmt.Println(" GET FURIGANA")
        user_info.Status = true
        LoginedAt(user_info.UserId)
    } else {
        user_info.Status = false
    }
    Db.Close()
    return
}

func CheckUsers(login_id string, password string) (bool) {
    Db := OpenDB()
    var user_id int
    err := Db.QueryRow("SELECT user_id from Auth WHERE login_id=$1 AND password=$2", login_id, password).Scan(&user_id)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    fmt.Print(user_id)
    fmt.Println(" CHECK USERS ")
    if(user_id==0) {
        return false
    } else {
        return true
    }
}

func CreateUser(login_id string, password string, user_type string) (user_info NewUserInfo){
    if(CheckUsers(login_id, password) == false) {
        user_info.UserType = user_type
        Db := OpenDB()
        err := Db.QueryRow("SELECT max(id) from Users").Scan(&user_info.UserId)
        if err != nil {
            log.Println(err)
        }
        _, err = Db.Exec("INSERT INTO Users (id, user_type) VALUES ($1,$2)",user_info.UserId+1, user_info.UserType)
        if err != nil {
            log.Println(err)
        }
        _, err = Db.Exec("INSERT INTO Auth (user_id, login_id, password) VALUES ($1, $2, $3)", user_info.UserId, login_id, password)
        if err != nil {
            log.Println(err)
        }
        user_info.Status = true
    } else {
        user_info.Status = false
    }
    LoginedAt(user_info.UserId)
    return
}
 
func LoginedAt(user_id int) () {
    t := time.Now()
    Db := OpenDB()
    _, err := Db.Exec("UPDATE Auth SET logined_at = $1 WHERE user_id = $2",t ,user_id)
    if err != nil {
        log.Println(err)
    }
}

func GetTodoTech(user_id int, todo_id int) (technology []string) {
    Db := OpenDB()
    rows, errs := Db.Query("SELECT name FROM TodoTech WHERE user_id=$1 AND todo_id=$2", user_id, todo_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var tech string
        rows.Scan(&tech)
        technology = append(technology, tech)
    }
    return
}

func GetTodos(user_id int) (todos []Todo) {
    Db := OpenDB()
    fmt.Print(user_id) 
    fmt.Println(" GET TODOS USER ID")
    rows, errs := Db.Query("SELECT id, title, detail, motivation, site_id, period, member FROM Todos WHERE user_id=$1", user_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var todo Todo
        rows.Scan(&todo.Id, &todo.Title, &todo.Detail, &todo.Motivation, &todo.SiteId, &todo.Period, &todo.Member)
        todo.Technologies = GetTodoTech(user_id, todo.Id)
        todo.Sites = GetTodoSites(user_id, todo.SiteId)
        todo.Images = append(todo.Images, "a")
        todos = append(todos, todo)
    }
    fmt.Print(todos)
    fmt.Println(" GET TODOS")
    Db.Close()
    return 
}