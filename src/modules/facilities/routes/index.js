function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "facilities",
    component: () => import("../pages/indexPage.vue"),
    meta: {
      name: "facilities List",
      requiresAuth: true,
      lable: "Facilities",
      direct: "/facilities",
    },
    children: [
      {
        path: "",
        name: "facility",
        component: () => import("../pages/facilitiesList.vue"),
        meta: {
          name: "Facilities",
        },
      },
      {
        path: "add-facility",
        name: "addFacilite",
        component: () => import("../pages/addEditFacility.vue"),
        meta: {
          name: " Add  Facility  ",
        },
      },
      {
        path: "edit-facility/:id",
        name: "editFacility",
        component: () => import("../pages/addEditFacility.vue"),
        meta: {
          name: " Edit Facility  ",
        },
      },
      {
        path: "details-Facility/:id",
        name: "detailsFacility",
        component: () => import("../pages/detailsFacility.vue"),
        meta: {
          name: " Details Facility ",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
