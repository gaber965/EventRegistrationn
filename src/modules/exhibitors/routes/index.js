function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}

export default [
  {
    path: "exhibitors",
    name: "",
    component: () => import("../pages/exhibitors/indexPage.vue"),
    meta: {
      requiresAuth: true,
      lable: "Exhibitors",
      direct: "/exhibitors",
      parentDirect: "/exhibitors/category",
      parentLable: "Exhibitors Category",
    },
    children: [
      {
        path: "",
        name: "exhibitorsList",
        component: () => import("../pages/exhibitors/exhibitorsList.vue"),
        meta: {
          name: "Exhibitors",
        },
      },
      {
        path: "category",
        name: "exhibitorsCategory",
        component: () =>
          import("../pages/categories/exhibitorsCategoryList.vue"),
        meta: { requiresAuth: true, name: " Exhibitors Category" },
      },
      {
        path: "category/add-category",
        name: "exhibitorsAddCategory",
        component: () =>
          import("../pages/categories/addEditExhibitorsCategory.vue"),
        meta: {
          requiresAuth: true,
          name: "   / Add Category",
          child: "true",
        },
      },
      {
        path: "category/edit-category/:id",
        name: "exhibitorsEditCategory",
        component: () =>
          import("../pages/categories/addEditExhibitorsCategory.vue"),
        meta: {
          requiresAuth: true,
          name: "/ Edit Category",
          child: "true",
        },
      },
      {
        path: "add-exhibitor",
        name: "addExhibitor",
        component: () => import("../pages/exhibitors/addEditExhibitors.vue"),
        meta: {
          requiresAuth: true,
          name: " Add Exhbitior",
        },
      },
      {
        path: "edit-exhibitor/:id",
        name: "editExhibitor",
        component: () => import("../pages/exhibitors/addEditExhibitors.vue"),
        meta: {
          requiresAuth: true,
          name: " Edit Exhbitior",
        },
      },
      {
        path: "exhibitor-details/:id",
        name: "detailsExhibitor",
        component: () => import("../pages/exhibitors/detailsTabs.vue"),
        meta: {
          requiresAuth: true,
          name: " Details Exhbitior",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
