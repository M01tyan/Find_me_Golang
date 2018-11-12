package main

import (
	"net/http"
	"log"
	"os"
	"encoding/json"
	"encoding/base64"
	"strconv"
	"fmt"
	"io/ioutil"

	"github.com/M01tyan/React_with_Go/server/modules"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

type Acount struct {
	LoginId string
	Password string
	UserType string
}

type Icon struct {
	Image string `json:"image"`
}

type DeleteTodoId struct {
	Id string `json:"id"`
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/api/users/signIn", SignIn).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/signUp", SignUp).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/base", GetBase).Methods("GET")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos", GetTodos).Methods("GET")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos", DeleteTodo).Methods("DELETE", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos", PostTodos).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos/tech", DeleteTech).Methods("DELETE", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos/site", DeleteSite).Methods("DELETE", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/base", PostBase).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/icon", PostIcon).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/icon", GetIcon).Methods("GET")

    routerWithCORS := handlers.CORS(
    	handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"}),
    	handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedHeaders([]string{"Content-Type", "application/json", ""}),
    )(r)
    log.Fatal(http.ListenAndServe(":8000", routerWithCORS))

}

func SignIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
    var sign_in Acount
    error := decoder.Decode(&sign_in)
    if error != nil {
        w.Write([]byte("json decode error" + error.Error() + "\n"))
    }
    fmt.Println(sign_in)
	id := modules.GetUsers(sign_in.LoginId, sign_in.Password)
	res, _ := json.Marshal(id)
	w.Write(res)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
    var sign_up Acount
    error := decoder.Decode(&sign_up)
    if error != nil {
        w.Write([]byte("json decode error" + error.Error() + "\n"))
    }
	status := modules.CreateUser(sign_up.LoginId, sign_up.Password, sign_up.UserType)
	res, _ := json.Marshal(status)
	w.Write(res)
}

func GetBase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := mux.Vars(r)
	fmt.Print(strconv.Atoi(id["userId"]))
	fmt.Println(" GET BASE PARAMS")
	user_id, _ := strconv.Atoi(id["userId"])
	response := modules.GetStudents(user_id)
	res, _ := json.Marshal(response)
	w.Write(res)
}

func PostBase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
    var student modules.Students
    error := decoder.Decode(&student)
    if error != nil {
        w.Write([]byte("json decode error" + error.Error() + "\n"))
    }
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	fmt.Print(user_id)
	fmt.Println(" GET POST BASE USER ID")
	response := modules.PostStudents(id["userType"], user_id, student)
	res, _ := json.Marshal(response)
	w.Write(res)
}

func PostIcon(w http.ResponseWriter, r *http.Request) {
	//MultipartReaderを用いて受け取ったファイルを読み込み
	var image Icon
	decoder := json.NewDecoder(r.Body)
	error := decoder.Decode(&image)
    if error != nil {
        w.Write([]byte("json decode error" + error.Error() + "\n"))
    }
    data, _ := base64.StdEncoding.DecodeString(image.Image)
    id := mux.Vars(r)
    if err := os.MkdirAll("./images/"+id["userType"]+"/"+id["userId"], 0777); err != nil {
        fmt.Println(err)
    }
	file, _ := os.Create("./images/"+id["userType"]+"/"+id["userId"]+"/"+"icon.jpg")
	defer file.Close()

	file.Write(data)
    response := true
    w.Header().Set("Content-Type", "application/json")
    res, _ := json.Marshal(response)
	w.Write(res)
}

func GetIcon(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	file, _ := os.Open("./images/"+id["userType"]+"/"+id["userId"]+"/icon.jpg")
	file_data, _ := ioutil.ReadAll(file)
	imgEnc := base64.StdEncoding.EncodeToString(file_data)
	w.Header().Set("Content-Type", "application/json")
    res, _ := json.Marshal(imgEnc)
    w.Write(res)
}

func GetTodos(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	response := modules.GetTodos(user_id)
	w.Header().Set("Content-Type", "application/json")
	res, _ := json.Marshal(response)
	w.Write(res)
}


func PostTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
    var todo modules.Todo
    error := decoder.Decode(&todo)
    if error != nil {
        w.Write([]byte("json decode error" + error.Error() + "\n"))
    }
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	response := modules.PostTodos(user_id, todo)
	w.Header().Set("Content-Type", "application/json")
	res, _ := json.Marshal(response)
	w.Write(res)
}

func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	todo, _ := r.URL.Query()["id"]
	todo_id, _ := strconv.Atoi(todo[0])
    fmt.Println(" DELETE TODO ID")
    response := modules.DeleteTodo(user_id, todo_id)
    w.Header().Set("Content-Type", "application/json")
	res, _ := json.Marshal(response)
	w.Write(res)
}

func DeleteTech(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	todo, _ := r.URL.Query()["todo_id"]
	todo_id, _ := strconv.Atoi(todo[0])
	tech, _ := r.URL.Query()["id"]
	tech_id, _ := strconv.Atoi(tech[0])
	response := modules.DeleteTodoTech(user_id, todo_id, tech_id)
	w.Header().Set("Content-Type", "application/json")
	res, _ := json.Marshal(response)
	w.Write(res)
}

func DeleteSite(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	todo, _ := r.URL.Query()["todo_id"]
	todo_id, _ := strconv.Atoi(todo[0])
	site, _ := r.URL.Query()["id"]
	site_id, _ := strconv.Atoi(site[0])
	response := modules.DeleteTodoSite(user_id, todo_id, site_id)
	w.Header().Set("Content-Type", "application/json")
	res, _ := json.Marshal(response)
	w.Write(res)
}