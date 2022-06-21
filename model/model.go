package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func checkError(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

type User struct {
	Id           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Locations    string   `json:"locations"`
	ConcertDates string   `json:"concertDates"`
	Relations    string   `json:"relations"`
}

type AllUsers struct {
	Users []*User
}

func ShowAllUsers() (au *AllUsers) {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")

	if err != nil {
		log.Fatal(err)
	}

	body, _ := ioutil.ReadAll(resp.Body)

	var alUsrs AllUsers
	json.Unmarshal(body, &alUsrs.Users)

	checkError(err)

	return &alUsrs
}
// func UserMatch(w http.ResponseWriter, r *http.Request){
// 	id := r.FormValue("ValueId")
// }