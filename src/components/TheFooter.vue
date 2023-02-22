<template>
  <v-footer class="mt-12 pa-3 bg-blue-darken-2" padless absolute app bottom>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in socialLinks"
        :key="link.url"
        color="white"
        variant="text"
        rounded
        class="my-2 mx-1"
        @click="navigate(link.url)"
        :href="link.url"
        rel="noopener noreferrer"
        target="_blank"
      >
        <v-icon class="mr-2">{{ link.icon }}</v-icon> {{ link.name }}
      </v-btn>
      <v-col class="py-4 text-center text-white" cols="12">
        {{ new Date().getFullYear() }} — <strong>TinyGS</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import links from "@/data.json";
const socialLinks = links.socialLinks;
</script>
