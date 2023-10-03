<template>
  <comingSoonVue :image="event.eventimagelogo" v-if="event.active == false" />
  <div class="demo-two-perview" v-if="tempName && event.active">
    <div
      class="demo-two-perview__bg"
      :style="{ backgroundImage: `url(${event.backgroundImage})` }"
    >
      <demoOneHeader
        :className="'demo-two__header'"
        :buttonName="'Register Now'"
        :logo="event.eventimagelogo"
        :buttonUrl="currenttPath + '/registration'"
      ></demoOneHeader>
      <annualInfo
        :className="'demo-two__annual-info'"
        :annualInfoDataCardButton="'Register Now'"
        :buttonUrl="currenttPath + '/registration'"
        :name="event.name"
        :desc="event.description"
        :startdatetime="event.startdatetime"
        :enddatetime="event.enddatetime"
        :eventstarttime="event.eventstarttime"
        :eventendtime="event.eventendtime"
        :eventaddress="event.eventaddress"
      ></annualInfo>
    </div>
    <aboutUs
      :className="'demo-two__about-info'"
      :name="event.name"
      :desc="event.description"
    ></aboutUs>
    <!--  -->
    <div class="demo-two__speaker-info" v-if="Speakers != ''">
      <div class="speaker-info q-pa-md">
        <div class="speaker-info__data">
          <span>EVENT SPEAKERS</span>
          <p class="speaker-info__head">Meet our Speakers</p>
          <div class="speaker-info__data-details">
            <div class="row speaker-info__data__container">
              <speakerInfo
                v-for="speaker in Speakers"
                :key="speaker.id"
                :name="speaker.name"
                :jobTitleName="speaker.jobTitleName"
                :img="speaker.imagePath"
                :bio="speaker.bio"
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
                :name="'DAY ' + (index + 1)"
                :tab="config.date"
                :key="config.id"
                @click="setTabDate(config.date)"
              >
                <p>
                  {{ "Day " + (index + 1) + " : "
                  }}<span>{{ " " + config.date }}</span>
                </p>
              </q-tab>
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel
                v-for="(config, index) in tabsDataSession"
                :key="config.id"
                :name="'DAY ' + (index + 1)"
                :label="'DAY ' + (index + 1)"
              >
                <scheduleInfo
                  v-for="session in sessions"
                  :key="session.id"
                  :fromTime="session.fromTime"
                  :toTime="session.toTime"
                  :placeName="session.placeName"
                  :date="getDay(session.availableDays)"
                  :daySession="daySession"
                  :monthSession="monthSession"
                  :name="session.name"
                  :bio="session.bio"
                  :speakerImg="session.speakers"
                >
                </scheduleInfo>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
    <div class="demo-two__sponsor-info" v-if="sponsorCategories != ''">
      <div class="sponsor-info q-pa-md">
        <div class="sponsor-info__data">
          <span>Presenting our proud sponsors</span>
          <p class="sponsor-info__head">Sponsors & Partners</p>

          <sponsorInfo
            v-for="category in sponsorCategories"
            :key="category"
            :categoryName="category"
            :sponsorImg="Sponser"
          ></sponsorInfo>
        </div>
      </div>
    </div>
    <div class="demo-two__exhibitor-info" v-if="Exhibitors != ''">
      <div class="exhibitor-info q-pa-md">
        <div class="exhibitor-info__data">
          <span>Presenting our Exhibitors</span>
          <p class="exhibitor-info__head">Exhibitors</p>
          <div class="exhibitor-info__data__container">
            <div class="row">
              <exhibitorInfo
                v-for="exhibitor in Exhibitors"
                :key="exhibitor"
                :exhibitorImg="exhibitor.contentImagePath"
              >
              </exhibitorInfo>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-two__news-info" v-if="news != ''">
      <div class="news-info q-pa-md">
        <div class="news-info__data">
          <span>Our Event News</span>
          <p class="news-info__head">News</p>
          <div class="news-info__data__container">
            <div class="row">
              <newsInfo
                v-for="newSection in news"
                :key="newSection"
                :newImage="newSection.contentImagePath"
                :name="newSection.name"
                :bio="newSection.bio"
              ></newsInfo>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerInfo
      :className="'demo-two__footer-info'"
      :footerButton="'Register Now'"
      :buttonUrl="currenttPath + '/registration'"
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
import comingSoonVue from "../../components/comingSoon.vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import Deoms from "../../service/service";
export default defineComponent({
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
    comingSoonVue,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const loading = ref(false);
    const paging = ref(1);
    const event = ref([]);
    const currenttPath = ref("");
    const getInfoEvent = () => {
      $q.loading.show();
      Deoms.eventDetailes(appid.value).then((res) => {
        if (res.data.statusCode == 200) {
          event.value = res.data.result;
          isTemp();
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.result,
          });
        }
      });
    };
    const pageSize = ref(0);
    const pageSizeSession = ref(10);
    const currentt = ref(1);
    const Speakers = ref([]);
    const appid = ref("");
    const tempName = ref(false);
    const isTemp = () => {
      if (event.value.eventtemplatename == "hype") {
        tempName.value = true;
      } else {
        tempName.value = false;
      }
    };
    const getAllSpeakers = () => {
      $q.loading.show();
      Deoms.speakerList(currentt.value, appid.value, pageSize.value).then(
        (res) => {
          if (res.data.statusCode === 200) {
            paging.value = res.data.result.paging.totalPages;
            Speakers.value = res.data.result.items;
            $q.loading.hide();
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.result,
            });
          }
        }
      );
    };
    //
    const tabsDataSession = ref([]);
    const elementInnerDate = ref("");
    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const funOfGetDate = () => {
      $q.loading.show();
      Deoms.getSessionDate(appid.value).then((resp) => {
        var stratDate = formatDate(resp.data.result.startdatetime);
        elementInnerDate.value = stratDate;
        var endDate = formatDate(resp.data.result.enddatetime);
        const dateMove = new Date(stratDate);
        while (stratDate < endDate) {
          stratDate = dateMove.toISOString().slice(0, 10);
          tabsDataSession.value.push({
            date: stratDate,
          });
          dateMove.setDate(dateMove.getDate() + 1);
        }

        getAllSession();
      });
    };
    const setTabDate = (date) => {
      elementInnerDate.value = date;
      getAllSession();
    };
    const sessions = ref([]);
    const getAllSession = (date) => {
      // elementInnerDate.value = setTabDate(date);
      $q.loading.show();
      Deoms.sessionList(
        currentt.value,
        appid.value,
        pageSizeSession.value,
        elementInnerDate.value
      ).then((resp) => {
        if (resp.data.statusCode == 200) {
          sessions.value = resp.data.result.items;
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: resp.data.result,
          });
        }
      });
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
    const Sponser = ref([]);
    const sponsorCategories = ref([]);
    const getAllSponsor = () => {
      $q.loading.show();
      Deoms.sponsorList(currentt.value, appid.value, 0).then((res) => {
        if (res.data.statusCode == 200) {
          $q.loading.show();
          Sponser.value = res.data.result.items;

          Sponser.value.forEach((item) => {
            if (sponsorCategories.value.includes(item.categoryName)) {
              return false;
            } else {
              sponsorCategories.value.push(item.categoryName);
            }
          });
          $q.loading.hide();
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
          $q.loading.hide();
        }
      });
    };
    const Exhibitors = ref([]);
    const getAllexhibitor = () => {
      $q.loading.show();
      Deoms.ExhibitorsList(currentt.value, appid.value, 0).then((res) => {
        if (res.data.statusCode == 200) {
          $q.loading.show();
          Exhibitors.value = res.data.result.items;

          $q.loading.hide();
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
          $q.loading.hide();
        }
      });
    };
    const news = ref([]);
    const getAllNews = () => {
      $q.loading.show();
      Deoms.newsList(currentt.value, appid.value, 0).then((res) => {
        if (res.data.statusCode == 200) {
          $q.loading.show();
          news.value = res.data.result.items;

          $q.loading.hide();
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
          $q.loading.hide();
        }
      });
    };
    onMounted(() => {
      appid.value = route.params.id;
      currenttPath.value = route.path;
      getInfoEvent();
      getAllSpeakers();
      funOfGetDate();
      getAllSponsor();
      getAllexhibitor();
      getAllNews();
    });
    return {
      loading,
      event,
      getInfoEvent,
      pageSize,
      pageSizeSession,
      currentt,
      Speakers,
      appid,
      getAllSpeakers,
      elementInnerDate,
      setTabDate,
      sessions,
      getAllSession,
      Sponser,
      sponsorCategories,
      getAllSponsor,
      Exhibitors,
      getAllexhibitor,
      news,
      getAllNews,
      //
      tabsDataSession,
      tab: ref("DAY 1"),
      getDay,
      daySession,
      monthSession,
      tempName,
      isTemp,
      currenttPath,
      funOfGetDate,
    };
  },
});
</script>
