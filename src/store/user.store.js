// Utilities
import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "./auth.store";

export const useUserStore = defineStore("user", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const msg = ref({});

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const router = useRouter();
  const authStore = useAuthStore();

  async function getCurrentUser() {
    try {
      const response = await axios.get(`${apiBaseUrl}/user/me`, {
        withCredentials: true,
        timeout: 3000,
      });

      if (response.status === 200) {
        console.log("User fetched.");
        user.value = {
          id: response.data.id,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(user.value));
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log("Missing token or inactive user.");
        msg.value.error = "Missing token or inactive user.";
        authStore.clearStorage();
      }
      router.push("/signin");
    }
  }

  return {
    user,
    getCurrentUser,
  };
});
