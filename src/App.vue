<template>
  <v-app>
    <TheNavigation />
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="ma-0 pa-4">
        <router-view />
      </v-container>
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<style>
p {
  margin-bottom: 16px;
}
</style>
