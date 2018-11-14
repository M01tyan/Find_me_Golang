package modules

import (
    "database/sql"
    "log"
    "fmt"
    "time"
    "encoding/base64"
    "os"
    "strconv"
    "io/ioutil"

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
    Period       string   `json:"period"`
    Member       string   `json:"member"`
    Sites        []Sites  `json:"sites"`
    Images       []string `json:"images"`
    ImgNum       int      `json:"img_num"`
}

type Skill struct {
    Id        int     `json:"id"`
    Language  string  `json:"language"`
    Level     int     `json:"level"`
    Comment   string  `json:"comment"`
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
    // fmt.Print(sites)
    // fmt.Println(" GET BASE SITES")
    Db.Close()
    return 
}

func PostBaseSites(user_id int, sites []Sites) () {
    Db := OpenDB()
    for i, site := range sites {
        // fmt.Print(site)
        // fmt.Println(" GET SITE")
        _, err := Db.Exec("INSERT INTO BaseSites (user_id, id, url_title, url) VALUES ($1,$2,$3,$4)",user_id, i+1, site.URL_TITLE, site.URL)
        if err != nil {
            log.Println(err)
        }
    }
    Db.Close()
}


func GetStudents(user_id int) (student Students){
    Db := OpenDB()
    sites := GetBaseSites(user_id)
    err := Db.QueryRow("SELECT * FROM students WHERE user_id = $1", user_id).Scan(&user_id, &student.NAME, &student.FURIGANA, &student.UNIVERSITY, &student.DEPARTMENT, &student.SUBJECT, &student.GRADUATE, &student.LIKED)
    if err != nil {
        log.Println(err)
    }
    student.SITES = sites
    // fmt.Print(student)
    // fmt.Println(" GET STUDENT")
    Db.Close()
    return
}

func PostStudents(user_type string, user_id int, student Students) (bool) {
    Db := OpenDB()
    PostBaseSites(user_id, student.SITES)
    if(user_type == "student") {
        var id int
        err := Db.QueryRow("SELECT user_id from Students WHERE user_id=$1", user_id).Scan(&id)
        if err != nil {
            log.Println(err)
        }
        if id == 0 {
            _, err = Db.Exec("INSERT INTO Students (user_id, name, furigana, university, department, subject, graduate, liked) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",user_id, student.NAME, student.FURIGANA, student.UNIVERSITY, student.DEPARTMENT, student.SUBJECT, student.GRADUATE, student.LIKED)
            if err != nil {
                log.Println(err)
            }
        } else {
            _, err = Db.Exec("UPDATE Students SET name=$1, furigana=$2, university=$3, department=$4, subject=$5, graduate=$6, liked=$7 WHERE user_id=$8",student.NAME, student.FURIGANA, student.UNIVERSITY, student.DEPARTMENT, student.SUBJECT, student.GRADUATE, student.LIKED, user_id)
            if err != nil {
                log.Println(err)
            }
        }
    }
    Db.Close()
    return true
}

