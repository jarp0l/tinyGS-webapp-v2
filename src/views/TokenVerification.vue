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
import { storeToRefs } from "pinia";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useTokenStore } from "@/store/token.store";

const hasTokenQueryParam = ref(false);

const route = useRoute();
const tokenStore = useTokenStore();
const { isVerificationSuccess } = storeToRefs(tokenStore);

const token = route.query.token;
if (token) {
  hasTokenQueryParam.value = true;
  async () => await tokenStore.verifyToken(token);
} else {
  hasTokenQueryParam.value = false;
}
</script>
