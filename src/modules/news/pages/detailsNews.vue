<template>
  <q-page>
    <!-- table of register users  -->
    <div class="q-pa-md" id="detailsImage">
      <div class="detailsImage__img">
        <div class="img__bg">
          <div class="username">
            <p>{{ newsDetails.name }}</p>
            <div class="edit-icon">
              <q-icon
                name="edit"
                @click.stop="onEdit(item)"
                class="edit icon"
              ></q-icon>
            </div>
          </div>
          <div class="detailsImage__content">
            <img :src="newsDetails.contentImagePath" />
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
          <q-tab name="Info" label="Info" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Info">
            <div class="q-pa-md">
              <div class="content">
                <div id="mainsection">
                  <div class="row">
                    <div class="col-md-2 col-12"></div>
                    <div class="col-md-8 col-12">
                      <div class="exhibitor-name input-data"></div>
                      <div class="exhibitor-location input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Location</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ newsDetails.placeName }} </label>
                          </div>
                        </div>
                      </div>

                      <div class="Description input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Bio</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ newsDetails.bio }} </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import services from "../services/services";
import { useQuasar } from "quasar";
export default {
  setup(props, { emit }) {
    const route = useRoute();
    const $q = useQuasar();
    const loading = ref(false);
    const router = useRouter();
    const newsId = route.params.id;
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const form = ref({
      name: "name",
      HomeDisplay: false,
      placeName: "location",
      bio: "Egyptians by ADIB & Masria Digital Payments, to launch Khazna Card, a Meeza prepaid card the 1st of its kind in Egypt. Khazna’s App provides employees and gig workers of Egypt’s largest employers and organizations with access to their earned wages (without any liability or financial cost to the Employer) to help fill the liquidity gap between paychecks. Khazna has signed with more than 100 of Egypt’s largest employers and organizations, extending its products and services to more than 300,000 salaried labour force with no cost on the employer.",
    });
    const onEdit = () => {
      $q.loading.show();
      router.push({
        name: "editNew",
        params: {
          id: route.params.id,
        },
      });
      $q.loading.hide();
    };
    const newsDetails = ref([]);
    const onDetails = () => {
      $q.loading.show();
      services.detailsNews(orgId, appID, newsId).then((res) => {
        if (res.data.statusCode === 200) {
          newsDetails.value = res.data.result;
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
    onMounted(() => {
      onDetails();
    });
    return {
      form,
      tab: ref("Info"),
      loading,
      newsId,
      onDetails,
      newsDetails,
      onEdit,
      appID,
      orgId,
    };
  },
};
</script>
