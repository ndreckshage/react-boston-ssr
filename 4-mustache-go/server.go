package main

import "github.com/hoisie/mustache"
import "net/http"
import "fmt"
import "log"
import "io/ioutil"
import "encoding/json"

type User struct {
  Name string
  Email string
  Picture string
  Age int
  Balance string
  Tags []string
  Friends []Friend
}

type Friend struct {
  Name string
  Id int
}

func main() {
  raw, err := ioutil.ReadFile("json-generator.json")
  if err != nil {
    log.Fatal("opening json", err.Error())
  }

  var users []User
  json.Unmarshal([]byte(raw), &users)

  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    content := mustache.RenderFile("application.mustache", users)
    fmt.Fprintf(w, "<!DOCTYPE html><html><head></head><body><div id='react'>%s</div><script>window.INITIAL_DATA = %s;</script></body></html>", content, raw)
  })

  log.Fatal(http.ListenAndServe(":3000", nil))
}
