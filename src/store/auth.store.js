// Utilities
import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useTokenStore } from "@/store/token.store";
import { useUserStore } from "@/store/user.store";

export const useAuthStore = defineStore("auth", () => {
  // const emit = defineEmits(["loggedOut"]);

  const signinLoading = ref(false);
  const signupLoading = ref(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const router = useRouter();
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  async function register(email, password) {
    try {
      signupLoading.value = true;

      const response = await axios.post(
        `${apiBaseUrl}/auth/register`,
        {
          email,
          password,
        },
        { timeout: 3000 }
      );
      if (response.status === 201) {
        console.log("User created.");
        await tokenStore.requestToken(email);
      }
    } catch (err) {
      if (err.response.status === 400) {
        if (err.response.data.detail === "REGISTER_USER_ALREADY_EXISTS")
          console.log("User already exists");
        else if (err.response.data.detail?.code === "REGISTER_INVALID_PASSWORD")
          console.log(err.response.data.detail.reason);
      } else console.error(err.response);
    } finally {
      signupLoading.value = false;
    }
  }

  async function login(username, password) {
    try {
      signinLoading.value = true;

      const response = await axios.post(
        `${apiBaseUrl}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          timeout: 3000,
        }
      );
      if (response.status === 200) {
        console.log("Logged in!");
        await userStore.getCurrentUser();
        Cookies.set("logged_in", "true");
        router.push({ path: "/dashboard" });
      }
    } catch (err) {
      if (err.response.status === 400) {
        if (err.response.data.detail === "LOGIN_USER_NOT_VERIFIED")
          console.log(
            "User not verified yet. Please check email for confirmation link."
          );
        else if (err.response.data.detail === "LOGIN_BAD_CREDENTIALS")
          console.log("Either bad credentials or the user is inactive.");
      } else console.error(err.response);
    } finally {
      signinLoading.value = false;
    }
  }

  async function logout() {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
          timeout: 3000,
        }
      );

      if (response.status === 200) {
        console.log("User logged out.");
        userStore.isLoggedIn = false;
        localStorage.removeItem("user");
        Cookies.remove("logged_in");
        userStore.user = null;
        // emit("loggedOut");
        await router.push("/");
      }
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        console.log("Missing token or inactive user.");
      }
    }
  }

  return {
    signinLoading,
    signupLoading,
    register,
    login,
    logout,
  };
});
