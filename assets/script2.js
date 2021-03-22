var userAccessToken = 'BQBRNa3KMGwW_-rht9a3j9tYBwdQLt3gOHu74ok6WDWC1USCrc2CxoAagnB_jwEM5oksd-M5lstJF2iq_-co7sRVt09kCvSwNG5eZ4rW3TEFfjObtDqdtJvYSNYbYlT4CYxsSi7lequdevkW4h_r5vkTCJS5at8';
var userInput = localStorage.getItem("search");
var artistName;
var favoriteArists = [];
fetch('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+ userInput +'&api_key=79000ec6a486b0cc93684413435a84c6&format=json').then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            artistName = data.results.artistmatches.artist[0].name;
            getArtististInfo();
            getSpotifyInfo();
            getEvents();
            document.getElementById("artistName").textContent = artistName;
        })
    }
})

var getSpotifyInfo = function() {
    fetch('https://api.spotify.com/v1/search?query='+ artistName +'&type=artist', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQB_VclTeqMbKOfEViNbVEOas4tRz2pxMsfxYj5JZsLg1loLS2tg7xnPZnZakclVGN5G5hZ74dPLfQe4ukfRBmVJRMRJIFitOnZTkMbfQTt8fh8CtVU0bp7R118HBvq7Dt4OrUl6l4H_0YtSfhZHFpcHAh2P87U'
            }
        }).then(function(response) {
            if(response.ok) {
            response.json().then(function(data) {
                var artist = data.artists.items[0];
                var headerImg = artist.images[0].url;
                const headerImgEl = document.getElementById('artistImg');
                headerImgEl.src = headerImg;
        })
    }
})

}
var getArtististInfo = function() {
    fetch(' http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ artistName +'&api_key=79000ec6a486b0cc93684413435a84c6&format=json').then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var genre = data.artist.tags.tag[0].name;
                genre = genre.charAt(0).toUpperCase() + genre.slice(1);
                var bio = data.artist.bio.content;
                document.getElementById('artistBioHeader').textContent = "About " + artistName;
                document.getElementById('artistBio').textContent = bio;
                document.getElementById('artistGenre').textContent = genre;
            })
        }
    })
}
var getEvents = function() {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?keyword='+ artistName +'&sort=date,asc&apikey=wH9MUA889uOpKEnatwDqKHSN2IHFzJhS').then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var events = data._embedded.events;
                console.log(events.length);
                for(i=0;i<events.length;i++) {
                    console.log(i);
                    var eventName = events[i].name;
                    var eventLink = events[i].url;
                    var eventDate = events[i].dates.start.localDate;
                    eventDate = moment(eventDate).format("MM-DD-YYYY");
                    console.log(eventName);
                    var eventEl = document.createElement("li");
                    eventEl.innerHTML = "<a href= '" + eventLink + "'>"+ eventDate +" "+ eventName + "</a>";
                    eventEl.className = "eventLi";
                    document.getElementById("artistEventsList").appendChild(eventEl);
                }
            })
        }
    })
}

var addFavoriteArtist = function() {
    var favoriteArists = JSON.parse(localStorage.getItem("favoriteArtists"));
    if(!favoriteArists) {
        favoriteArists = []
    }
    favoriteArists.push(artistName);
    localStorage.setItem("favoriteArtists", JSON.stringify(favoriteArists))
    console.log(favoriteArists);
}
var search = function() {
    var userInput = document.getElementById('artistSearch').value;
    localStorage.setItem("search", userInput);
    window.location.href = "./artist.html"
}
document.getElementById("searchBtn").addEventListener('click', search);
document.getElementById("favBtn").addEventListener('click', addFavoriteArtist);