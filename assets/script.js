var userInput;
var search = function() {
    var userInput = document.getElementById('artistSearch').value;
    localStorage.setItem("search", userInput);
    window.location.href = "./artist.html"
}
document.getElementById("searchBtn").addEventListener('click', search);

//Event Listener
// const submitButton = document.getElementById("submit");
// submitButton.addEventListener("click", (saveToLocalStorage) => {
// console.log(submitButton);
// })
//Fetch for TicketMaster API Key wH9MUA889uOpKEnatwDqKHSN2IHFzJhS
fetch (
    'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US=devjam&source=universe&countryCode=US&apikey=wH9MUA889uOpKEnatwDqKHSN2IHFzJhS'
    )
            .then(function(response) {
                console.log(response);
              return response.json();
            })
            .then(function(data) {
              console.log(data);
                        
            });
            document.addEventListener('DOMContentLoaded', function() {
                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                  initialView: 'dayGridMonth',
                
                });
                calendar.render();
              });
var favoriteArtistsList = function() {
    var artistsList = JSON.parse(localStorage.getItem("favoriteArtists"));
    for (i=0;i<artistsList.length;i++) {
        var artistListEl = document.createElement('li');
        artistListEl.textContent = artistsList[i];
        artistListEl.className = "favArtist";
        artistListEl.id = "favArtist";
        console.log(artistListEl);
        document.getElementById("favoriteArtistsList").appendChild(artistListEl);
    }
}
var artistLink = function() {
    target = this;
    var artistSearch = target.textContent;
    console.log(artistSearch);
}

favoriteArtistsList();
document.querySelectorAll('#favArtist').addEventListener
