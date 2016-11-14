var map = L.map('map', {scrollWheelZoom:false}).setView([49.0157, 33.6450], 14);

var CartoDB_PositronNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 17
      }).addTo(map);

//add licenses points
$.getJSON("data/gp.geojson", function(data){

//define style
  function style(feature) {
    return {
      radius: 6,
      fillColor: '#5B7C8A',
      color: '#FEFFEA',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.75
      };
    }

    L.geoJson(data, {
          pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, style(feature));
           },
           onEachFeature: function (feature, layer) {
             layer.bindPopup('<b>' + feature.properties.name.toUpperCase() + '</b>' + '<br><hr>' + feature.properties.address + '<br>' + 'номер ліцензії: ' + feature.properties.number + '<br>' + 'дійсна до ' + feature.properties.to);
           }
         }).addTo(map);
       });
