<template>
  <AuthLayout>
    <v-card class="pa-4">
      <div class="text-center">
        <h2 class="text-grey-darken-3">Create a new account</h2>
      </div>
      <v-form ref="signupForm" @submit.prevent="handleSubmit">
        <v-card-text>
          <v-text-field
            clearable
            v-model="user.email"
            :rules="rules.email"
            type="email"
            label="Email"
            placeholder="Your email"
            prepend-inner-icon="mdi-at"
            variant="underlined"
            required
            class="mb-4"
          />
          <v-text-field
            clearable
            v-model="user.password"
            :rules="rules.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="A strong password"
            prepend-inner-icon="mdi-key"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            variant="underlined"
            required
          />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            block
            :loading="authStore.isLoading"
            type="submit"
            class="bg-blue-darken-2"
            variant="flat"
            :disabled="tokenStore.emailSendSuccessful"
          >
            <span class="px-8">Sign up</span>
          </v-btn>
        </v-card-actions>
        <v-card-text class="text-center" v-if="tokenStore.emailSendSuccessful">
          Please check your email.</v-card-text
        >
      </v-form>
    </v-card>
  </AuthLayout>

  <v-snackbar location="top" color="success" height="800" v-model="showSnackbar">
    Check your email for confirmation!
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" append-icon="mdi-close">
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth.store";
import { useTokenStore } from "@/store/token.store";
import AuthLayout from "@/layouts/AuthLayout.vue";

const showSnackbar = ref(false);
const showPassword = ref(false);
const signupForm = ref(null);

const user = ref({
  email: "",
  password: "",
});

const rules = ref({
  email: [
    (v) => !!v || "Email is required",
    (v) =>
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || "Invalid email",
  ],
  password: [
    (v) => !!v || "Password is required",
    (v) =>
      (v && v.length >= 6 && v.length <= 72) ||
      "Password must be between 8 and 72 characters!",
  ],
});

const authStore = useAuthStore();
const tokenStore = useTokenStore();

const isFormEmpty = () => user.value.email === "" || user.value.password === "";

const handleSubmit = () => {
  signupForm.value.validate().then(async (res) => {
    if (res.valid) {
      if (!isFormEmpty()) {
        await authStore.register(user.value.email, user.value.password);
        if (tokenStore.emailSendSuccessful) {
          showSnackbar.value = true;
          signupForm.value.reset();
        }
      }
    }
  });
};
</script>
