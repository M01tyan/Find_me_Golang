package main

import (
	"net/http"
	"log"
	"os"
	"encoding/json"
	"encoding/base64"
	"strconv"
	"fmt"
	"bytes"
	_"image"
	"image/jpeg"

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

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/api/users/signIn", SignIn).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/signUp", SignUp).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/base", GetBase).Methods("GET")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/todos", GetTodos).Methods("GET")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/new/base", PostBase).Methods("POST", "OPTIONS")
    r.HandleFunc("/api/users/{userType}/{userId}/edits/icon", PostIcon).Methods("POST", "OPTIONS")

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
    unbased, _ := base64.StdEncoding.DecodeString(image.Image)
    jpgI, errJpg := jpeg.Decode(bytes.NewReader(unbased))
 	f, err := os.Create("icon.jpeg")
    if err != nil {
        panic(err)
    }
    defer f.Close()
    if _, err = f.Write([]byte(jpgI)); err != nil {
        panic(err)
    }
    if err = f.Sync(); err != nil {
        panic(err)
    }
    response := true
    w.Header().Set("Content-Type", "application/json")
    res, _ := json.Marshal(response)
	w.Write(res)
}

func GetTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := mux.Vars(r)
	user_id, _ := strconv.Atoi(id["userId"])
	response := modules.GetTodos(user_id)
	res, _ := json.Marshal(response)
	w.Write(res)
}