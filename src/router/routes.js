import authRoutes from "../modules/auth/routes/index";
import exhibitorsRoutes from "../modules/exhibitors/routes/index";
import sponsorsRoutes from "../modules/sponsors/routes/index";
import speakersRoutes from "../modules/speakers/routes/index";
import newsRoutes from "../modules/news/routes/index";
import facilitiesRoutes from "../modules/facilities/routes/index";
import sessionsRoutes from "../modules/sessions/routes/index";
import demoRoutes from "../modules/demos/routes/index";
import eventsRoutes from "../modules/mangaeEvent/routes/index";
import interestsRoutes from "../modules/interests/routes/index";
import referenceRoutes from "../modules/reference/routes/index";
import registrationList from "../modules/registerList/routes/index";
function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
const routes = [
  {
    path: "/",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/login",
        component: () => import("../modules/auth/pages/logIn.vue"),
      },
      {
        name: "homePage",
        path: "/home",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true },
        beforeEnter: [checkAuh],
      },
      ...authRoutes,
      ...exhibitorsRoutes,
      ...sponsorsRoutes,
      ...speakersRoutes,
      ...newsRoutes,
      ...facilitiesRoutes,
      ...sessionsRoutes,
      ...demoRoutes,
      ...interestsRoutes,
      ...referenceRoutes,
      ...registrationList,
    ],
  },
  {
    path: "/mangae-events",
    component: () => import("layouts/eventLayout.vue"),
    beforeEnter: [checkAuh],
    children: [...eventsRoutes],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
export default routes;
