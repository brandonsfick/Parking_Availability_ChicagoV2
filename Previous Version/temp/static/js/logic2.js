// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    //var location = d3.select("#locationInput").node().value;
    //console.log(location);
  
    var YOUR_APP_ID = "";
    var YOUR_APP_CODE = "";
    var str = d3.select("#locationInput").node().value;
    console.log(str);
  
    var replaced = str.split(' ').join('+');
    console.log(replaced);
  
    // clear the input value
    d3.select("#locationInput").node().value = "";


  
  
    var url = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${str}&app_id=${YOUR_APP_ID}&app_code=${YOUR_APP_CODE}&gen=9`;
    console.log(url);
  
  
  
  // d3.json(url).then(function(response) {
  //   console.log(response.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
  //   console.log(response.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
  
  // });
  
  
  d3.json(url, function(response) {
  
  //console.log(response.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
  //console.log(response.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
   lat1 = response.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
   long1 = response.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
  
  console.log(lat1);
  console.log(long1);
   
  var apiKey = API_Whiz;
  //var baseURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2019-01-31T12:00&end_time=2019-01-31T20:00&api_key=${apiKey}";
  // var Lat =41.8857256
  // var Long = -87.6369590
  var baseURL1 = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat1},${long1} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;
  
  // Assemble API query URL
  var url1 = baseURL1;

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
  d3.json(url1, function(response) {
  
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
                "<br>"
            )
        );
      }
    }
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});
  
  });
  
  
  
  }
  
  
  // Add event listener for submit button
  d3.select("#submit").on("click", handleSubmit);
