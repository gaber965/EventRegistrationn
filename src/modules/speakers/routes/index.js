function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "speakers",
    component: () => import("../pages/indexPage.vue"),
    meta: {
      name: "speakers List",
      requiresAuth: true,
      lable: "Speakers",
      direct: "/speakers",
    },
    children: [
      {
        path: "",
        name: "SpeakersList",
        component: () => import("../pages/speakersList.vue"),
        meta: {
          name: "Speakers",
        },
      },
      {
        path: "add-speaker",
        name: "addSpeaker",
        component: () => import("../pages/addEditSpaker.vue"),
        meta: {
          name: " Add  Speaker  ",
        },
      },
      {
        path: "edit-speaker/:id",
        name: "editSpeaker",
        component: () => import("../pages/addEditSpaker.vue"),
        meta: {
          name: " Edit Speaker  ",
        },
      },
      {
        path: "details-speaker/:id",
        name: "detailsspeaker",
        component: () => import("../pages/detailsSpeaker.vue"),
        meta: {
          name: " Details Speaker ",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
