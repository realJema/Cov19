//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let local_death = document.getElementById("local_death");
let local_recovered = document.getElementById("local_recovered");
let local_cases = document.getElementById("local_cases");
let table = document.getElementById("countries_stat");
let myspinner = document.getElementById("myloader");

// storing the data locally
let local_data = {
  "last_update": "",
  "cmr_stat": {
      "country_name": "Cameroon",
      "cases": "193",
      "deaths": "6",
      "region": "",
      "total_recovered": "10",
      "new_deaths": "1",
      "new_cases": "13",
      "serious_critical": "0",
      "active_cases": "84",
      "total_cases_per_1m_population": "3"
  },
  "glb_stat": {
      "total_cases": "565,044",
      "total_deaths": "25,410",
      "total_recovered": "129,309",
      "new_cases": "33,234",
      "new_deaths": "1,342",
      "statistic_taken_at": "2020-03-27 16:01:07"
  },
  "local_stat": {
      "total": 92,
      "cases": "88",
      "deaths": "2",
      "total_recovered": "2",
      "yde": 60,
      "dla": 25,
      "baf": 300
  }
}

// Fetching the Data from the server

function update_Database() {
  // This section updates the global statistics
  //Fetching the World Data from rapid api servers 
//   this fucntion gets the global statistics 
  fetch(
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
      }
    }
  )
    .then(response =>
      response.json().then(data => {
        // sending the data to my personal api
        // flask
        (async () => {
          const rawResponse = await fetch(
            "https://covid-237.herokuapp.com/api/update/global",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }
          );
          const content = await rawResponse;
        //   console.log(content);
        })();
      })
    )
    .catch(err => {
      console.log(err);
    });

  //Fetching The Case by Country Data
//   I get all the data and filter through using a for loop
  fetch(
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
      }
    }
  )
    .then(response =>
      response.json().then(data => {
        // console.log(data)
        let countries_stat = data.countries_stat;
        //Getting all the country statistic using a loop
        for (let i = 0; i < countries_stat.length; i++) {
          if (countries_stat[i].country_name == "Cameroon") {
            // updating value in my personal api 
            var cmr_data = countries_stat[i];
            (async () => {
              const rawResponse = await fetch(
                "https://covid-237.herokuapp.com/api/update/local",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(cmr_data)
                }
              );
              const content = await rawResponse;
            //   console.log(content);
            })();
          }
        }
      })
    )
    .catch(err => {
      console.log(err);
    });
}

// getting the data from the local api and displaying it
function fetch_Data(){
    (async () => {
      const rawResponse = await fetch("https://covid-237.herokuapp.com/api/data", {
        method: "GET"
      });

      // implement a local file fetch in case your own api fails 

      
      const content = await rawResponse.json();
    //   console.log(content);
      // setValue(content);
      myspinner.className += " hide";
  })();
}
// updating the values on the frontend 
function setValue(content) {
      
      // displaying data on the view
      total_cases.innerHTML = content["glb_stat"].total_cases;
      total_death.innerHTML = content["glb_stat"].total_deaths;
      total_recovered.innerHTML = content["glb_stat"].total_recovered;
      local_cases.innerHTML = content["cmr_stat"].cases;
      local_death.innerHTML = content["cmr_stat"].deaths;
      local_recovered.innerHTML = content["cmr_stat"].total_recovered;

      // remove the spinner 
      
      myspinner.className += " hide";
}

// update_Database()
setValue(local_data)




// This section is used to create the map 

var map = L.map("map", {
  center: [7.3, 12.3],
  zoom: 6
});

var defaultLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);

