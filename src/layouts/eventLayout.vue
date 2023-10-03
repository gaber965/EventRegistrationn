<template>
  <q-layout view="lHh lpR fFf">
    <q-header class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row">
            <div class="nav-data col-md-12 col-12 c-f-p">
              <div class="row nav-info">
                <div class="col-lg-2 col-md-2 col-sm-2">
                  <div class="logo">
                    <router-link  to="/">
                        <img src="../assets/images/logo_layout.png" alt />
                    </router-link>
                  </div>
                </div>
                <div
                  class="search col-lg-5 col-md-5 col-xs-12 col-sm-5 col-xa-12"
                  v-if="showLayout"
                >
                  <q-input v-model="search" placeholder="Search" :dense="dense">
                    <q-icon name="search"></q-icon>
                  </q-input>
                </div>
                <div
                  class="col-lg-4 col-md-4 drop-down col-xs-12 col-sm-4 col-xs-12 col-drop-down-event"
                  v-if="showLayout"
                >
                  <div class="row row-drop-down-event">
                    <div class="col-md-10 drop-down-event">
                      <!-- equivalent -->
                      <!--
                      <q-select
                        bg-color="white"
                        filled
                        v-model="eventNames"
                        :options="optionsevent"
                        class="q-pa-md q-gutter-xs"
                        :dense="dense"
                        @update:model-value="update(eventNames.label)"
                      >
                        <template v-if="model" v-slot:append>
                          <q-icon
                            name="cancel"
                            @click.stop.prevent="model = null"
                            class="cursor-pointer"
                          />
                        </template>
                      </q-select>
                    --></div>
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
                <div
                  class="panel-right-parent col-lg-1 col-md-1 col-xs-12 col-sm-1"
                >
                  <div class="admin-info">
                    <q-avatar>
                      <img
                        @click="open()"
                        src="https://cdn.quasar.dev/img/boy-avatar.png"
                      />
                    </q-avatar>
                    <q-list v-if="isActive">
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

                        <q-item-section @click="logout">logout</q-item-section>
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
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "eventLayout",
  setup() {
    const optionsevent = ref([
      {
        id: 1,
        label: "event name1",
      },
      {
        id: 2,
        label: "event name2",
      },
      {
        id: 3,
        label: "event name3",
      },
      {
        id: 4,
        label: "event name4",
      },
    ]);
    const route = useRoute();
    const router = useRouter();
    const eventList = ref(false);
    const isActive = ref(false);
    const showLayout = ref(false);
    const open = () => {
      if (isActive.value == false) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    };

    // function logout
    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("orgId");
      localStorage.removeItem("appID");
      router.push("/logIn");
    };
    watch(route, (to) => {
      if (to.name === "addEvent" || to.name === 'editEvent') {
        showLayout.value = false;
      } else {
        showLayout.value = true;
      }
    });
    const update = (item) => {};
    onMounted(() => {
      if (route.name === "addEvent" || route.name === 'editEvent') {
        showLayout.value = false;
      } else {
        showLayout.value = true;
      }
    });
    return {
      optionsevent,
      eventList,
      isActive,
      open,
      logout,
      eventNames: ref("Event name"),
      showLayout,
      update,
    };
  },
});
</script>
