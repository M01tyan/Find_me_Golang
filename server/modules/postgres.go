package modules

import (
    "database/sql"
    "log"
    "fmt"

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
    LIKED      int      `json:"liked"`
    SITES       []Sites `json:"sites"`
    GRADUATE   string   `json:"graduate"`
    TODO_ID    int      `json:"todo_id"`
    VISITOR_ID int      `json:"visitor_id"`
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

func GetSites() (sites []Sites){
    Db := OpenDB()
    rows, errs := Db.Query("SELECT url_title, url FROM users LEFT OUTER JOIN Sites ON (users.id = sites.user_id)")
    if errs != nil {
        log.Println(errs)
    }
    for rows.Next() {
        var site Sites
        rows.Scan(&site.URL_TITLE, &site.URL)
        sites = append(sites, site)
    }
    fmt.Print(sites)
    Db.Close()
    return 
}

func GetStudents() (student Students){
    Db := OpenDB()
    sites := GetSites()
    err := Db.QueryRow("SELECT name, furigana, university, department, subject, liked, graduate, todo_id, visitor_id FROM users LEFT OUTER JOIN students ON (users.id = students.user_id)").Scan(&student.NAME, &student.FURIGANA, &student.UNIVERSITY, &student.DEPARTMENT, &student.SUBJECT, &student.LIKED, &student.GRADUATE, &student.TODO_ID, &student.VISITOR_ID)
    if err != nil {
        log.Println(err)
    }
    student.SITES = sites
    fmt.Print(student)
    Db.Close()
    return
}