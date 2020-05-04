// create my map 

function magColor(number) {
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

function createMap(earthquakedata) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // create an array to hold earthquake read data and determine the marker 
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
  }
}