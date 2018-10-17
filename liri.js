
var fs = require('fs');
var Bands = require('bands');
var spotify = require('spotify');
var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {


        if (err) {
            console.log(err);
        }

       
        else {
          
        }

    });
};

var keys = require('./keys.js');




run();

function run() {
  if (input1 === "spotify-this-song") {

        if (input2.length < 1) {

            input2 = "The Sign Ace of Base";
        };

        spotify.search({ type: 'track', query: input2 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log('');
            console.log('Spotify Song Information Results: ');
            console.log('--------------------------');
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
            console.log('--------------------------');
        });

        log();

    } else if (input1 === "movie-this") {

        if (input2.length < 1) {

            input2 = "Mr. Nobody";
        };

        
        request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {

           
            if (!error && response.statusCode === 200) {

                
                console.log('');
                console.log('OMDB Movie Information: ');
                console.log('--------------------------');
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Year of Release: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Countries produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Movie Plot: " + JSON.parse(body).Plot);
                console.log("Actor(s): " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
                console.log('--------------------------');
            } else {

                console.log(error);

            }

        });

        log();

    } else if (input1 === "do-what-it-says") {

        log();

        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;
           

            var arr = data.split(',');

            input1 = arr[0].trim();
            input2 = arr[1].trim();
            run();

        });

    }
    function bandsloc(){
        let  url = "https://rest.bandsintown.com/artists/"+arg2+"/events?app_id="+keys.keys.bands
        request(url, function (error, response, body) {
        fs.appendFile("log.txt", `Command :${arg1}  Band Title :${arg2}`,function(){})
        let information = JSON.parse(body)
        for (i in information){
          var time = moment(information[i].datetime,"YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY")
     
          var write =
      `
      Venue Name : ${information[i].venue.name}
      Location : ${information[i].venue.city}, ${information[i].venue.country}
      Date : ${time}
      ---------------
      `
      console.log(write)
      fs.appendFile("log.txt",write, function(){})
          }
        });
      }
};
