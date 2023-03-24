<template>
  <l-map
    @popupclose="focusSatellite = null"
    :zoom="config.zoom"
    :center="config.center"
    style="height: 60vh; width: 100%; z-index: 0"
  >
    <l-tile-layer :url="config.url" :attribution="config.attribution" />

    <l-marker
      v-for="satellite in satellites"
      :key="satellite.name"
      :lat-lng="[satellite.lat, satellite.lng]"
      :icon="icons.satelliteIcon"
      @click="focusSatellite = satellite.name"
    >
      <l-popup
        ><h3>
          <router-link :to="`/satellite/${satellite.name}`">{{
            satellite.displayName
          }}</router-link>
        </h3>
        Showing stations currently<br />listening to this satellite.</l-popup
      >
      <l-tooltip
        :class="focusSatellite ? 'hidden' : ''"
        :options="{ permanent: true, offset: [12, 0], opacity: 0.8 }"
      >
        {{ satellite.displayName }}
      </l-tooltip>
    </l-marker>

    <l-marker
      v-for="station in stations"
      :key="`${station.name}@${station.userId}`"
      :visible="!focusSatellite || focusSatellite === station.satellite"
      :lat-lng="station.location"
      :icon="station.status ? icons.stationActiveIcon : icons.stationInactiveIcon"
      :class="station.status ? 'active' : 'inactive'"
    >
      <l-popup
        ><h3>
          <router-link :to="`/station/${station.name}@${station.userId}`">{{
            station.name
          }}</router-link>
        </h3>
        <br />
        <strong>{{ station.status == 0 ? "Last seen" : "Last packet" }}:</strong>
        {{
          station.status == 0
            ? formatDate(station.lastSeen)
            : formatDate(station.lastPacketTime)
        }}
        <br />
        <strong>Version:</strong> {{ station.version }} <br />
        <strong>Status:</strong>
        {{ station.status == 0 ? "Offline" : "Online" }} <br />
        <strong>Listening:</strong> {{ station.satellite }} <br />
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { LMap, LTileLayer, LPopup, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import { icon } from "leaflet";
import axios from "axios";
import moment from "moment";
import "leaflet/dist/leaflet.css";

const icons = ref({
  satelliteIcon: icon({
    iconUrl: "https://static.tinygs.com/satellite_blue.png",
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
  }),
  stationActiveIcon: icon({
    iconUrl: "https://static.tinygs.com/station_icon_green.png",
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
  }),
  stationInactiveIcon: icon({
    iconUrl: "https://static.tinygs.com/station_icon_red.png",
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
  }),
});

const config = ref({
  zoom: 3,
  center: [35, 0],
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});

const stations = ref(null);
const satellites = ref(null);
const focusSatellite = ref(null);

onBeforeMount(async () => {
  await getStations();
  await getSatellites();
});

async function getStations() {
  const { data } = await axios.get("https://api.tinygs.com/v1/stations");
  //console.log(data);
  stations.value = data;
}

async function getSatellites() {
  const { data } = await axios.get("https://api.tinygs.com/v1/satellitesWorldmap");
  //console.log(data);
  satellites.value = data;
}

function formatDate(time) {
  if (!time) return "Never";
  return moment(time).fromNow();
}
</script>

<style>
.leaflet-marker-icon[src*="satellite_blue.png"] {
  z-index: 300 !important;
}
.leaflet-marker-icon[src*="station_icon_green.png"] {
  z-index: 200 !important;
}
.leaflet-marker-icon[src*="station_icon_red.png"] {
  z-index: 199 !important;
}
.hidden {
  display: none;
}
</style>
