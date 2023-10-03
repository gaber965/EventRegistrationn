<template>
  <div>
    <div id="nav" :class="stickyHeader()" class="gt-sm">
      <div class="nav q-pa-md" :class="className">
        <header class="main-header">
          <div class="row project-container">
            <div class="col-lg-5 col-md-3 header-imgae-holder">
              <div class="header-imgae-holder__logo">
                <img :src="logo" alt="logo" />
              </div>
            </div>
            <div class="col-lg-7 col-md-9 c-pa">
              <div class="header-sub-links">
                <div class="menu-item">
                  <router-link class="menu-link" to="">
                    <span class="menu-text">Home</span>
                  </router-link>
                </div>
                <div class="menu-item">
                  <router-link class="menu-link" to="">
                    <span class="menu-text">About us</span>
                  </router-link>
                </div>
                <div class="menu-item">
                  <router-link class="menu-link" to="">
                    <span class="menu-text">Speakers</span>
                  </router-link>
                </div>
                <div class="menu-item">
                  <router-link class="menu-link" to="">
                    <span class="menu-text">Schedule</span>
                  </router-link>
                </div>
                <div class="menu-item">
                  <router-link class="menu-link" to="">
                    <span class="menu-text">Sponsors</span>
                  </router-link>
                </div>
                <div class="button">
                  <q-btn :to="{path: buttonUrl}" :label="buttonName" />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
    <q-header class="lt-md main-header" id="nav" :class="stickyHeader()">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <div class="header-imgae-holder__logo">
          <img :src="logo" alt="logo" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawerLeft"
      :width="200"
      :breakpoint="700"
      bordered
      class="bg-grey-3 lt-md"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm menu-bar">
          <div class="header-sub-links">
            <q-btn dense flat icon="close" @click="drawerLeft = !drawerLeft" />
            <div class="menu-item">
              <router-link class="menu-link" to="">
                <span class="menu-text">Home</span>
              </router-link>
            </div>
            <div class="menu-item">
              <router-link class="menu-link" to="">
                <span class="menu-text">About us</span>
              </router-link>
            </div>
            <div class="menu-item">
              <router-link class="menu-link" to="">
                <span class="menu-text">Speakers</span>
              </router-link>
            </div>
            <div class="menu-item">
              <router-link class="menu-link" to="">
                <span class="menu-text">Schudule</span>
              </router-link>
            </div>
            <div class="menu-item">
              <router-link class="menu-link" to="">
                <span class="menu-text">Sponsors</span>
              </router-link>
            </div>
            <div class="button">
              <q-btn :to="{path: buttonUrl}" :label="buttonName" />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import defaultImage from "../../../assets/images/logo.png";
export default {
  props: {},
  props: {
    logo: {
      type: String,
      default: defaultImage,
    },
    buttonName: {
      type: String,
      default: "RSVP Now!",
    },
    className: {
      type: String,
      default: "demo-one__header",
    },
    buttonUrl: {
      type: String,
      default: "",
    },
  },

  setup() {
    const active = ref(false);
    const stickyHeader = () => {
      if (active.value == false) {
        return "nav";
      } else {
        return "sticky-nav";
      }
    };
    onMounted(() => {
      stickyHeader();
      window.document.onscroll = () => {
        let navBar = document.getElementById("nav");
        if (window.scrollY > navBar.offsetTop) {
          active.value = true;
        } else {
          active.value = false;
        }
      };
    });
    return {
      active,
      stickyHeader,
      drawerLeft: ref(false),
    };
  },
};
</script>
