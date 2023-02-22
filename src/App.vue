<template>
  <v-app>
    <TheNavigation />
    <v-main class="bg-grey-lighten-3">
      <router-view />
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import TheFooter from "./components/TheFooter.vue";
</script>
