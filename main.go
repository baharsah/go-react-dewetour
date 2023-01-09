package main

import (
	"baharsah/helper/mysql"
	"baharsah/migration"
	"baharsah/router"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {

	// Cors
	// Setup allowed Header, Method, and Origin for CORS on this below code ...
	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	err := godotenv.Load()
	if err != nil {

	}

	mysql.DBInit()
	migration.RunMigration()

	r := mux.NewRouter()
	router.Router(r.PathPrefix("/api/v1").Subrouter())
	log.Println("Server Running!")

	srverr := http.ListenAndServe(":"+os.Getenv("PORT"), handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
	log.Println(srverr)
}
