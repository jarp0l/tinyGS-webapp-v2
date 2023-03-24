<template>
  <v-app>
    <TheNavigation />
    <v-main class="bg-grey-lighten-3">
      <!-- On the home page the map view needs to cover the full width -->
      <div v-if="route.path === '/'">
        <router-view />
      </div>
      <BodyLayout v-else>
        <router-view />
      </BodyLayout>
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";
import TheNavigation from "@/components/TheNavigation.vue";
import TheFooter from "@/components/TheFooter.vue";
import BodyLayout from "@/layouts/BodyLayout.vue";

const route = useRoute();
</script>

<style>
p {
  margin-bottom: 16px;
}
</style>