func GetUsers(login_id string, password string) (user_info UserInfo) {
    Db := OpenDB()
    err := Db.QueryRow("SELECT user_id, user_type from Users LEFT OUTER JOIN Auth ON users.id=auth.user_id WHERE login_id=$1 AND password=$2", login_id, password).Scan(&user_info.UserId, &user_info.UserType)
    if err != nil {
        log.Println(err)
    }
    // fmt.Print(user_info.UserId)
    // fmt.Println(" GET USERS ID")
    if(user_info.UserId != 0) {
        err = Db.QueryRow("SELECT furigana FROM Students WHERE user_id=$1", user_info.UserId).Scan(&user_info.Furigana)
        if err != nil {
            log.Println(err)
        }
        // fmt.Print(user_info.Furigana)
        // fmt.Println(" GET FURIGANA")
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
    // fmt.Print(user_id)
    // fmt.Println(" CHECK USERS ")
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
        user_info.UserId++
        // fmt.Print(user_info.UserId)
        // fmt.Println(" CREATE NEW USER ID")
        _, err = Db.Exec("INSERT INTO Users (id, user_type) VALUES ($1,$2)",user_info.UserId, user_info.UserType)
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
    Db.Close()
    return
}
 
func LoginedAt(user_id int) () {
    t := time.Now()
    Db := OpenDB()
    _, err := Db.Exec("UPDATE Auth SET logined_at = $1 WHERE user_id = $2",t ,user_id)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
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
    // fmt.Print(sites)
    // fmt.Println(" GET TODO SITES")
    Db.Close()
    return
}

func PostTodoSites(user_id int, todo_id int, sites []Sites) {
    Db := OpenDB()
    var id int
    err := Db.QueryRow("SELECT max(id) from TodoSites WHERE user_id=$1 AND todo_id=$2", user_id, todo_id).Scan(&id)
    for i, site := range sites {
        if i < id {
            _, err = Db.Exec("UPDATE TodoSites SET url_title=$1, url=$2 WHERE user_id=$3 AND todo_id=$4 AND id=$5", site.URL_TITLE, site.URL, user_id, todo_id, i+1)
        } else {
            _, err = Db.Exec("INSERT INTO TodoSites (user_id, todo_id, id, url_title, url) VALUES ($1,$2,$3,$4,$5)", user_id, todo_id, i+1, site.URL_TITLE, site.URL)
        }
    }
    if err != nil {
        log.Println(err)
    }
    Db.Close()
}

func DeleteTodoSite(user_id int, todo_id int, site_id int) bool {
    Db := OpenDB()
    err := Db.QueryRow("DELETE FROM TodoSites WHERE user_id=$1 AND todo_id=$2 AND id=$3", user_id, todo_id, site_id)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
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
    Db.Close()
    return
}

func PostTodoTech(user_id int, todo_id int, techs []string) {
    Db := OpenDB()
    var id int
    err := Db.QueryRow("SELECT max(id) from TodoTech WHERE user_id=$1 AND todo_id=$2", user_id, todo_id).Scan(&id)
    for i, tech := range techs {
        if i < id {
            _, err = Db.Exec("UPDATE TodoTech SET name=$1 WHERE user_id=$2 AND todo_id=$3 AND id=$4", tech, user_id, todo_id, i+1)
        } else {
            _, err = Db.Exec("INSERT INTO TodoTech (user_id, todo_id, id, name) VALUES ($1,$2,$3,$4)", user_id, todo_id, i+1, tech)
        }
    }
    if err != nil {
        log.Println(err)
    }
    Db.Close()
}

func DeleteTodoTech(user_id int, todo_id int, tech_id int) bool {
    Db := OpenDB()
    err := Db.QueryRow("DELETE FROM TodoTech WHERE user_id=$1 AND todo_id=$2 AND id=$3", user_id, todo_id, tech_id)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
}

func GetTodoImages(user_id int, todo_id int, img_length int) (images []string) {
    for i := 1; i<=img_length; i++ {
        file, _ := os.Open("./images/student/"+strconv.Itoa(user_id)+"/"+strconv.Itoa(todo_id)+"/"+strconv.Itoa(i)+".jpg")
        file_data, _ := ioutil.ReadAll(file)
        imgEnc := base64.StdEncoding.EncodeToString(file_data)
        images = append(images, "data:image/png;base64,"+imgEnc)
    }
    return
}

func PostTodoImages(user_id int, todo_id int, images []string) bool {
    for i, img := range images {
        data, _ := base64.StdEncoding.DecodeString(img)
        if err := os.MkdirAll("./images/student/"+strconv.Itoa(user_id)+"/"+strconv.Itoa(todo_id), 0777); err != nil {
            fmt.Println(err)
        }
        file, _ := os.Create("./images/student/"+strconv.Itoa(user_id)+"/"+strconv.Itoa(todo_id)+"/"+strconv.Itoa(i+1)+".jpg")
        defer file.Close()

        file.Write(data)
        
    }
    return true
}

func DeleteTodoImage(user_id string, todo_id string, img_id string) bool {
    if err := os.Remove("./images/student/"+user_id+"/"+todo_id+"/"+img_id+".jpg"); err != nil {
        fmt.Println(err)
    }
    i, _ := strconv.Atoi(img_id)
    var j int
    for j = i+1; true; j++ {
        _, err := os.Stat("./images/student/"+user_id+"/"+todo_id+"/"+strconv.Itoa(j)+".jpg")
        if err != nil {
            break;
            fmt.Println("LOOP BREAK")
        }
        if err := os.Rename("./images/student/"+user_id+"/"+todo_id+"/"+strconv.Itoa(j)+".jpg", "./images/student/"+user_id+"/"+todo_id+"/"+strconv.Itoa(j-1)+".jpg"); err != nil {
            fmt.Println(err)
        }
    }
    fmt.Println(user_id + " " + todo_id + " DELETE TODO")
    user, _ := strconv.Atoi(user_id)
    todo, _ := strconv.Atoi(todo_id)
    fmt.Println(strconv.Itoa(j) + " DELETE TODO jj")
    Db := OpenDB()
    _, err := Db.Exec("UPDATE Todos SET img_num=$1 WHERE user_id=$2 AND id=$3", j-2, user, todo)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
}

func GetTodos(user_id int) (todos []Todo) {
    Db := OpenDB()
    // fmt.Print(user_id) 
    // fmt.Println(" GET TODOS USER ID")
    rows, errs := Db.Query("SELECT id, title, detail, motivation, period, member, img_num FROM Todos WHERE user_id=$1", user_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var todo Todo
        rows.Scan(&todo.Id, &todo.Title, &todo.Detail, &todo.Motivation, &todo.Period, &todo.Member, &todo.ImgNum)
        todo.Technologies = GetTodoTech(user_id, todo.Id)
        todo.Sites = GetTodoSites(user_id, todo.Id)
        todo.Images = GetTodoImages(user_id, todo.Id, todo.ImgNum)
        todos = append(todos, todo)
    }
    // fmt.Print(todos)
    // fmt.Println(" GET TODOS")
    Db.Close()
    return 
}

func DeleteTodo(user_id int, id int) bool {
    Db := OpenDB()
    _, err := Db.Exec("DELETE FROM TodoSites WHERE user_id=$1 AND todo_id=$2", user_id, id)
    _, err = Db.Exec("DELETE FROM TodoTech WHERE user_id=$1 AND todo_id=$2", user_id, id)
    _, err = Db.Exec("DELETE FROM Todos WHERE user_id=$1 AND id=$2", user_id, id)
    if err = os.RemoveAll("./images/student/"+strconv.Itoa(user_id)+"/"+strconv.Itoa(id)); err != nil {
        fmt.Println(err)
    }
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
}

func PostTodos(user_id int, todo Todo) (response bool) {
    Db := OpenDB()
    var id int
    if todo.Id == 0 {
        err := Db.QueryRow("SELECT max(id) from Todos WHERE user_id=$1", user_id).Scan(&id)
        if err != nil {
            log.Println(err)
        }
        id = id +1
        // fmt.Print(id)
        // fmt.Println(" POST TODO ID")
        _, err = Db.Exec("INSERT INTO Todos (user_id, id, title, detail, motivation, period, member, img_num) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", user_id, id, todo.Title, todo.Detail, todo.Motivation, todo.Period, todo.Member, todo.ImgNum)
        if err != nil {
            log.Println(err)
        }
        response = true
    } else {
        id = todo.Id
        // fmt.Print(todo)
        // fmt.Println(" POST TODOS")
        _, err := Db.Exec("UPDATE Todos SET title=$1, detail=$2, motivation=$3, period=$4, member=$5, img_num=$6 WHERE user_id=$7 AND id=$8", todo.Title, todo.Detail, todo.Motivation, todo.Period, todo.Member, todo.ImgNum, user_id, id)
        if err != nil {
            log.Println(err)
        }
        response = false
    }
    Db.Close()
    PostTodoTech(user_id, id, todo.Technologies)
    PostTodoSites(user_id, id, todo.Sites)
    PostTodoImages(user_id, id, todo.Images)
    return 
}

func GetSkills(user_id int) (skills []Skill) {
    Db := OpenDB()
    rows, errs := Db.Query("SELECT id, language, level, comment FROM Skills WHERE user_id=$1", user_id)
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var skill Skill
        rows.Scan(&skill.Id, &skill.Language, &skill.Level, &skill.Comment)
        skills = append(skills, skill)
    }
    // fmt.Print(todos)
    // fmt.Println(" GET TODOS")
    Db.Close()
    return 
}

func PostSkill(user_id int, skill Skill) bool {
    Db := OpenDB()
    _, err := Db.Exec("INSERT INTO Skills (user_id,id,language,level,comment) VALUES ($1,$2,$3,$4,$5)", user_id, skill.Id, skill.Language, skill.Level, skill.Comment)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
}

func PatchSkill(user_id int, skill Skill) bool {
    Db := OpenDB()
    _, err := Db.Exec("UPDATE Skills SET language=$1, level=$2, comment=$3 WHERE user_id=$4 AND id=$5", skill.Language, skill.Level, skill.Comment, user_id, skill.Id)
    if err != nil {
        log.Println(err)
    }
    Db.Close()
    return true
}