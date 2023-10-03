<template>
  <div class="demo-two-perview">
    <div class="demo-two-perview__bg">
      <demoOneHeader
        :className="'demo-two__header'"
        :buttonName="'Register Now'"
      ></demoOneHeader>
      <annualInfo
        :className="'demo-two__annual-info'"
        :annualInfoDataCardButton="'Register Now'"
      ></annualInfo>
    </div>
    <aboutUs :className="'demo-two__about-info'"></aboutUs>
    <!--  -->
    <div class="demo-two__speaker-info">
      <div class="speaker-info q-pa-md">
        <div class="speaker-info__data">
          <span>EVENT SPEAKERS</span>
          <p class="speaker-info__head">Meet our Speakers</p>
          <div class="speaker-info__data-details">
            <div class="row speaker-info__data__container">
              <speakerInfo
                v-for="item in 8"
                :key="item"
                :classSocial="'demo-two__socialMedia'"
              ></speakerInfo>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div
      class="schedule-info q-pa-md demo-one-two-schedule-info demo-two__schedule-info"
    >
      <div class="schedule-info__data">
        <span>Schedule Dates</span>
        <p class="schedule-info__head">Schedule at a Glance</p>
        <div class="schedule-info__data__container">
          <q-card class="demo-two-card demo-one-two-card">
            <q-tabs
              v-model="tab"
              dense
              active-color="primary"
              indicator-color="primary"
              narrow-indicator
              outside-arrows
              mobile-arrows
            >
              <q-tab
                v-for="(config, index) in tabsDataSession"
                :name="config.name"
                :tab="config.date"
                :key="config.id"
                @click="setTabDate(config.date)"
              >
                <p>
                  {{ "Day " + (index + 1) + " : "
                  }}<span
                    >{{ " " + config.date }}
                    {{ new Date().getFullYear() }}</span
                  >
                </p>
              </q-tab>
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel
                v-for="config in tabsDataSession"
                :name="config.name"
                :key="config.id"
              >
                <scheduleInfo
                  v-for="item in 2"
                  :key="item"
                  :date="getDay(config.date)"
                  :daySession="daySession"
                  :monthSession="monthSession"
                >
                </scheduleInfo>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
    <div class="demo-two__sponsor-info">
      <div class="sponsor-info q-pa-md">
        <div class="sponsor-info__data">
          <span>Presenting our proud sponsors</span>
          <p class="sponsor-info__head">Sponsors & Partners</p>

          <sponsorInfo
            v-for="category in sponsorCategories"
            :key="category"
            :categoryName="category"
          ></sponsorInfo>
        </div>
      </div>
    </div>
    <div class="demo-two__exhibitor-info">
      <div class="exhibitor-info q-pa-md">
        <div class="exhibitor-info__data">
          <span>Presenting our Exhibitors</span>
          <p class="exhibitor-info__head">Exhibitors</p>
          <div class="exhibitor-info__data__container">
            <div class="row">
              <exhibitorInfo v-for="exhibitor in 8" :key="exhibitor">
              </exhibitorInfo>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-two__news-info">
      <div class="news-info q-pa-md">
        <div class="news-info__data">
          <span>Our Event News</span>
          <p class="news-info__head">News</p>
          <div class="news-info__data__container">
            <div class="row">
              <newsInfo v-for="newSection in 4" :key="newSection"></newsInfo>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerInfo
      :className="'demo-two__footer-info'"
      :footerButton="'Register Now'"
    >
    </footerInfo>
  </div>
</template>
<script>
import demoOneHeader from "../../components/topHeader.vue";
import annualInfo from "../../components/annualInfo.vue";
import aboutUs from "../../components/aboutUs.vue";
import speakerInfo from "../../components/speakerInfo.vue";
import scheduleInfo from "../../components/scheduleInfo.vue";
import SponsorInfo from "../../components/sponsorInfo.vue";
import ExhibitorInfo from "../../components/exhibitorInfo.vue";
import NewsInfo from "../../components/newsInfo.vue";
import footerInfo from "../../components/userFooter.vue";
import { defineComponent, ref, onMounted } from "vue";
export default {
  components: {
    demoOneHeader,
    annualInfo,
    aboutUs,
    speakerInfo,
    scheduleInfo,
    SponsorInfo,
    ExhibitorInfo,
    NewsInfo,
    footerInfo,
  },
  setup() {
    const tabsDataSession = [
      {
        id: 1,
        name: "Day1",
        date: "Sun June 27 ",
      },
      {
        id: 3,
        name: "Day3",
        date: "Mon June 28 ",
      },
      {
        id: 2,
        name: "Day2",
        date: "Tue June 29 ",
      },
      {
        id: 4,
        name: "Day4",
        date: "Wed June 30 ",
      },
      {
        id: 5,
        name: "Day5",
        date: "Thu July 1 ",
      },
    ];
    const sponsorCategories = [
      "Platinum Sponsors",

      "Gold Sponsors",

      "Silver Sponsors",
    ];
    const elementInnerDate = ref("");
    const setTabDate = (date) => {
      elementInnerDate.value = date;
    };
    const daySession = ref("");
    const monthSession = ref("");
    const getDay = (date) => {
      var d = new Date(date),
        day = "" + d.getDate(),
        month = "" + (d.getMonth() + 1);
      d.setMonth(month - 1);
      const monthName = d.toLocaleString("default", { month: "long" });
      if (day.length < 2) day = "0" + day;
      daySession.value = day;
      monthSession.value = monthName;
    };
    onMounted(() => {
      setTabDate("2023-11-27");
    });
    return {
      tabsDataSession,
      elementInnerDate,
      setTabDate,
      tab: ref("Day1"),
      getDay,
      daySession,
      monthSession,
      sponsorCategories,
    };
  },
};
</script>
