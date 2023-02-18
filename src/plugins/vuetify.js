/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import SatelliteIcon from "@/icons/SatelliteIcon.vue";
import StationIcon from "@/icons/StationIcon.vue";
import SatelliteIconDark from "@/icons/SatelliteIconDark.vue";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  icons: {
    values: {
      satellite: {
        component: SatelliteIcon,
      },
      satelliteDark: {
        component: SatelliteIconDark,
      },
      station: {
        component: StationIcon,
      },
    },
  },
});
