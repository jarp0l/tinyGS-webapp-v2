<template>
  <div>
    <v-navigation-drawer v-model="drawer" color="primary">
      <div class="d-flex justify-center mt-3 mb-4">
        <v-img
          contain
          max-height="90"
          transition="scale-transition"
          alt="TinyGS logo"
          src="@/assets/logo.svg"
        />
      </div>
      <v-divider color="white"></v-divider>
      <v-list color="transparent" :lines="false" density="compact" nav>
        <v-list-item-group>
          <v-list-item
            v-for="link in navLinks"
            :key="link.text"
            :prepend-icon="link.icon"
            :title="link.text"
            active-color="white"
            :to="link.path"
          >
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="white" variant="plain">
            Logout
            <v-icon end icon="mdi-logout"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar class="bg-blue-darken-2" height="70">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="mr-4"
        title="Toggle sidebar"
      ></v-app-bar-nav-icon>

      <div class="flex-grow-1 d-flex justify-center">
        <v-img
          contain
          transition="fade-transition"
          max-height="50"
          alt="TinyGS logo"
          src="@/assets/logo.svg"
        />
      </div>

      <v-btn icon class="mr-2" v-if="user">
        <v-icon large icon="mdi-account-circle"></v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import links from "@/data.json";

const drawer = ref(true);
const user = ref(true);
const navLinks = ref(links.navLinks);
</script>
