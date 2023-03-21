// Utilities
import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
// import { useAuthStore } from "./auth.store";
import Cookies from "js-cookie";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoggedIn = ref(!!localStorage.getItem("logged_in"));

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const router = useRouter();

  const isAuthenticated = () => {
    return !!Cookies.get("logged_in");
  };

  async function fetchUser() {
    const response = await axios.get(`${apiBaseUrl}/user/me`, {
      withCredentials: true,
      timeout: 3000,
    });
    return response;
  }

  async function getCurrentUser() {
    try {
      const response = await fetchUser();

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
      }
      router.push("/signin");
    }
  }

  return {
    user,
    isLoggedIn,
    getCurrentUser,
    isAuthenticated,
  };
});
