// learn this from Week 17 - day 2 - logic 4 
// creating map object 
var map = L.map("map", {
    center: [35.1, -90.9],
    zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Our original website "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" 
// select one of the data on the right hand side for us to create our GEO-mapping homework 
//Store our .geojson link to a variable 
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Uncomment this link local geojson for when earthquake.usgs.gov is down 
//var link ="static/all_week.geojson";

function magColor(magnitude) {
    var mag = feature.properties.mag;
    if (mag >= 5) {
        return "red";
    }    
    else if (mag >= 4) {
        return "orangered";
    }
    else if (mag >= 3) {
        return "orange";
    }
    else if (mag >= 2) {
        return "yellow"
    } 
    else if (mag >= 1) {
        return "lime";
    }
    else {
        return "green";
    }
}

// use d3 to read our json data and print using console log to see if it display on the index 
d3.json(link, function(magnitude){
    console.log(data);
    createMap(data.features);
});

function createMap(earthquakedata) { 
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
    var earthquakeMakers = [];
    
    for (var i = 0; i < earthquakedata.length; i++) {
        var lat = earthquakedata[i].geometry.coordinates[1];
        var long = eartquakedata[i].geometry.coordinates[0];
        var magnitude = eartquakedata[i].properties.mag;
        var fillcolor = magColor(magnitude);
        earthquakeMarkers.push(
            L.circle([lat, long], {
                stroke: false,
                fillOpacity: 0.50,
                color: fillcolor,
                radius: markerSize(magnitude)
            }).bindPopup("<h3>" + eartquakedata.properties.place + "<h3><hr><p>" + new Date(eartquakeData[i].properties.time) + ", magnitude: " + mag + "<p>")
        );
};
// use this link as reference https://leafletjs.com/examples/geojson/
//function onEachFeature(feature, layer) {
        
//        layer.bindPopup(feature.properties.mag);
//}


// Grabbing our GeoJson data...
//d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data 
//    L.geoJson(data, {
        //Style each feature in this case the magnitude size and coloring 
//        style: function(feature) {
//            return {
//                color: "white",
                // Call the magColor function to decide which color to color our marker based on the magnitude
//                fillColor: magColor(feature.//properties.mag),
//                fillOpacity: 0.5,
//                weight: 1.5
//            };
//        },
 //   })
//});