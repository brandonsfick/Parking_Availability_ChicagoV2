// Creating map object
var myMap = L.map("map", {
  center: [41.8857256, -87.636959],
  zoom: 11
});



// Adding tile layer to the map
var darkMap = L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_Map
  }
).addTo(myMap);

myMap.removeLayer(darkMap)

var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_Map
}).addTo(myMap);



var truth = true;
function selectMap() {
  if (truth) {
    myMap.removeLayer(lightMap)
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_Map
  }).addTo(myMap);
  } else {
    myMap.removeLayer(darkMap)
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_Map
}).addTo(myMap);
  }
  truth = !truth;
}

$('#toggleLight').on('click', selectMap);



// Store API query variables
var apiKey = API_Whiz;
//var baseURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2019-01-31T12:00&end_time=2019-01-31T20:00&api_key=${apiKey}";
var lat =41.8857256
var long = -87.6369590
var baseURL = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;

// Assemble API query URL
var url = baseURL;

// Marker Icon
var redIcon = L.icon({
  iconUrl: "marker.png",
  iconSize: [25, 40] // size of the icon
});

var yellowIcon = L.icon({
  iconUrl: "marker4.png",
  iconSize: [25, 40] // size of the icon
});

var blackIcon = L.icon({
  iconUrl: "marker3.png",
  iconSize: [25, 40] // size of the icon
});

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // Set the data location property to a variable
    var location = response[i]._embedded["pw:location"].entrances[0];
    var picture = response[i]._embedded["pw:location"].photos[0].sizes.original["URL"];
    

    // Check for location property
    if (location) {
      var popuptext = "unavailable";
      if (response[i].purchase_options.length > 0) {
        if (
          response[i].purchase_options[0].space_availability["status"] ==
          "limited"
        ) {
          markers.addLayer(
            L.marker([location.coordinates[0], location.coordinates[1]], {
              icon: yellowIcon
            }).bindPopup(
              response[i]._embedded["pw:location"].address1 +
                "<br> Status: " +
                response[i].purchase_options[0].space_availability["status"] +
                "<br> Capacity: " +
                response[i].purchase_options[0].space_availability[
                  "spaces_remaining"
                ] +
                "<br>" +
                "<br> Price: " +
                response[i].purchase_options[0].price["USD"] +
                " USD" +
                "<br>" + "<br> " + "<img width=100px height=100px src=" + picture + "/>" +
                "<br>"
            )
          );
        } else {
          // Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(
            L.marker([location.coordinates[0], location.coordinates[1]], {
              icon: redIcon
            })
              //.bindPopup(response[i]._embedded["pw:location"].address1));
              .bindPopup(
                response[i]._embedded["pw:location"].address1 +
                  "<br> Status: " +
                  response[i].purchase_options[0].space_availability["status"] +
                  "<br>" +
                  "<br> Price: " +
                  response[i].purchase_options[0].price["USD"] +
                  " USD" +
                  "<br>" + "<br> " + "<img width=100px height=100px src=" + picture + "/>" +
                  "<br>"
              )
          );
        }
      } else {
        
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(
          L.marker([location.coordinates[0], location.coordinates[1]], {
            icon: blackIcon
          })
            //.bindPopup(response[i]._embedded["pw:location"].address1));
            .bindPopup(
              response[i]._embedded["pw:location"].address1 +
                "<br> Status: " +
                popuptext +
                "<br>" + "<br> " + "<img width=100px height=100px src=" + picture + "/>" +
                "<br>"
            )
        );
      }
    }
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

  //build donut chart for parking availability
var available_array = []
var limited_array = []
var unavailable_array = []
for(var i = 0; i < response.length; i++) {
  try{if (response[i].purchase_options[0].space_availability["status"] === "available") {
    available_array.push(response[i].purchase_options[0].space_availability["status"]);
  } 
  else if (response[i].purchase_options[0].space_availability["status"] === "limited") {
    limited_array.push(response[i].purchase_options[0].space_availability["status"]);
  }}
  catch(err)
  {unavailable_array.push("unavailable")}
  
}
var available_parking = available_array.length
var limited_parking = limited_array.length
var unavailable_parking = unavailable_array.length
console.log([available_parking, limited_parking, unavailable_parking])
var data = [{
  values: [available_parking, limited_parking, unavailable_parking],
  labels: ['Available', 'Limited', 'Unavailable'],
  hole: .4,
  marker: {colors:['#D11818', '#F6E81F','#070704']},
  type: 'pie',
  name: 'Parking Availability'
}];

var layout = {
  title: "Current Parking Availability",
  height: 400,
  width: 500
};

Plotly.newPlot('plot', data, layout);

});

//// here insert function on click map 



