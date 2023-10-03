export default [
  {
    path: "",
    component: () => import("../pages/eventsList.vue"),
    name: "eventsList",
  },
  {
    path: "add-event",
    component: () => import("../pages/addEvent.vue"),
    name: "addEvent",
  },
  {
    path: "edit-event/:id",
    component: () => import("../pages/addEvent.vue"),
    name: "editEvent",
  },
  {
    path: "event-details/:id",
    component: () => import("../pages/eventDetails.vue"),
    name: "eventDetails",
  },
  {
    path: "start-settings",
    component: () => import("../pages/redirectPage.vue"),
    name: "redirectPage",
  },
];
