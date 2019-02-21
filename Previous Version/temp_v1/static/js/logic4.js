
// // Store API query variables
// var apiKey = API_Whiz;
// //var baseURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2019-01-31T12:00&end_time=2019-01-31T20:00&api_key=${apiKey}";
// var lat =41.8857256
// var long = -87.6369590
// var baseURL = `https://api.parkwhiz.com/v4/quotes/?q=coordinates:${lat},${long} distance:50&start_time=2019-02-09T12:00&end_time=2019-02-09T22:00&api_key=${apiKey}`;

// // Assemble API query URL
// var url = baseURL;


// // // Grab the data with d3
// // var test = d3.json(url, function(response) {
// //   console.log(response);

// //   // Create a new marker cluster group
// //   var markers = L.markerClusterGroup();

// //   // Loop through data
// //   for (var i = 0; i < response.length; i++) {
// //     // Set the data location property to a variable
// //     var picture = response[i]._embedded["pw:location"].photos[0].sizes.original["URL"];

// //     if (picture) {

// //       // Add a new marker to the cluster group and bind a pop-up
// //       markers.addLayer(picture);
// //     }


// //   };
  
// // });

// // Grab the data with d3
// d3.json(url, function(response) {
//   console.log(response);

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < response.length; i++) {
//     // Set the data location property to a variable
//     var location = response[i]._embedded["pw:location"].entrances[0];

//     // Check for location property
//     if (location) {
//            var markers = L.marker([location.coordinates[0], location.coordinates[1]]);



//             // function onClick(e) {
//             //   console.log("hello");
//             // }
//             //(function(e){
//               //console.log("new test")
//               //$('#marker').response[i]._embedded["pw:location"].photos[0].sizes.original["URL"];
//             //})
//         }
//     }
    
    
   


//   });





