<template>
  {{ drawer }}

  <div v-for="link in navLinks" :key="link.text">
    {{ link.text }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import links from "@/data.json";

const drawer = ref(false);
const navLinks = ref(links.navLinks);
</script>
