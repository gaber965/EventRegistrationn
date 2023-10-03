function checkAuh(to) {
    let authKey = localStorage.getItem("accessToken");
    if (!authKey) return { path: "/login" };
  }
  export default [
    {
      path: "interests",
      component: () => import("../pages/indexPage.vue"),
      meta: {
        requiresAuth: true,
        lable: "Interests",
        direct: "/interests",
      },
      children: [
        {
          path: "",
          name: "interests",
          component: () => import("../pages/interestsList.vue"),
          meta: {
            requiresAuth: true,
            name: "Interests",
          },
        },
        {
          path: "add-interests",
          name: "addInterests",
          component: () => import("../pages/addEditInterests.vue"),
          meta: {
            requiresAuth: true,
            name: " Add Interests",
          },
        },
        {
          path: "edit-interests/:id",
          name: "editInterests",
          component: () => import("../pages/addEditInterests.vue"),
          meta: {
            requiresAuth: true,
            name: " Edit Interests",
          },
        },
      ],
      beforeEnter: [checkAuh],
    },
  ];
