//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById('countries_stat')
// Fetching the Data from the server

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
    }
})

.then(response => response.json().then( data => {
    // console.log(data);
    total_cases.innerHTML = data.total_cases;
    // new_cases.innerHTML = data.new_cases;
    // new_death.innerHTML = data.new_deaths;
    total_death.innerHTML = data.total_deaths;
    total_recovered.innerHTML = data.total_recovered;

})).catch(err => {
    console.log(err);
});


//Fetching The Case by Country Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
    }
})
.then(response => response.json().then(data =>{
    // console.log(data)
    let countries_stat = data.countries_stat;
    let list_country = document.getElementById("country_stats");
//Getting all the country statistic using a loop
    for(let i = 0; i<countries_stat.length;i++){
        // console.log(countries_stat[i]);

        var content = '<div class="country_stat col-12">';
        content += '<div class="col-6">';
        content += '<h3 class="country_name">' + countries_stat[i].country_name + '</h3>';
        content += '</div>';
        content += '<div class="col-6 info">';
        content += '<p> Confirmed </p>';
        content += '<p>' + countries_stat[i].cases + '</p>';
        content += '</div">';
        content += '</div>';

        if(countries_stat[i].country_name == 'Cameroon'){
            //prepend text
            old_content = list_country.innerHTML
            list_country.innerHTML = content;
            list_country.innerHTML += old_content;
        } else {
            // list_country.innerHTML += content; // this prevents all the data of the countries from being loaded
        }

    }
}))
.catch(err => {
    console.log(err);
});

var map = L.map('map', {
    center: [7.3, 12.3],
    zoom: 6
});

var defaultLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

// base layers
var baseLayers = {
    'OpenStreetMap Default': defaultLayer,
    'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
    'OpenStreetMap Black and White': L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
    'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT'),
    'Thunderforest OpenCycleMap': L.tileLayer.provider('Thunderforest.OpenCycleMap'),
    'Thunderforest Transport': L.tileLayer.provider('Thunderforest.Transport'),
    'Thunderforest Landscape': L.tileLayer.provider('Thunderforest.Landscape'),
    'Hydda Full': L.tileLayer.provider('Hydda.Full'),
    'Stamen Toner': L.tileLayer.provider('Stamen.Toner'),
    'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
    'Stamen Watercolor': L.tileLayer.provider('Stamen.Watercolor'),
    'Esri WorldStreetMap': L.tileLayer.provider('Esri.WorldStreetMap'),
    'Esri DeLorme': L.tileLayer.provider('Esri.DeLorme'),
    'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
    'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
    'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
    'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
    'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
    'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
    'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
    'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'),
    'Geoportail France Maps': L.tileLayer.provider('GeoportailFrance'),
    'Geoportail France Orthos': L.tileLayer.provider('GeoportailFrance.orthos'),
    'Geoportail France classic maps': L.tileLayer.provider('GeoportailFrance.ignMaps')
};

// overlays
var overlayLayers = {
    'OpenSeaMap': L.tileLayer.provider('OpenSeaMap'),
    'OpenWeatherMap Clouds': L.tileLayer.provider('OpenWeatherMap.Clouds'),
    'OpenWeatherMap CloudsClassic': L.tileLayer.provider('OpenWeatherMap.CloudsClassic'),
    'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
    'OpenWeatherMap PrecipitationClassic': L.tileLayer.provider('OpenWeatherMap.PrecipitationClassic'),
    'OpenWeatherMap Rain': L.tileLayer.provider('OpenWeatherMap.Rain'),
    'OpenWeatherMap RainClassic': L.tileLayer.provider('OpenWeatherMap.RainClassic'),
    'OpenWeatherMap Pressure': L.tileLayer.provider('OpenWeatherMap.Pressure'),
    'OpenWeatherMap PressureContour': L.tileLayer.provider('OpenWeatherMap.PressureContour'),
    'OpenWeatherMap Wind': L.tileLayer.provider('OpenWeatherMap.Wind'),
    'OpenWeatherMap Temperature': L.tileLayer.provider('OpenWeatherMap.Temperature'),
    'OpenWeatherMap Snow': L.tileLayer.provider('OpenWeatherMap.Snow'),
    'Geoportail France Parcels': L.tileLayer.provider('GeoportailFrance.parcels')
};

// adding baselayers and overlays to map
L.control.layers(baseLayers, overlayLayers, {collapsed: true}).addTo(map);

// adding the sidebar to the map
L.control.sidebar('sidebar').addTo(map);
var legend = L.control({position: 'bottomright'});

// all the layers go into this layer group
var layerGroup = L.layerGroup().addTo(map);

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<p>Created by <b>NATIVE</b></p>";
  
  

  return div;
};

legend.addTo(map);


// adding markers for identified cases 
yde = L.marker([3.8480, 11.5021]);
yde.bindPopup("13 Cases Identifier ici");
yde.on('mouseover',function(ev) {
    yde.openPopup();
  });
yde.addTo(map);
