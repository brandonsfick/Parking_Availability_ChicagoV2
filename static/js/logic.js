// Creating map object
var myMap = L.map("map", {
  center: [41.8857256, -87.6369590],
  zoom: 11
});
var popup = L.popup();
var lat = 41.8857256
var long = -87.6369590
function onMapClick(e) {
  popup
      .setLatLng(e.latlng);
      
// var latlngArray = e.latlng.split(", ",2);
// popup.setContent(latlngArray[0] + ", " +latlngArray[1].toString())


var lat = e.latlng['lat']
var long =e.latlng['long'];
};


myMap.on('click', onMapClick);
// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_Map
}).addTo(myMap);

// Store API query variables
var apiKey = API_Whiz;
//var baseURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2019-01-31T12:00&end_time=2019-01-31T20:00&api_key=${apiKey}";
// var Lat =41.8857256
// var Long = -87.6369590
var baseURL = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;

// Assemble API query URL
var url = baseURL;

// Grab the data with d3
d3.json(url, function(response) {

  console.log(response)

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i]._embedded["pw:location"].entrances[0];
    

    // Check for location property
    if (location) {

      var popuptext = "unavailable";
      if (response[i].purchase_options.length > 0)  {

        if (response[i].purchase_options[0].space_availability["status"] == "limited") {
           markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
          .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + response[i].purchase_options[0].space_availability["status"] + "<br> Capacity: " + response[i].purchase_options[0].space_availability["spaces_remaining"]+ "<br>" + "<br> Price: " + response[i].purchase_options[0].price["USD"]+ " USD" + "<br>"));
        } else {
          // Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
          //.bindPopup(response[i]._embedded["pw:location"].address1));
          .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + response[i].purchase_options[0].space_availability["status"] + "<br>" + "<br> Price: " + response[i].purchase_options[0].price["USD"]+ " USD" + "<br>"));
        }
        
      } else {
        // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
      //.bindPopup(response[i]._embedded["pw:location"].address1));
      .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + popuptext + "<br>"));
      }

      

    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

function onMapClick(e) {
  popup
      .setLatLng(e.latlng);
      
// var latlngArray = e.latlng.split(", ",2);
// popup.setContent(latlngArray[0] + ", " +latlngArray[1].toString())


var lat = e.latlng['lat']
var long = e.latlng['lng'];

var baseURL = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;

// Assemble API query URL
var url = baseURL;
console.log(lat + " " + long + url)
// Grab the data with d3
d3.json(url, function(response) {

  console.log(response)

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i]._embedded["pw:location"].entrances[0];
    

    // Check for location property
    if (location) {

      var popuptext = "unavailable";
      if (response[i].purchase_options.length > 0)  {

        if (response[i].purchase_options[0].space_availability["status"] == "limited") {
           markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
          .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + response[i].purchase_options[0].space_availability["status"] + "<br> Capacity: " + response[i].purchase_options[0].space_availability["spaces_remaining"]+ "<br>"));
        } else {
          // Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
          //.bindPopup(response[i]._embedded["pw:location"].address1));
          .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + response[i].purchase_options[0].space_availability["status"] + "<br>"));
        }
        
      } else {
        // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]])
      //.bindPopup(response[i]._embedded["pw:location"].address1));
      .bindPopup(response[i]._embedded["pw:location"].address1 + "<br> Status: " + popuptext + "<br>"));
      }

      

    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});};
