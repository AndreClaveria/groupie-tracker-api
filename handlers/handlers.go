package handlers

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"math/rand"
	"strconv"
	"time"

	// "math/rand"
	"net/http"
	// "strconv"

	model "../model"
)

type Artist struct {
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

type ArtistTemplate struct { //Creation of the slice ArtistTemplate with the Artist slice and the slice Template
	Artist    Artist
	Relations Relations
}

type Relations struct {
	ID             int64               `json:"id"`
	DatesLocations map[string][]string `json:"datesLocations"`
}

func UnmarshalArtist(data []byte) (Artist, error) { //Decode string the array Artist in a string
	var r Artist
	err := json.Unmarshal(data, &r)
	fmt.Println(r)
	return r, err
}
func UnmarshalRelations(data []byte) (Relations, error) { //Decode the array Relation in a string
	var r Relations
	err := json.Unmarshal(data, &r)
	return r, err
}

func checkError(err error) { // checkerror
	if err != nil {
		fmt.Println(err)
	}
}

func getUserFunc(w http.ResponseWriter, id string) ArtistTemplate {

	artist := getArtist(id)
	relations := getRelations(id)
	var intoTemplate ArtistTemplate = ArtistTemplate{Artist: artist, Relations: relations} //Creation of the slice ArtistTemplate with the Artist slice and the slice Template
	return intoTemplate
}

func getRelations(id string) Relations {
	url := fmt.Sprintf("https://groupietrackers.herokuapp.com/api/relation/%s", id)
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	relations, err := UnmarshalRelations(body)
	if err != nil {
		fmt.Println(err)
	}
	return relations
}

func getArtist(id string) Artist { //recover the url of the site in fonction of the given ID
	url := fmt.Sprintf("https://groupietrackers.herokuapp.com/api/artists/%s", id)
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	artist, err := UnmarshalArtist(body)
	if err != nil {
		fmt.Println(err)
	}
	return artist
}

func ShowUserFunc(w http.ResponseWriter, r *http.Request) { //ecover the ID of the artist on IndexPage, and allow to display the artist on showUserPage
	id := r.FormValue("idUserPage")
	//    id := "1"
	fmt.Println(id)
	k := getUserFunc(w, id)
	t, err := template.ParseFiles("html/showUserPage.html")
	checkError(err)
	t.Execute(w, k)
}

func ShowTinderFunc(w http.ResponseWriter, r *http.Request) { //allow to display a ramdom artist in the list
	rand.Seed(time.Now().UnixNano())
	ramdom := rand.Intn(51)
	ramdom = ramdom + 1
	aa := strconv.Itoa(ramdom)
	k := getUserFunc(w, aa)
	t, err := template.ParseFiles("html/tinder.html")

	checkError(err)
	t.Execute(w, k)
}

func ShowAllUsersPageFunc(w http.ResponseWriter, r *http.Request) { //recover the array of User and display it on IndexPage
	au := model.ShowAllUsers()

	t, err := template.ParseFiles("html/indexPage.html")
	checkError(err)
	t.Execute(w, au)
}
func IndexPageFunc(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("html/index.html")
	t.Execute(w, t)
}

func UserMatch(w http.ResponseWriter, r *http.Request) { //recover the value({{ .Artist.Id }}) who have the name "valueId" in tinder.html
	id := r.FormValue("valueId")
	fmt.Println(id)

	k := getUserFunc(w, id)
	t, err := template.ParseFiles("html/match.html")
	checkError(err)
	t.Execute(w, k)

}
