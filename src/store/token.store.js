// Utilities
import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useTokenStore = defineStore("tokenVerify", () => {
  const emailSendSuccessful = ref(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  async function requestToken(email) {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/auth/request-verify-token`,
        {
          email,
        },
        { timeout: 3000 }
      );
      if (response.status === 202) {
        console.log("Confirmation email sent!");
        emailSendSuccessful.value = true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    emailSendSuccessful,
    requestToken,
  };
});
