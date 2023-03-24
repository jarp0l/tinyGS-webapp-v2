<template>
  <v-container fluid class="ma-0 pa-4">
    <!-- <Worldmap style="height: 60vh; width: 100%" /> -->
    <v-container class="text-grey-darken-3">
      <div class="text-h5 text-center font-weight-bold mb-4">
        Welcome to TinyGS, the Open Source Global Satellite Network
      </div>
      <p>
        TinyGS is an open network of Ground Stations distributed around the world to
        receive and operate LoRa satellites, weather probes and other flying objects,
        using cheap and versatile modules.
      </p>
      <p>
        This project is based on ESP32 boards and currently it is compatible with sx126x
        and sx127x LoRa módules but we plan to support more radio módules in the future.
      </p>
      <div
        class="d-flex align-center justify-space-around flex-wrap flex-md-row flex-sm-column"
      >
        <v-card class="pa-2 ma-2 mb-sm-8 rounded-xl stats-card text-grey-darken-1">
          <v-card-text>
            <div class="text-center text-h5">
              <v-icon size="x-large" class="pb-3">mdi-account-group</v-icon>
            </div>
            <div class="text-center text-h3">
              {{ statistics.members }}
            </div>
            <div class="font-weight-bold text-center">Members</div>
          </v-card-text>
        </v-card>

        <v-card class="pa-2 ma-2 mb-sm-8 rounded-xl stats-card text-grey-darken-1">
          <v-card-text>
            <div class="text-center text-h5">
              <v-icon size="x-large" class="pb-3">mdi-satellite-uplink</v-icon>
            </div>
            <div class="text-center text-h3">
              {{ statistics.stations }}
            </div>
            <div class="font-weight-bold text-center">Active stations</div>
          </v-card-text>
        </v-card>

        <v-card class="pa-2 ma-2 mb-sm-8 rounded-xl stats-card text-grey-darken-1">
          <v-card-text>
            <div class="text-center text-h5">
              <v-icon size="x-large" class="pb-3">mdi-file-document-outline</v-icon>
            </div>
            <div class="text-center text-h3">
              {{ statistics.packets + 10000 }}
            </div>
            <div class="font-weight-bold text-center">Received packets</div>
          </v-card-text>
        </v-card>
      </div>

      <h3 class="py-3">History</h3>
      <p>
        Initially TinyGS was born under the name ESP32 Fossa Groundstation, it was
        developed as a "weekend" project for the FossaSAT-1 LoRa satellite. We are
        passionate about space and created this project to be able to track and use the
        satellites and to learn and experiment about radio. Currently the network is open
        to any LoRa satellite and we also support other flying objects that have a
        compatible radio modulation with our hardware such as FSK, GFSK, MSK, GMSK, LoRa
        and OOK. And the project was renamed to TinyGS.
      </p>
      <p>
        Even though we have no relation with the Fossa team, they inspired this project
        and we are excited to support their new launched satellites into our network.
      </p>
      <p>This are the more important moments of the project:</p>
      <ul class="list">
        <li>Nov 28, 2019 ESP32-OLED-Fossa-GroundStation project born.</li>
        <li>Dec 6, 2019 FossaSAT-1 deployed with an Electron rocket by Rocket Lab.</li>
        <li>Dec 10,2019 YL3CT's GS receive the fist LoRa packet from FossaSAT-1</li>
        <li>
          Sep 28,2020 6U Norby LoRa satellite is deployed with a Soyuz-2-1b launcher
        </li>
        <li>Oct 11, 2020 KA9ETC's GS receive the first LoRa packet from Norby</li>
        <li>Jan 24, 2021 3x V-R3x sat deployed with a Falcon-9</li>
        <li>Jan 25, 2021 KA9ETC'S GS receive the first LoRa packet from V-R3x</li>
        <li>Feb 14, 2021 New name and web tinyGS.com with a new Beta firmware.</li>
        <li>Feb 28, 2021 First packet received from SD SAT by PA3ARK.</li>
        <li>
          Mar 20, 2021 First LoRa relay message between two tinyGS stations from K4KDR to
          N6RFM using SD SAT.
        </li>
      </ul>
      <h3 class="py-3 pt-6">Get Started</h3>
      <p>
        Join our
        <a href="https://t.me/joinchat/DmYSElZahiJGwHX6jCzB3Q">Telegram Channel</a>, visit
        our <a href="https://github.com/G4lile0/tinyGS">GitHub Page</a> and build your
        station.
      </p>
    </v-container>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "axios";

const statistics = ref({});

onBeforeMount(() => {
  getStatistics();
});

async function getStatistics() {
  try {
    const { data } = await axios.get("https://api.tinygs.com/v1/statistics");
    console.log(data);
    statistics.value = data;
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped>
.stats-card {
  min-width: 250px;
  min-height: 175px;
}
/* p {
  margin-bottom: 16px;
} */
.list {
  padding-left: 20px;
}
.list > li {
  margin-bottom: 2px;
}
</style>
