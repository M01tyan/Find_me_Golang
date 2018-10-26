package main

import (
	"net/http"
	"log"
	"encoding/json"

	"github.com/M01tyan/React_with_Go/server/modules"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

func main() {
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
    allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"})

    r := mux.NewRouter()
    r.HandleFunc("/api/users", UserHandler).Methods("GET")

    log.Fatal(http.ListenAndServe(":8000", handlers.CORS(allowedOrigins, allowedMethods)(r)))
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	student := modules.GetStudents()
	res, _ := json.Marshal(student)
	w.Write(res)
}