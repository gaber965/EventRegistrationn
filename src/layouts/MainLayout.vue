<template>
  <div class="Registered-users-list">
    <div class="Registered-users-list__content">
      <q-layout view="lHh lpR fFf">
        <div v-if="showLayout">
          <q-header class="bg-white text-white">
            <q-toolbar>
              <q-btn
                class="q-mt-lg"
                dense
                flat
                round
                icon="menu"
                @click="toggleLeftDrawer"
              />

              <q-toolbar-title>
                <div class="row">
                  <div class="nav-data col-md-12 col-12 c-f-p">
                    <div class="row nav-info q-mt-lg">
                      <div class="search col-md-4 col-6">
                        <q-input
                          v-model="search"
                          placeholder="Search"
                          :dense="dense"
                        >
                          <q-icon name="search"></q-icon>
                        </q-input>
                      </div>
                      <div
                        class="col-lg-7 col-md-4 drop-down col-xs-12 col-sm-4 col-xs-12 col-drop-down-event"
                        v-if="showLayout"
                      >
                        <div class="row row-drop-down-event">
                          <div class="col-md-10 drop-down-event">
                            <!-- equivalent -->
                            <q-select
                              bg-color="white"
                              filled
                              v-model="eventNames"
                              :options="optionsevent"
                              class="q-pa-md q-gutter-xs"
                              :dense="dense"
                              @update:model-value="switchEvent(eventNames)"
                              option-label="name"
                            >
                              <template v-if="model" v-slot:append>
                                <q-icon
                                  name="cancel"
                                  @click.stop.prevent="model = null"
                                  class="cursor-pointer"
                                />
                              </template>
                            </q-select>
                          </div>
                          <div class="col-md-2 add-event">
                            <router-link :to="{ name: 'addEvent' }">
                              <q-btn
                                round
                                color="black"
                                icon="add"
                                to.name="addEvent"
                              />
                            </router-link>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-1 col-6">
                        <div class="admin-info">
                          <q-avatar>
                            <img
                              @click="open()"
                              src="https://cdn.quasar.dev/img/boy-avatar.png"
                            />
                          </q-avatar>
                          <q-list v-if="isActive">
                            <!-- <q-item
                              clickable
                              v-ripple
                              :active="link === 'inbox'"
                              @click="link = 'inbox'"
                              active-class="my-menu-link"
                              class="submenu"
                            >
                              <q-item-section avatar>
                                <q-icon name="person" class="icon-submenu" />
                              </q-item-section>
                              <q-item-section>Profile</q-item-section>
                            </q-item> -->
                            <q-item
                              clickable
                              v-ripple
                              :active="link === 'settings'"
                              @click="link = 'settings'"
                              active-class="my-menu-link"
                              class="submenu"
                            >
                              <q-item-section avatar >
                                <q-icon name="settings" class="icon-submenu" />
                              </q-item-section>

                              <q-item-section @click="viewEvent">Settings</q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-ripple
                              :active="link === 'trash'"
                              @click="link = 'trash'"
                              active-class="my-menu-link"
                              class="submenu"
                            >
                              <q-item-section avatar>
                                <q-icon name="logout" class="icon-submenu" />
                              </q-item-section>

                              <q-item-section @click="logout"
                                >logout</q-item-section
                              >
                            </q-item>
                          </q-list>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-toolbar-title>

              <!--- ========================================-->
            </q-toolbar>
            <div class="small-screen">
              <q-input v-model="search" placeholder="Search" :dense="dense">
                <q-icon name="search"></q-icon>
              </q-input>
            </div>
            <q-breadcrumbs class="q-mt-xl q-ml-sm">
              <a href="/home">
                <q-breadcrumbs-el
                  ><q-rating max="1" size="1em" color="purple-4" icon="home" />/
                  Event Registration Portal /</q-breadcrumbs-el
                >
              </a>
              <q-breadcrumbs-el
                v-if="crampParent.lable != cramp.name"
                :to="crampParent.direct"
                :label="crampParent.lable"
                >&nbsp;/</q-breadcrumbs-el
              >
              <q-breadcrumbs-el
                v-if="crampParent.parentDirect && cramp.child == 'true'"
                :to="crampParent.parentDirect"
                :label="crampParent.parentLable"
              />

              <q-breadcrumbs-el :to="{ name: crampLink }" :label="cramp.name" />
            </q-breadcrumbs>
          </q-header>

          <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
              <q-list>
                <div class="logo">
                  <router-link to="/">
                    <img src="../assets/images/logo_layout.png" alt />
                  </router-link>
                </div>

                <div class="menu">
                  <div class="menu-item">
                    <router-link class="menu-link" to="/">
                      <q-icon class="q-mr-sm" name="dashboard"></q-icon>
                      <span class="menu-text">Events List</span>
                    </router-link>
                  </div>
                  <q-expansion-item
                    v-for="item in sideMenuListDropDown.filter((data) => {
                      return data.isShow == true;
                    })"
                    :key="item"
                    :icon="item.icon"
                    :label="item.label"
                    header-class="text-black"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="webinars-dropdown">
                          <div class="webinars-dropdown-list">
                            <router-link
                              class="menu-link"
                              :to="{ name: item.name }"
                            >
                              <span class="menu-text">{{ item.label }}</span>
                            </router-link>
                          </div>
                          <div class="webinars-dropdown-list">
                            <router-link
                              class="menu-link"
                              :to="{ name: item.categoryName }"
                            >
                              <span class="menu-text">{{
                                item.categoryLable
                              }}</span>
                            </router-link>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <div
                    class="menu-item"
                    v-for="item in sideMenuList.filter((data) => {
                      return data.isShow == true;
                    })"
                    :key="item"
                  >
                    <router-link class="menu-link" :to="{ name: item.name }">
                      <q-icon class="q-mr-sm" :name="item.icon"></q-icon>
                      <span class="menu-text">{{ item.label }}</span>
                    </router-link>
                  </div>
                </div>
              </q-list>
            </q-drawer>
          </q-drawer>
        </div>
        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import sevices from "../modules/mangaeEvent/services/eventServices";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    let search = ref(null);
    const cramp = ref("");
    const crampParent = ref("");
    const crampLink = ref("");
    const route = useRoute();
    const router = useRouter();
    const showLayout = ref(false);
    const orgId = localStorage.getItem("orgId");
    var appId = localStorage.getItem("appID");
    const switchEvent = (item) => {
      console.log("item", item);
      appId = item.id;
      console.log(appId);
      localStorage.setItem("appID", appId);
      router.push({ name: "homePage" });
      getEventInfo();
    };
    const eventData = ref([]);
    const sideMenuList = ref([
      {
        label: "Speakers",
        name: "SpeakersList",
        icon: "record_voice_over",
        isShow: false,
      },
      {
        label: "Facility",
        name: "facility",
        icon: "apartment",
        isShow: false,
      },
      {
        label: "News",
        name: "news",
        icon: "feed",
        isShow: false,
      },
      {
        label: "Interests",
        name: "interests",
        icon: "interests",
        isShow: false,
      },
      {
        label: "References",
        name: "reference",
        icon: "room_preferences",
        isShow: false,
      },
      {
        label: "Registered Users",
        name: "registrationList",
        icon: "app_registration",
        isShow: false,
      },
    ]);
    const sideMenuListDropDown = ref([
      {
        label: "Sessions",
        name: "sessionsList",
        icon: "event",
        categoryLable: "Sessions Categories",
        categoryName: "sessionsCategory",
        isShow: false,
      },
      {
        label: "Exhibitors",
        name: "exhibitorsList",
        icon: "account_box",
        categoryLable: "Exhibitors Categories",
        categoryName: "exhibitorsCategory",
        isShow: false,
      },
      {
        label: "Sponsors",
        name: "sponsorList",
        icon: "attach_money",
        categoryLable: "Sponsors Categories",
        categoryName: "sponsorsCategory",
        isShow: false,
      },
    ]);
    const eventNames = ref("Event Name");
    const getEventInfo = () => {
      $q.loading.show();
      sevices.eventDetailes(orgId, appId).then((res) => {
        if (res.data.statusCode === 200) {
          eventNames.value = res.data.result;

          sideMenuList.value.forEach((item) => {
            item.isShow = false;
          });
          sideMenuListDropDown.value.forEach((item) => {
            item.isShow = false;
          });
          if (
            res.data.result.eventRegisterFormJson != "" &&
            res.data.result.eventRegisterFormJson != "null"
          ) {
            eventData.value = JSON.parse(res.data.result.showenfeaturejson);
            eventData.value.forEach((item) => {
              for (let i = 0; i < sideMenuList.value.length; i++) {
                if (sideMenuList.value[i].label == item) {
                  sideMenuList.value[i].isShow = true;
                }
              }
            });
          }
          if (
            res.data.result.showenfeaturejson != "" &&
            res.data.result.showenfeaturejson != "null"
          ) {
            let list = JSON.parse(res.data.result.eventRegisterFormJson);
            list.forEach((item) => {
              for (let i = 0; i < sideMenuList.value.length; i++) {
                if (sideMenuList.value[i].label == item.placeholder) {
                  sideMenuList.value[i].isShow = true;
                }
              }
            });
            let eventDetails = JSON.parse(res.data.result.showenfeaturejson);
            eventDetails.forEach((item) => {
              for (let i = 0; i < sideMenuListDropDown.value.length; i++) {
                if (sideMenuListDropDown.value[i].label == item) {
                  sideMenuListDropDown.value[i].isShow = true;
                }
              }
            });
          }
          if (res.data.result.eventType == "moderator") {
            sideMenuList.value[5].isShow = true;
          }
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
        }
      });
    };
    watch(route, (to) => {
      if (
        to.path === "/" ||
        to.name == "logIn" ||
        to.name == "demoOnePrev" ||
        to.name == "demoOnePage" ||
        to.name == "demoTwoPage" ||
        to.name == "demoTwoPrev" ||
        to.name == "demoThreePrev" ||
        to.name == "formTemplate" ||
        to.name == "demoThreePage" ||
        to.name == "verifyingEmail" ||
        to.name == "registerConfirm" ||
        to.name == "VerfiyOtp" ||
        to.name == "verifyingEmailModerted" ||
        to.name == "thankRegistration"
      ) {
        showLayout.value = false;
      } else {
        showLayout.value = true;
      }
      cramp.value = to.meta;
      crampParent.value = to.meta;
      crampLink.value = to.name;
    });

    onMounted(() => {
      cramp.value = route.meta;
      console.log(route);
      crampParent.value = route.meta;
      crampLink.value = route.name;
      if (
        route.name == "logIn" ||
        route.path === "/" ||
        route.name == "demoOnePrev" ||
        route.name == "demoThreePrev" ||
        route.name == "demoOnePage" ||
        route.name == "demoTwoPrev" ||
        route.name == "formTemplate" ||
        route.name == "demoThreePage" ||
        route.name == "demoTwoPage" ||
        route.name == "verifyingEmail" ||
        route.name == "VerfiyOtp" ||
        route.name == "registerConfirm" ||
        route.name == "verifyingEmailModerted" ||
        route.name == "thankRegistration"
      ) {
        showLayout.value = false;
      } else {
        showLayout.value = true;
        getEventInfo();
        getEventsForDropDown();
      }
    });
    // function logout
    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("orgId");
      localStorage.removeItem("appID");
      router.push({ name: "logIn" });
    };
    const viewEvent = () => {
      $q.loading.show();
      router.push({
        name: "eventDetails",
        params: {
          id: appId,
        },
      });
      $q.loading.hide();
    };
    const isActive = ref(false);
    const open = () => {
      if (isActive.value == false) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    };
    // start update dropDwon
    const optionsevent = ref([]);
    const getEventsForDropDown = () => {
      sevices.EventDropDown(orgId).then((res) => {
        if (res.data.statusCode == 200) {
          optionsevent.value = res.data.result;
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "something went wrong",
          });
        }
      });
    };

    // end update dropDwon

    return {
      leftDrawerOpen,
      search,
      cramp,
      drawerLeft: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      showLayout,
      logout,
      isActive,
      open,
      crampParent,
      crampLink,
      sideMenuList,
      sideMenuListDropDown,
      getEventInfo,
      orgId,
      appId,
      eventData,
      optionsevent,
      switchEvent,
      eventNames,
      getEventsForDropDown,
      viewEvent
    };
  },
});
</script>
