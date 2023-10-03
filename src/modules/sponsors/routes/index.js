function checkAuh(to) {
  let authKey = localStorage.getItem("accessToken");
  if (!authKey) return { path: "/login" };
}
export default [
  {
    path: "sponsors",
    name: "",
    component: () => import("../pages/sponsors/indexPage.vue"),
    meta: {
      requiresAuth: true,
      name: "Sponsors",
      lable: "Sponsors",
      direct: "/sponsors",
      parentDirect: "/sponsors/category",
      parentLable: "Sponsors Category",
    },
    children: [
      {
        path: "",
        name: "sponsorList",
        component: () => import("../pages/sponsors/sponsorsList.vue"),
        meta: {
          name: "Sponsors",
        },
      },
      {
        path: "category",
        name: "sponsorsCategory",
        component: () => import("../pages/categories/sponsorsCategoryList.vue"),
        meta: { requiresAuth: true, name: "Sponsors Category" },
      },
      {
        path: "category/add-category",
        name: "sponsorsAddCategory",
        component: () =>
          import("../pages/categories/addEditSponsorCategory.vue"),
        meta: {
          requiresAuth: true,
          name: "   / Add Category",
          child: "true",
        },
      },
      {
        path: "category/edit-category/:id",
        name: "sponsorsEditCategory",
        component: () =>
          import("../pages/categories/addEditSponsorCategory.vue"),
        meta: {
          requiresAuth: true,
          name: " / Edit Category",
          child: "true",
        },
      },
      {
        path: "add-sponsor",
        name: "addSponsor",
        component: () => import("../pages/sponsors/addEditSponsors.vue"),
        meta: {
          requiresAuth: true,
          name: " Add Sponsor",
        },
      },
      {
        path: "edit-sponsor/:id",
        name: "editSponsor",
        component: () => import("../pages/sponsors/addEditSponsors.vue"),
        meta: {
          requiresAuth: true,
          name: " Edit Sponsor",
        },
      },
      {
        path: "sponsor-details/:id",
        name: "detailsSponsor",
        component: () => import("../pages/sponsors/detailsSponsor.vue"),
        meta: {
          requiresAuth: true,
          name: "Sponsor Details",
        },
      },
    ],
    beforeEnter: [checkAuh],
  },
];
