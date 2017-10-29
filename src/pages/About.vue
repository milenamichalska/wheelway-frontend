<template>
  <div class="container">
    <header>
      <div id="filters">Filters: </div>

      <div class="input_wrapper">
        <label for="ramps">Ramps</label>
        <input type="checkbox" id="ramps" v-model="ramps">
      </div>

      <div class="input_wrapper">
        <label for="stairs">Stairs</label>
        <input type="checkbox" id="stairs" v-model="stairs">
      </div>
    </header>
    <nav id="vm">
      <img src="/img/logo.png" id="logo"><br><br>
      <div v-for="menuItem in menuItems" class="menu_item"><a v-on:click="addMode = true">{{menuItem.label}}</a></div>
    </nav>

    <div id="destination_menu" v-if="!addMode">
      <table>
        <tr><td class="to_cell">From: </td><td><input class="input_cell" v-model="from"></td></tr>
        <tr class="separator"></tr>
        <tr><td class="to_cell">To: </td><td><input class="input_cell" v-model="to"></td></tr>
        <tr class="separator"></tr>
        <tr><td class="to_cell"></td><td><div class="input_cell">
          <span id="subtitle">Track details</span> <br>
          <table id="details_table">
            <tr><td rowspan="2"><img src="/img/icon1.png" width="20"></td><td><b>21 min</b></td><td>4 ramps</td></tr><tr>
            <td>1.5 km</td><td>5 stairs</td></tr>
          </table>
        </div></td></tr>

      </table>
    </div>

    <div id="destination_menu" v-if="addMode">
      <table>
        <tr><td class="to_cell">Add: </td><td><select v-model="selected" class="input_cell">
          <option>Marker</option>
          <option>Path</option>
        </select></td></tr>
      </table>
    </div>

    <div id="mapid"></div>

    <footer>Copyright siema</footer>
  </div>
</template>

<script>

  export default {
      data () {
          return {
              ramps: 0,
              stairs: 0,
              menuItems: [
                  {label: 'Profile Settings', link: 'siema'},
                  {label: 'Planned Tracks', link: 'siema'},
                  {label: 'Add Track', link: 'siema'},
                  {label: 'Travelled Tracks', link: 'siema'},
                  {label: 'Log Out', link: 'siema'}
              ],
              to: "",
              from: "",
              selected: "",
              addMode: false,
          }
      }, mounted: function () {
          console.log("mounted");

              var pinIcon = L.icon({
                  iconUrl: '/img/pinicon.png',
                  iconSize: [70, 70],
                  iconAnchor: [22, 94],
                  popupAnchor: [-3, -76],
              });

              var mymap = L.map('mapid').setView([51.505, -0.09], 13);
              var marker = L.marker([50.06, 19.94], {icon: pinIcon}).addTo(mymap);
              var pathArr = [];

              mymap.on('click', function(e) {
                  var popLocation= e.latlng;
                  var el = document.getElementById("markOptionSelect");
                  var option = el.options[el.selectedIndex].value;

                  if (this.selected === "Marker") {
                      pathArr = [];
                      L.marker(popLocation).addTo(mymap);
                  } else if (this.selected === "Path") {
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
      }
  }
</script>

<style>
  .container {
    padding: 0;
    margin: 0;
    font-family: 'Raleway', sans-serif;
  }

  header {
    position: absolute;
    top:0;
    left:0;
    right:0;
    padding:20px;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
  }

  #filters {
    color: #dbd512;
    font-weight: bold;
    margin: 0 20px 0 95px;
    display: inline-block;
  }

  nav {
    color: white;
    position: absolute;
    top:0;
    left:0;
    width: 180px;
    padding: 70px 0 20px 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;
    text-align: center;
  }

  .input_wrapper {
    padding: 0 20px;
    display: inline-block;
    color: white;
    border-left: 0;
  }

  /* todo: figure out why first-child is not working */
  div.input_wrapper:last-child {
    border-left: 1px solid #dbd512;
  }


  a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }

  .menu_item {
    padding: 10px 0;
    width: 100%;
  }

  .menu_item:hover {
    background-color: black;
    color: #dbd512
  }

  .menu_item:last-child {
    color: lightgray;
  }

  #logo {
    width: 140px;
    height: 140px;
  }

  #destination_menu {
    position: absolute;
    top: 90px;
    left: 210px;
    z-index: 10;
  }

  input {
    border: none;
  }

  .input_cell {
    background-color: rgba(255,255,255, 0.7);
    padding: 10px 15px;
    width: 250px;
    box-shadow: 2px 3px 1px #AAA;
  }

  .separator {
    height: 20px;
  }

  .to_cell {
    font-weight: bold;
    padding: 10px;
    text-align: right;
  }

  #subtitle {
    color: #dbd512;
    font-size: larger;
  }

  #details_table {
    margin-top: 15px;
    width: 100%;
  }

  #mapid {
    position: absolute;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: #222222;
    z-index: 1;
  }

  footer {
    color: white;
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    padding:5px;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
    text-align: center;
  }
</style>
