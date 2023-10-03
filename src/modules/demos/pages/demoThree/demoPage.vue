<template>
  <comingSoonVue :image="event.eventimagelogo" v-if="event.active == false" />
  <q-layout class="rounded-borders" v-if="tempName && event.active">
    <div class="demoThree">
      <demoOneHeader
        :className="'demo-three__header'"
        :buttonName="'Request To Attend'"
        :logo="event.eventimagelogo"
        :buttonUrl="currenttPath + '/registration'"
      ></demoOneHeader>
      <!--end navbar responsive -->

      <!--start caver -->
      <div class="banner" v-if="event">
        <div class="container">
          <div class="row row-banner">
            <div class="col-lg-12">
              <h2>{{ event.name }}</h2>
            </div>
          </div>
        </div>
      </div>
      <!--end caver -->
      <!--start Register -->
      <div class="Register">
        <div class="container">
          <div class="row register-col">
            <div class="col-lg-6 col-md-8 register-conference">
              <div class="col-md-12">
                <div class="row">
                  <div
                    class="col-lg-12 col-md-12 col-sm-12 col-xs-12 register-header"
                  >
                    <h4>
                      {{ event.name }}
                    </h4>
                  </div>

                  <div
                    class="col-lg-12 col-md-12 col-xs-12 register-information"
                  >
                    <div class="row">
                      <div class="col-md-12 col-sm-12">
                        <div class="row row-data-time">
                          <div
                            class="col-lg-6 col-md-6 col-sm-6 col-xs-12 child-data-time"
                          >
                            <div class="location-data">
                              <div class="data">
                                <img
                                  src="../../../../assets/images/Vector.png"
                                />
                                <span class="text"
                                  >{{
                                    new Date(event.startdatetime)
                                      .toLocaleDateString()
                                      .split("T")[0]
                                  }}
                                  {{ event.eventstarttime }}
                                  |
                                  {{
                                    new Date(event.enddatetime)
                                      .toLocaleDateString()
                                      .split("T")[0]
                                  }}
                                  {{ event.eventendtime }}</span
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="parent-data">
                              <div class="data">
                                <img
                                  src="../../../../assets/images/location-svgrepo-com1.png"
                                />
                                <span class="text">{{
                                  event.eventaddress
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-4 text-center btn-Request">
              <q-btn
                color="base-blue1"
                label="Request to Attend"
                :to="{ path: currenttPath + '/registration' }"
              />
            </div>
          </div>
        </div>
      </div>
      <!--end Register -->
      <!--start  conference -->
      <div class="conference">
        <div class="container">
          <div class="text-center header-conference">
            <h4>
              {{ event.name }}
            </h4>
          </div>
          <div class="row-conference">
            <div class="row">
              <div class="col-lg-6 col-md-5 col-sm-5 col-xs-12 image-card">
                <div class="image-size test-image-card">
                  <img :src="event.backgroundImage" />
                </div>
              </div>
              <div
                class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-conference col-conference"
              >
                <p>
                  {{ event.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--end conference -->
      <!--start event speaker -->
      <div class="event-speaker" v-if="Speakers != ''">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-event text-center">
                <h4>Event Speakers</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end event speaker -->
      <!-- start member speaker-->

      <div class="member-speaker">
        <div class="container">
          <div class="row row-speaker">
            <div
              class="col-lg-3 col-md-3 col-sm-6 col-speaker"
              v-for="item in Speakers"
              :key="item.userID"
            >
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img :src="item.imagePath" />
                </div>

                <div class="title-card">
                  <h5>
                    {{ item.name }}<br />
                    <span>{{ item.jobTitleName }}</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    {{ item.bio }}
                  </p>
                </div>
                <div class="social-media">
                  <a :href="item.fbURL"
                    ><img src="../../../../assets/images/Group11_3.png" />
                  </a>
                  <a :href="item.twitterURL"
                    ><img src="../../../../assets/images/Group12_6.png"
                  /></a>
                  <a :href="item.linkedinURL"
                    ><img src="../../../../assets/images/Group13_4.png"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- end member speaker-->
      <!--start Schedule  -->

      <div class="schedule">
        <div class="container">
          <div class="all-row-schedule">
            <div class="col-lg-12 title-schedule text-center">
              <h4>Schedule at a Glance</h4>
            </div>
            <div class="row" v-for="(item, index) in dateArr" :key="item.id">
              <div
                class="col-lg-1 col-md-1 col-xs-12 col-sm-12 perent-btn-schedule"
              >
                <div class="btn-schedule">
                  <div class="time-schedule">:{{ item.date }}</div>
                  <div class="data-schedule">
                    {{ "DAY " + (index + 1) + " : " }}
                  </div>
                </div>
              </div>

              <div class="hover col-lg-1 col-md-1 col-xs-12"></div>
              <div class="col-lg-10 col-md-10 col-date">
                <div class="row row-schedule">
                  <div
                    class="col-lg-4 col-md-4 col-sm-6 col-schedule"
                    v-for="x in Session"
                    :key="x.contentID"
                  >
                    <div v-if="item.date == x.availableDays">
                      <div class="hall-contact">{{ x.placeName }}</div>
                      <div class="hall-time">
                        {{ x.fromTime }} - {{ x.toTime }}
                      </div>
                      <div class="hall-developer">
                        {{ x.name }}
                      </div>
                      <div class="parent-name-job">
                        <div
                          class="name-job"
                          v-for="item2 in item.speakers"
                          :key="item2.contentid"
                        >
                          <div class="hall-name">
                            {{ item2.name }}
                          </div>
                          <div class="hall-job">
                            {{ item2.jobTitle }}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--end Schedule  -->
      <!--start Sponsors & Partners -->

      <div class="Sponsors" v-if="sponsorCategories != ''">
        <div class="container">
          <div class="col-md-12 text-center header-sponsors">
            <h3>Sponsors & Partners</h3>
          </div>
          <div v-for="cat in sponsorCategories" :key="cat">
            <div class="col-md-12 text-center header-Platinum">
              <h4>{{ cat }}</h4>
            </div>
            <div class="row">
              <div
                class="col-md-3 col-sm-6 col-xs-12 card"
                v-for="item in Sponser.filter((data) => {
                  return data.categoryName == cat;
                })"
                :key="item.contentID"
              >
                <img :src="item.contentImagePath" />
              </div>
            </div>
          </div>

          <div class="col-md-12 text-center header-Platinum">
            <h5>Exhibitors</h5>
          </div>
          <div class="row">
            <div
              class="col-md-3 col-sm-6 col-xs-12 card"
              v-for="item in Exhibitors"
              :key="item.contentID"
            >
              <img :src="item.contentImagePath" />
            </div>
          </div>
        </div>
      </div>

      <!--end Sponsors & Partners -->
      <!--start news -->
      <div class="news" v-if="news != ''">
        <div class="container">
          <h3 class="text-center news-title">News</h3>
          <div class="apis">
            <div v-for="item in news" :key="item.contentID">
              <div class="image-news">
                <img :src="item.contentImagePath" />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>{{ item.name }}</h5>
                  <p>
                    {{ item.bio }}
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <!--end news -->
      <!--start join Us  -->
      <div class="joinUs">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h5>Join us on June 27</h5>
              <p>We look forward to hosting you!</p>
              <div class="btn-Request">
                <q-btn
                  :to="{ path: currenttPath + '/registration' }"
                  color="base-white"
                  label="Request to Attend"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end join Us  -->
      <!--start footer -->
      <div class="footer">
        <div class="container">
          <div class="row row-footer">
            <div class="col-lg-12 col-md-12 text-center">
              <p>
                © {{ new Date().getFullYear() }}. All Rights Reserved.<br />
                Event website powered by IPMagiX
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--end footer -->
    </div>
  </q-layout>
</template>
<script>
import demoOneHeader from "../../components/topHeader.vue";
import service from "../../service/service";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import comingSoonVue from "../../components/comingSoon.vue";
export default {
  components: {
    demoOneHeader,
    comingSoonVue,
  },

  setup() {
    const route = useRoute();
    const pageNumber = 1;
    const pageSize = 10;
    const currenttPath = ref("");
    const $q = useQuasar();
    const loading = ref(false);
    const Speakers = ref([]);
    const Exhibitors = ref([]);
    const news = ref([]);
    const Session = ref([]);
    const Sponser = ref([]);
    const sponserCategory = "category_55";
    const sponserCategory2 = "gold3";
    const sponserCategory3 = "Silver";
    const appid = ref("");
    const event = ref([]);
    const getInfoEvent = () => {
      $q.loading.show();
      service.eventDetailes(appid.value).then((res) => {
        if (res.data.statusCode == 200) {
          event.value = res.data.result;
          isTemp();
          $q.loading.hide();
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
        }
        $q.loading.hide();
      });
    };
    const tempName = ref(false);
    const isTemp = () => {
      if (event.value.eventtemplatename == "simplicity") {
        tempName.value = true;
      } else {
        tempName.value = false;
      }
    };
    // start get all Speakers
    const getAllSpeakers = () => {
      $q.loading.show();
      service.speakerList(pageNumber, appid.value, pageSize).then((res) => {
        if (res.data.statusCode == 200) {
          $q.loading.show();
          Speakers.value = res.data.result.items;
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
    // end get all Speaker
    // start get all news
    const getAllNews = () => {
      $q.loading.show();
      service.newsList(pageNumber, appid.value, 4).then((res) => {
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
    // End Get All News
    //Start Get All Exhibitors
    const getAllExhibitors = () => {
      $q.loading.show();
      service.ExhibitorsList(pageNumber, appid.value, 8).then((res) => {
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
    const elementInnerDate = ref("");
    const dateArr = ref([]);
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
      service.getSessionDate(appid.value).then((resp) => {
        var stratDate = formatDate(resp.data.result.startdatetime);
        elementInnerDate.value = stratDate;
        var endDate = formatDate(resp.data.result.enddatetime);
        const dateMove = new Date(stratDate);
        while (stratDate < endDate) {
          stratDate = dateMove.toISOString().slice(0, 10);
          dateArr.value.push({
            date: stratDate,
          });
          dateMove.setDate(dateMove.getDate() + 1);
        }

        getAllSession();
      });
    };

    const getAllSession = () => {
      $q.loading.show();

      service
        .sessionList(pageNumber, appid.value, 3, elementInnerDate.value)
        .then((res) => {
          if (res.data.statusCode == 200) {
            $q.loading.show();
            Session.value = res.data.result.items;
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
    const sponsorCategories = [];
    const getAllSponser = () => {
      $q.loading.show();
      service.sponsorList(pageNumber, appid.value, 0).then((res) => {
        if (res.data.statusCode == 200) {
          $q.loading.show();
          Sponser.value = res.data.result.items;
          Sponser.value.categoryName = Sponser.value.filter((item) => {
            return item.categoryName == sponserCategory;
          });
          Sponser.value.forEach((item) => {
            if (sponsorCategories.includes(item.categoryName)) {
              return false;
            } else {
              sponsorCategories.push(item.categoryName);
            }
          });

          /*  Sponser.value.categoryName = Sponser.value.filter((item) => {
            return item.categoryName == sponserCategory2;
          });
          Sponser.value.categoryName = Sponser.value.filter((item) => {
            return item.categoryName == sponserCategory3;
          });*/
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

    // end Get All Exhibitors
    onMounted(() => {
      appid.value = route.params.id;
      currenttPath.value = route.path;
      getAllNews();
      getAllSpeakers();
      getAllExhibitors();
      getAllSponser();
      funOfGetDate();
      getInfoEvent();
    });
    return {
      //getAllSpeakers,
      sponserCategory,
      sponserCategory2,
      sponserCategory3,
      news,
      Speakers,
      loading,
      Exhibitors,
      Sponser,
      Session,
      dateArr,
      sponsorCategories,
      appid,
      event,
      getInfoEvent,
      tempName,
      isTemp,
      formatDate,
      currenttPath,
    };
  },
};
</script>
