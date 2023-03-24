<template>
  <HeadingComponent heading="Dashboard" />

  <v-container v-if="!!user">Hello {{ user.email }}!</v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import HeadingComponent from "@/components/HeadingComponent.vue";
import { useUserStore } from "@/store/user.store";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