// base layers
var baseLayers = {
  "OpenStreetMap Default": defaultLayer,
  "OpenStreetMap German Style": L.tileLayer.provider("OpenStreetMap.DE"),
  "OpenStreetMap Black and White": L.tileLayer.provider(
    "OpenStreetMap.BlackAndWhite"
  ),
  "OpenStreetMap H.O.T.": L.tileLayer.provider("OpenStreetMap.HOT"),
  "Thunderforest OpenCycleMap": L.tileLayer.provider(
    "Thunderforest.OpenCycleMap"
  ),
  "Thunderforest Transport": L.tileLayer.provider("Thunderforest.Transport"),
  "Thunderforest Landscape": L.tileLayer.provider("Thunderforest.Landscape"),
  "Hydda Full": L.tileLayer.provider("Hydda.Full"),
  "Stamen Toner": L.tileLayer.provider("Stamen.Toner"),
  "Stamen Terrain": L.tileLayer.provider("Stamen.Terrain"),
  "Stamen Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
  "Esri WorldStreetMap": L.tileLayer.provider("Esri.WorldStreetMap"),
  "Esri DeLorme": L.tileLayer.provider("Esri.DeLorme"),
  "Esri WorldTopoMap": L.tileLayer.provider("Esri.WorldTopoMap"),
  "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
  "Esri WorldTerrain": L.tileLayer.provider("Esri.WorldTerrain"),
  "Esri WorldShadedRelief": L.tileLayer.provider("Esri.WorldShadedRelief"),
  "Esri WorldPhysical": L.tileLayer.provider("Esri.WorldPhysical"),
  "Esri OceanBasemap": L.tileLayer.provider("Esri.OceanBasemap"),
  "Esri NatGeoWorldMap": L.tileLayer.provider("Esri.NatGeoWorldMap"),
  "Esri WorldGrayCanvas": L.tileLayer.provider("Esri.WorldGrayCanvas"),
  "Geoportail France Maps": L.tileLayer.provider("GeoportailFrance"),
  "Geoportail France Orthos": L.tileLayer.provider("GeoportailFrance.orthos"),
  "Geoportail France classic maps": L.tileLayer.provider(
    "GeoportailFrance.ignMaps"
  )
};

// overlays
var overlayLayers = {
  OpenSeaMap: L.tileLayer.provider("OpenSeaMap"),
  "OpenWeatherMap Clouds": L.tileLayer.provider("OpenWeatherMap.Clouds"),
  "OpenWeatherMap CloudsClassic": L.tileLayer.provider(
    "OpenWeatherMap.CloudsClassic"
  ),
  "OpenWeatherMap Precipitation": L.tileLayer.provider(
    "OpenWeatherMap.Precipitation"
  ),
  "OpenWeatherMap PrecipitationClassic": L.tileLayer.provider(
    "OpenWeatherMap.PrecipitationClassic"
  ),
  "OpenWeatherMap Rain": L.tileLayer.provider("OpenWeatherMap.Rain"),
  "OpenWeatherMap RainClassic": L.tileLayer.provider(
    "OpenWeatherMap.RainClassic"
  ),
  "OpenWeatherMap Pressure": L.tileLayer.provider("OpenWeatherMap.Pressure"),
  "OpenWeatherMap PressureContour": L.tileLayer.provider(
    "OpenWeatherMap.PressureContour"
  ),
  "OpenWeatherMap Wind": L.tileLayer.provider("OpenWeatherMap.Wind"),
  "OpenWeatherMap Temperature": L.tileLayer.provider(
    "OpenWeatherMap.Temperature"
  ),
  "OpenWeatherMap Snow": L.tileLayer.provider("OpenWeatherMap.Snow"),
  "Geoportail France Parcels": L.tileLayer.provider("GeoportailFrance.parcels")
};

// adding baselayers and overlays to map
L.control.layers(baseLayers, overlayLayers, { collapsed: true }).addTo(map);

// adding the sidebar to the map
L.control.sidebar("sidebar").addTo(map);
// var legend = L.control({ position: "bottomright" });

// all the layers go into this layer group
var layerGroup = L.layerGroup().addTo(map);

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<p>Created by <b>NATIVE</b> | Sponsored by <a href=\"https://aritmacameroun.com/en/home/\"><img class=\"aritma_logo\" style=\"width: 70px;\" src=\"aritma.png\" alt=\"aritma logo\"></a> </p>";
  return div;
};

legend.addTo(map);


// custom icon 
var LeafIcon = L.Icon.extend({
  options: {
      shadowUrl: 'leaf-shadow.png',
      iconSize:     [38, 50],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 34],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
  }
});

var virusIcon = new LeafIcon({iconUrl: 'favicon.ico'});


// adding markers for identified cases
yde = L.marker([3.848, 11.5021]);
yde.bindPopup(local_data["local_stat"]["yde"] + " Cases Identifier ici");
yde.on("mouseover", function(ev) {
  yde.openPopup();
});
yde.addTo(map);


// adding markers for identified cases
baf = L.marker([5.4816, 10.4271]);
baf.bindPopup(local_data["local_stat"]["baf"] + " Cases Identifier ici");
baf.on("mouseover", function(ev) {
  baf.openPopup();
});

baf.addTo(map);
// adding markers for identified cases
dla = L.marker([4.0511, 9.7679]);
dla.bindPopup(local_data["local_stat"]["dla"] + " Cases Identifier ici");
dla.on("mouseover", function(ev) {
  dla.openPopup();
});
dla.addTo(map);

// opening sidebar
$(document).ready(function() {
  document.getElementById("openSidebar").click();
});

