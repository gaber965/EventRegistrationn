<template>
  <q-page>
    <!-- table of register users  -->
    <div class="details">
      <div class="q-pa-md" id="detailsImage">
        <div class="detailsImage__img">
          <div class="img__bg">
            <div class="username">
              <p>{{ getAllDteails.name }}</p>
              <div class="edit-icon">
                <q-icon @click="goToUpdate(getAllDteails.id)" name="edit" class="edit icon"></q-icon>
              </div>
            </div>
            <div class="detailsImage__content">
              <img :src="getAllDteails.eventimagelogo" />
            </div>
          </div>
        </div>
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="layout" label="layout" />
            <q-tab name="Info" label="Info" />
            <q-tab name="features" label="features" />
            <q-tab name="form" label="form" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="layout">
              <div class="layouts">
                <div class="container-layout">
                  <div class="row">
                    <div class="col-lg-4 card"></div>
                    <div class="col-lg-4 card">
                      <img v-if="getAllDteails.eventtemplatename == 'professional'" src="../../../assets/images/Demo1.png" />
                      <img v-if="getAllDteails.eventtemplatename == 'hype'" src="../../../assets/images/Demo2.png" />
                      <img v-if="getAllDteails.eventtemplatename == 'simplicity'" src="../../../assets/images/Demo3.png" />
                    </div>
                    <div class="col-lg-4 card"></div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Info">
              <div class="q-pa-md">
                <div class="content">
                  <div id="mainsection">
                    <div class="row">
                      <div class="col-md-2 col-12"></div>
                      <div class="col-md-10 col-12">
                        <div class="row">
                          <div class="col-md-1"></div>
                          <div class="col-md-10">
                            <div class="exhibitor-name input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>name</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>{{ getAllDteails.name }} </label>
                                </div>
                              </div>
                            </div>
                            <div class="exhibitor-phone input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>description</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label
                                    >{{ getAllDteails.description }}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="website-account input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>start date</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>{{ startDate }} </label>
                                </div>
                              </div>
                            </div>
                            <div class="email-account input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>end date</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>{{ endDate }} </label>
                                </div>
                              </div>
                            </div>
                            <div class="exhibitor-order input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>start time</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label
                                    >{{ getAllDteails.eventstarttime }}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="Description input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>end time</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>
                                    {{ getAllDteails.eventendtime }}</label
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="exhibitor-category input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>Location</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>{{
                                    getAllDteails.eventaddress
                                  }}</label>
                                </div>
                              </div>
                            </div>
                            <div class="exhibitor-location input-data">
                              <div class="row row__data">
                                <div class="col-md-3 col-12">
                                  <p>Verification Type</p>
                                </div>
                                <div class="col-md-8 col-12">
                                  <label>{{
                                    getAllDteails.registereverifytype
                                  }}</label>
                                </div>
                              </div>
                            </div>
                            <div
                              class="exhibitor-display input-data logo-event"
                            >
                              <div class="row row__data">
                                <div class="col-md-3">
                                  <p>Registration Type</p>
                                </div>
                                <div class="col-md-2">
                                  <label>{{ getAllDteails.eventType }} </label>
                                </div>
                                <div class="col-md-7"></div>
                              </div>
                            </div>
                            <div
                              class="exhibitor-display input-data logo-event"
                            >
                              <div class="row row__data">
                                <div class="col-md-3">
                                  <p>event image</p>
                                </div>
                                <div class="col-md-1">
                                  <img :src="getAllDteails.backgroundImage" />
                                </div>

                                <div class="col-md-8"></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="features">
              <div class="parent-lable">
                <div class="row">
                  <div class="col-lg-3"></div>
                  <div class="col-lg-5">
                    <label
                      class="label-select"
                      v-for="feats in feats"
                      :key="feats"
                    >
                      <p>{{ feats }}</p>
                    </label>
                  </div>
                  <div class="col-lg-4"></div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="form">
              <div class="form-data">
                <div
                  class="row"
                  v-for="Required in eventRegisterFormJson"
                  :key="Required"
                >
                  <div class="col-md-3 col-xs-0"></div>
                  <div class="col-md-6 col-xs-12 tabs">
                    <p class="placeholder">{{ Required.placeholder }}</p>
                    <p class="required" v-if="Required.checked == true">Required</p>
                  </div>
                  <div class="col-md-3 col-xs-0"></div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import eventServices from "../services/eventServices";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const appSelect = ref([
      {
        id: 1,
        name: "Sessions",
      },
      {
        id: 2,
        name: "Speakers",
      },
      {
        id: 3,
        name: "Sponsors",
      },
      {
        id: 4,
        name: "Exhibitors",
      },
      {
        id: 5,
        name: "News",
      },
    ]);
    const orgId = localStorage.getItem("orgId");
    const appID = ref('')
    // const route = useRoute();

    const getAllDteails = ref([]);
    const feats = ref([]);
    const eventRegisterFormJson = ref([]);
    //const showLayout = ref(false);
    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const startDate = ref("");
    const endDate = ref("");
    const getDetailsEvent = () => {
      $q.loading.show();
      eventServices.eventDetailes(orgId, appID.value).then((res) => {
        if (res.data.statusCode == 200) {
          getAllDteails.value = res.data.result;
          startDate.value = formatDate(getAllDteails.value.startdatetime);
          endDate.value = formatDate(getAllDteails.value.enddatetime);
          feats.value = JSON.parse(res.data.result.showenfeaturejson);
          eventRegisterFormJson.value = JSON.parse(
            res.data.result.eventRegisterFormJson
          );
          $q.loading.hide();
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
    const goToUpdate = (id) => {
      $q.loading.show();
      router.push({
        name: "editEvent",
        params: {
          id: id,
        },
      });
      $q.loading.hide();
    };

    onMounted(() => {
      appID.value = route.params.id;
      getDetailsEvent();
    });
    return {
      tab: ref("layout"),
      appSelect,
      appID,
      orgId,
      getAllDteails,
      //showLayout,
      getDetailsEvent,
      formatDate,
      startDate,
      endDate,
      feats,
      eventRegisterFormJson,
      goToUpdate
    };
  },
};
</script>
