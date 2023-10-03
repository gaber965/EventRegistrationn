export default [
  {
    path: "/site",
    component: () => import("../pages/indexPage.vue"),
    meta: {
      name: "Demo",
    },
    children: [
      {
        path: "demo-one-preview",
        name: "demoOnePrev",
        component: () => import("../pages/demoOne/previewPage.vue"),
      },
      {
        path: "professional/:name/:id",
        name: "demoOnePage",
        component: () => import("../pages/demoOne/demoPage.vue"),
      },
      {
        path: "demo-two-preview",
        name: "demoTwoPrev",
        component: () => import("../pages/demoTwo/previewPage.vue"),
      },
      {
        path: "hype/:name/:id",
        name: "demoTwoPage",
        component: () => import("../pages/demoTwo/demoPage.vue"),
      },
      {
        path: "demo-three-preview",
        name: "demoThreePrev",
        component: () => import("../pages/demoThree/previewPage.vue"),
      },
      {
        path: "simplicity/:name/:id",
        name: "demoThreePage",
        component: () => import("../pages/demoThree/demoPage.vue"),
      },
      {
        path: ":tempName/:name/:id/registration",
        name: "formTemplate",
        component: () => import("../pages/formTemplate/formTemplate.vue"),
      },
      {
        path: ":tempName/:name/:id/:registerForm/verifying-email/:userId/:expire",
        name: "verifyingEmail",
        component: () => import("../pages/emailTemplate/verifyingEmail.vue"),
      },

      {
        path: ":tempName/:name/:id/:registerForm/Verfiy-otp/:phone/:userId",
        name: "VerfiyOtp",
        component: () => import("../pages/emailTemplate/VerfiyOtp.vue"),
      },
      {
        path: ":tempName/:name/:id/:registerForm/confirm-registration/:email",
        name: "registerConfirm",
        component: () => import("../pages/emailTemplate/registerConfirm.vue"),
      },
      {
        path: "verifying-moderted",
        name: "verifyingEmailModerted",
        component: () =>
          import("../pages/emailTemplate/verifyingEmailModerted.vue"),
      },
      {
        path: ":tempName/:name/:id/:registerForm/registration-verfied",
        name: "thankRegistration",
        component: () => import("../pages/emailTemplate/thankRegistration.vue"),
      },
    ],
  },
];
