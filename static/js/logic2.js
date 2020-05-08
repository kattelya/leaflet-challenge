// use week 17 exercises - to do this homework 
// define our link for our map data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data){
  console.log(data);
   mapFeatures(data.features);
});

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquak
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
function mapFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + new Date(feature.properties.time) + "</p><hr><p>" + feature.properties.mag + "</p>");
  }

  // use week 17 day 2 exercise 01 - basic NYC exercise
  // writting my codes in tenary options learn from my c language
  // Function to determine marker color based on magnitude 
  // color notes (0-Aqua, 1-yellow, 2-gold, 3-coral, 4-red, 5-chrimson, 6-Dark Magenta)
  // https://www.w3schools.com/tags/ref_colornames.asp color guide 
  function magnitudeColor(mag) {
    return  mag > 6 ? "#*B008B"  : 
            mag > 5 ? "#DC143C" : 
            mag > 4 ? "#FF0000" :
            mag > 3 ? "#FF7F50" : 
            mag > 2 ? "#FFD700" : 
            mag > 1 ? "#FFFF00" : "#00FFFF";
  }

  function markerSize(mag) {
    return mag * 3
  }

  // https://leafletjs.com/examples/geojson/ <- pointToLayer study and tutor guide
  var earthquakes = L.geoJson(earthquakeData, {
    pointToLayer : function(earthquakeData, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(earthquakeData.properties.mag),
        color: magnitudeColor(earthquakeData.properties.mag),
        fillOpacity: 0.7
      });
    },
    onEachFeature: onEachFeature
  });

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

 

  // Adding legend 
  // https://stackoverflow.com/questions/59453642/how-to-add-legend-in-leaflet-map
  // https://www.igismap.com/legend-in-leafletjs-map-with-topojson/ <- this one primarily use and I also copy extra codes from this site to my css
  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function(map){
    var div = L.DomUtil.create("div", "Info legend");
    grades = [0, 1, 2, 3, 4, 5, 6],
    categories = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6+"];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + magnitudeColor(grades[i] + 1) + '"></i>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      };
    return div;
  };legend.addTo(myMap);  
}
