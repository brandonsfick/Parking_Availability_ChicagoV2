var popup = L.popup();
var lat = 0;
var long = 0;


function onMapClick(e) {
    popup.setLatLng(e.latlng);
  
    var lat = e.latlng["lat"];
    var long = e.latlng["lng"];
  
    var baseURL2 = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;
  
    // Assemble API query URL
    var url2 = baseURL2;
    console.log(lat + " " + long + url2);

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
    d3.json(url2, function(response) {
  
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
};



//myMap.on('click', onMapClick);

