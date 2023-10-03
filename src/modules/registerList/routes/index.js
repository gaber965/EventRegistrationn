function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "registered-users",
    name: "",
    component: () => import("../pages/indexPage.vue"),
    meta: {
      requiresAuth: true,
      name: "registered-useres",
      lable: "Registered users",
      direct: "/registered-users",
    },
    children: [
      {
        path: "",
        name: "registrationList",
        component: () => import("../pages/registrationList.vue"),
        meta: {
          name: "Register",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
