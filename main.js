var vm = new Vue({
    el: '#vm',
    data: {
        menuItems: [
            {label: 'Profile Settings', link: 'siema'},
            {label: 'Planned Tracks', link: 'siema'},
            {label: 'Add Track', link: 'siema'},
            {label: 'Travelled Tracks', link: 'siema'},
            {label: 'Log Out', link: 'siema'}
        ]
    }
});

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var marker = L.marker([50.06, 19.94]).addTo(mymap);
var pathArr = [];

mymap.on('click', function(e) {
    var popLocation= e.latlng;
    var el = document.getElementById("markOptionSelect");
    var option = el.options[el.selectedIndex].value;

    if (option === "marker") {
        pathArr = [];
        L.marker(popLocation).addTo(mymap);
    } else if (option === "path") {
        pathArr.push(popLocation);
        L.polyline(pathArr, {color: 'red'}).addTo(mymap);
    }

});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlsZW5rYSIsImEiOiJjajliY2E2aGkxY25rMzRwOW96ZWU5emNxIn0.OVwd_SGAbNqerEHKPeM1dw'
}).addTo(mymap);

mymap.panTo([50.06, 19.94]);