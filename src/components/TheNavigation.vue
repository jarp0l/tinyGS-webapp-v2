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
        <v-list-item
          v-for="link in navLinks"
          :key="link.text"
          :prepend-icon="link.icon"
          :title="link.text"
          active-color="white"
          :to="link.path"
        >
        </v-list-item>
      </v-list>

      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="white" variant="plain" v-if="signedIn">
            Sign out
            <v-icon end icon="mdi-logout"></v-icon>
          </v-btn>
          <v-btn block color="white" class="text-primary" variant="flat" v-else>
            Create account
            <v-icon end icon="mdi-account-plus"></v-icon>
          </v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>

    <v-app-bar class="bg-blue-darken-2" height="70">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="mr-4"
        title="Toggle sidebar"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>
        <v-img
          contain
          transition="fade-transition"
          max-height="50"
          alt="TinyGS logo"
          src="@/assets/logo.svg"
        />
      </v-app-bar-title>

      <template v-slot:append>
        <div v-if="signedIn">
          <v-btn icon>
            <v-icon size="large">mdi-account-circle</v-icon>
            <v-tooltip activator="parent" location="bottom">Go to dashboard</v-tooltip>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
            <v-tooltip activator="parent" location="bottom">Sign out</v-tooltip>
          </v-btn>
        </div>
        <!-- <v-btn variant="outlined" color="white" v-else>Sign in</v-btn> -->
        <div v-else>
          <v-btn variant="text" color="white" class="mr-1" to="/signin">Sign in</v-btn>
          <v-btn variant="outlined" color="white" to="/signup">Sign up</v-btn>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import links from "@/data.json";

const drawer = ref(true);
const signedIn = ref(false);
const navLinks = ref(links.navLinks);
</script>
