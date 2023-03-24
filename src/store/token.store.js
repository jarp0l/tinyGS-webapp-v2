// Utilities
import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useTokenStore = defineStore("tokenVerify", () => {
  const emailSendSuccessful = ref(false);
  const isVerificationSuccess = ref(false);

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

  async function verifyToken(token) {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/verify`, {
        token,
      });
      const body = response.data;
      if (body.is_verified) {
        console.log(`Successfully verified user: ${body.email}`);
        isVerificationSuccess.value = true;
      }
    } catch (err) {
      if (err.response.status === 400) {
        const msg = err.response.data.detail;
        if (msg === "VERIFY_USER_BAD_TOKEN") console.log("Bad token!");
        else if (msg === "VERIFY_USER_ALREADY_VERIFIED")
          console.log("User already verified!");
        isVerificationSuccess.value = false;
      }
    }
  }

  return {
    emailSendSuccessful,
    requestToken,
    verifyToken,
  };
});
