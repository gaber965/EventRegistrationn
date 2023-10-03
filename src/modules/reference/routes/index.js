function checkAuh(to) {
    let authKey = localStorage.getItem("accessToken");
    if (!authKey) return { path: "/login" };
  }
  export default [
    {
      path: "references",
      component: () => import("../pages/indexPage.vue"),
      meta: {
        requiresAuth: true,
        lable: "Reference",
        direct: "/references",
      },
      children: [
        {
          path: "",
          name: "reference",
          component: () => import("../pages/referenceList.vue"),
          meta: {
            requiresAuth: true,
            name: "Reference",
          },
        },
        {
          path: "add-reference",
          name: "addReference",
          component: () => import("../pages/addEditReference.vue"),
          meta: {
            requiresAuth: true,
            name: " Add Reference",
          },
        },
        {
          path: "edit-reference/:id",
          name: "editReference",
          component: () => import("../pages/addEditReference.vue"),
          meta: {
            requiresAuth: true,
            name: " Edit Reference",
          },
        },
      ],
      beforeEnter: [checkAuh],
    },
  ];
