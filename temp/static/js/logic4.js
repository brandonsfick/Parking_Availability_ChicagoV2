
// Store API query variables
var apiKey = API_Whiz;
//var baseURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2019-01-31T12:00&end_time=2019-01-31T20:00&api_key=${apiKey}";
var lat =41.8857256
var long = -87.6369590
var baseURL = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;

// Assemble API query URL
var url = baseURL;


// Grab the data with d3
markers = d3.json(url, function(response) {
  console.log(response);      
});

function markerOnClick(e) {
 
    console.log("this is a test");
    
  };

markers.on("click", markerOnClick);