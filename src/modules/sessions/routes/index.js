function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "sessions",
    component: () => import("../pages/sessions/indexPage.vue"),
    meta: {
      requiresAuth: true,
      name: "Sessions",
      lable: "Sessions",
      direct: "/sessions",
      parentDirect: "/sessions/category",
      parentLable: "Sessions Category",
    },
    children: [
      {
        path: "",
        name: "sessionsList",
        component: () => import("../pages/sessions/sessionsList.vue"),
        meta: {
          name: "Sessions",
        },
      },
      {
        path: "category",
        name: "sessionsCategory",
        component: () => import("../pages/categories/sessionsCategoryList.vue"),
        meta: { requiresAuth: true, name: "Sessions Category" },
      },
      {
        path: "category/add-category",
        name: "sessionsAddCategory",
        component: () =>
          import("../pages/categories/addEditSessionsCategory.vue"),
        meta: {
          requiresAuth: true,
          name: "  / Add Category",
          child: "true",
        },
      },
      {
        path: "category/edit-category/:id",
        name: "sessionsEditCategory",
        component: () =>
          import("../pages/categories/addEditSessionsCategory.vue"),
        meta: {
          requiresAuth: true,
          name: "/ Edit Category",
          child: "true",
        },
      },
      {
        path: "add-session",
        name: "addSessions",
        component: () => import("../pages/sessions/addEditSessions.vue"),
        meta: {
          requiresAuth: true,
          name: " Add Session",
        },
      },
      {
        path: "edit-session/:dataId",
        name: "editSessions",
        component: () => import("../pages/sessions/addEditSessions.vue"),
        meta: {
          requiresAuth: true,
          name: " Edit Session",
        },
      },
      {
        path: "session-details/:dataId",
        name: "detailsSession",
        component: () => import("../pages/sessions/detailesSession.vue"),
        meta: {
          requiresAuth: true,
          name: " Details Session",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
