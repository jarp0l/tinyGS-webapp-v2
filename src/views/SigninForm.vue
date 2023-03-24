<template>
  <AuthLayout>
    <v-card class="pa-4">
      <div class="text-center">
        <h2 class="text-grey-darken-3">Sign in to TinyGS</h2>
      </div>
      <v-form ref="signinForm" @submit.prevent="handleSubmit">
        <v-card-text>
          <v-text-field
            clearable
            v-model="user.email"
            :rules="rules.email"
            type="email"
            label="Email"
            placeholder="Your email"
            prepend-inner-icon="mdi-at"
            required
            variant="underlined"
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
            required
            variant="underlined"
          />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            block
            :loading="authStore.isLoading"
            type="submit"
            class="bg-blue-darken-2"
            variant="flat"
          >
            <span class="px-8">Sign in</span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </AuthLayout>

  <v-snackbar location="top" color="success" v-model="showSnackbar">
    Sign in successful!
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" append-icon="mdi-close">
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuthStore } from "@/store/auth.store";

const showSnackbar = ref(false);
const showPassword = ref(false);
const signinForm = ref(null);

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

const isFormEmpty = () => user.value.email === "" || user.value.password === "";

const handleSubmit = () => {
  signinForm.value.validate().then(async (res) => {
    if (res.valid) {
      if (!isFormEmpty()) {
        await authStore.login(user.value.email, user.value.password);
      }
    }
  });
};
</script>
