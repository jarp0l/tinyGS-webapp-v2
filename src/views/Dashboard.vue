<template>
  <HeadingComponent heading="Dashboard" />

  <v-container v-if="isLoggedIn">Hello {{ user.email }}!</v-container>
  <!-- <v-container> Hello {{ user.email }}! </v-container> -->
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import HeadingComponent from "@/components/HeadingComponent.vue";
// import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";

const user = ref(null);
const isLoggedIn = ref(false);
const userStore = useUserStore();

onBeforeMount(() => {
  isLoggedIn.value = userStore.isAuthenticated();
  // console.log(isLoggedIn.value);
  if (isLoggedIn.value) {
    console.log(userStore.user.value);
    try {
      user.value = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      user.value = {
        id: "0",
        email: "hello@example.com",
      };
    }
  }
});
</script>
