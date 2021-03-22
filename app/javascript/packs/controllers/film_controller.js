import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["name"];
  log() {
    fetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${this.nameTarget.value}?rapidapi-key=<%= ENV["RAPID_API_KEY"]`
    )
      .then(resp => resp.json())
      .then(objects => {
        if (objects.titles.length > 0) {
          objects.titles.map(film => {
            document.getElementById(
              "films"
            ).innerHTML += `<div class="mx-auto"><h1 class="text-green">${film.title}</h1><img src="${film.image}" class="img-card" /><a href="https://www.imdb.com/title/${film.id}" target="_blank">View IMDB</a></div>`;
          });
        } else {
          document.getElementById("films").innerHTML = "";
          alert("There are no films with this title");
        }
      });
  }
}
