package main

import (
	"fmt"
	"net/http"

	handlers "./handlers"
)

func main() {
	//Allow the link of the CSS to the html file
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/html/", http.StripPrefix("/html/", http.FileServer(http.Dir("html"))))
	http.HandleFunc("/", handlers.IndexPageFunc)
	http.HandleFunc("/indexPage.html", handlers.ShowAllUsersPageFunc)
	http.HandleFunc("/showUserPage.html", handlers.ShowUserFunc)
	http.HandleFunc("/tinder.html", handlers.ShowTinderFunc)
	http.HandleFunc("/match.html", handlers.UserMatch)

	fmt.Print("server online \n")

	fmt.Print("\nhttp://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
