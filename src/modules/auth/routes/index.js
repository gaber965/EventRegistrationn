export default [
  {
    path: "login",
    name: "logIn",
    component: () => import("../pages/logIn.vue"),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("user");
      // If logged in, or going to the Login page.
      if (!isAuthenticated || to.path != "/login") {
        // Continue to page.
        next();
      } else {
        // Not logged in, redirect to login.
        next({ name: "eventsList" });
      }
    },
  },
];
