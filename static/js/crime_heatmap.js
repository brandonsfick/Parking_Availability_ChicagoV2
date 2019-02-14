
//need "crime_heatmap tag in html"
// var myMap = L.map("map", {
//     center: [41.8781, 87.6298],
//     zoom: 13
//   });
  
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: MAPBOX_API_KEY
//   }).addTo(myMap);


  //get the data
  url = "/crime_data/"

  d3.json(url, function(response){
      console.log(response)
      var heatArray = [];

      for (var i = 0; i < response.length; i++) {
        var coordinates = [response[i].latitude, response[i].longitude]

        console.log(coordinates)
    
        if (location) {
          heatArray.push(coordinates);
        }
      }
    
      var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
      }).addTo(myMap);
  });