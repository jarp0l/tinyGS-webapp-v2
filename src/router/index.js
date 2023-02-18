// Composables
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// import Satellites from '@/views/Satellites.vue'
// import Satellite from '@/views/Satellite.vue'
// import Packet from '@/views/Packet.vue'
// import Packets from '@/views/Packets.vue'
// import Station from '@/views/Station.vue'
// import User from '@/views/User.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home - TinyGS",
    },
  },
  // {
  //   path: "/stations",
  //   name: "Stations",
  //   component: () => import("@/views/Stations.vue"),
  //   meta: {
  //     title: "Stations - TinyGS",
  //   },
  // },
  // {
  //   path: "/satellites",
  //   name: "Satellites",
  //   component: () => import("@/views/Satellites.vue"),
  //   meta: {
  //     title: "Satellites - TinyGS",
  //   },
  // },
  // {
  //   path: "/satellite/:name",
  //   name: "Satellite",
  //   component: Satellite,
  //   // component: () => import("@/views/Satellite.vue"),
  //   meta: {
  //     title: "Satellite - TinyGS",
  //   },
  // },
  // {
  //   path: "/packet/:id",
  //   name: "Packet",
  //   component: Packet,
  //   meta: {
  //     title: "Packet View - TinyGS",
  //   },
  // },
  // {
  //   path: "/packets",
  //   name: "Packets",
  //   component: () => import("@/views/Packets.vue"),
  //   meta: {
  //     title: "Last received packets - TinyGS",
  //   },
  // },
  // {
  //   path: "/station/:id",
  //   name: "Station",
  //   component: Station,
  //   meta: {
  //     title: "Station Console - TinyGS",
  //   },
  // },
  // {
  //   path: "/user/:id",
  //   name: "User",
  //   component: User,
  //   meta: {
  //     title: "User Console - TinyGS",
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
