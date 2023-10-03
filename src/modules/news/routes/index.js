function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "news",
    component: () => import("../pages/indexPage.vue"),
    meta: {
      requiresAuth: true,
      lable: "News",
      direct: "/news",
    },
    children: [
      {
        path: "",
        name: "news",
        component: () => import("../pages/newsList.vue"),
        meta: {
          requiresAuth: true,
          name: "News",
        },
      },
      {
        path: "add-new",
        name: "addNew",
        component: () => import("../pages/addNews.vue"),
        meta: {
          requiresAuth: true,
          name: " Add New",
        },
      },
      {
        path: "edit-new/:id",
        name: "editNew",
        component: () => import("../pages/addNews.vue"),
        meta: {
          requiresAuth: true,
          name: " Edit New",
        },
      },
      {
        path: "details-news/:id",
        name: "detailsNews",
        component: () => import("../pages/detailsNews.vue"),
        meta: {
          requiresAuth: true,
          name: " Details New",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
