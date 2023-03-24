// Composables
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// import Satellite from '@/views/Satellite.vue'
// import Packet from '@/views/Packet.vue'
// import Station from '@/views/Station.vue'
// import User from '@/views/User.vue'
// import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home - TinyGS",
    },
  },
  {
    path: "/stations",
    name: "Stations",
    component: () => import("@/views/Stations.vue"),
    meta: {
      title: "Stations - TinyGS",
    },
  },
  {
    path: "/satellites",
    name: "Satellites",
    component: () => import("@/views/Satellites.vue"),
    meta: {
      title: "Satellites - TinyGS",
    },
  },
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
  {
    path: "/packets",
    name: "Packets",
    component: () => import("@/views/Packets.vue"),
    meta: {
      title: "Last received packets - TinyGS",
    },
  },
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
  {
    path: "/signin",
    name: "Sign in",
    component: () => import("@/views/SigninForm.vue"),
    meta: {
      title: "Sign in - TinyGS",
      hasAuth: true,
    },
  },
  {
    path: "/signup",
    name: "Sign up",
    component: () => import("@/views/SignupForm.vue"),
    meta: {
      title: "Sign up - TinyGS",
      hasAuth: true,
    },
  },
  {
    path: "/auth/verify",
    name: "Verify token",
    component: () => import("@/views/TokenVerification.vue"),
    meta: {
      title: "Verify token - TinyGS",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      title: "Dashboard - TinyGS",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  document.title = to.meta.title;

  const isAuthenticated = !!userStore.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return "/signin";
  }

  // for routes with meta.hasAuth set to true,
  // and user is authenticated, no need of showing them
  if (to.meta.hasAuth && isAuthenticated) {
    return "/";
  }
});

export default router;
