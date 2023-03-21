<template>
  <AuthLayout>
    <v-card class="pa-4 text-center" v-if="hasTokenQueryParam">
      <div v-if="isVerificationSuccess">
        <h2 class="text-grey-darken-3">Token verification successful!</h2>
        <v-icon color="success" size="x-large">mdi-check-bold</v-icon>
        <v-card-text>
          You can now <router-link to="/signin">sign in!</router-link>
        </v-card-text>
      </div>
      <div v-else>
        <h2 class="text-grey-darken-3">Verification failed!</h2>
        <v-icon color="error" size="x-large">mdi-close-thick</v-icon>
        <v-card-text>The token has either expired or is invalid.</v-card-text>
      </div>
    </v-card>

    <v-card class="pa-4 text-center" v-else>
      <div>
        <h2 class="text-grey-darken-3">404</h2>
        <v-icon color="error" size="x-large">mdi-help</v-icon>
        <v-card-text>There is nothing here!</v-card-text>
      </div>
    </v-card>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// import { useAuthStore } from "@/store/auth.store";
import AuthLayout from "@/layouts/AuthLayout.vue";

// const authStore = useAuthStore();
// authStore.login();

const hasTokenQueryParam = ref(false);
const isVerificationSuccess = ref(false);

const route = useRoute();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const token = route.query.token;
if (token) {
  axios
    .post(`${apiBaseUrl}/auth/verify`, {
      token: token,
    })
    .then((response) => {
      const body = response.data;
      if (body.is_verified) {
        console.log(`Successfully verified user: ${body.email}`);
        isVerificationSuccess.value = true;
      }
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const msg = err.response.data.detail;
        if (msg === "VERIFY_USER_BAD_TOKEN") console.log("Bad token!");
        else if (msg === "VERIFY_USER_ALREADY_VERIFIED")
          console.log("User already verified!");
        isVerificationSuccess.value = false;
      }
    });
  hasTokenQueryParam.value = true;
} else {
  hasTokenQueryParam.value = false;
}
</script>
