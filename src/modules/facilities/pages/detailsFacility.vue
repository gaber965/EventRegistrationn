<template>
  <q-page>
    <!-- table of register users  -->
    <div class="q-pa-md" id="detailsImage">
      <div class="detailsImage__img">
        <div class="img__bg">
          <div class="username">
            <p>{{ facilitieDetails.name }}</p>
            <div class="edit-icon">
              <q-icon
                name="edit"
                @click.stop="onEdit(item)"
                class="edit icon"
              ></q-icon>
            </div>
          </div>
          <div class="detailsImage__content">
            <img :src="facilitieDetails.contentImagePath" />
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
                            <label>
                              {{ facilitieDetails.placeName }}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="Description input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Bio</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ facilitieDetails.bio }} </label>
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/services";
export default {
  setup(props, { emit }) {
    const loading = ref(false);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const facilitieId = route.params.id;
    const facilitieDetails = ref([]);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const form = ref({
      name: "name",
      HomeDisplay: false,
      location: "location",
      bio: "Egyptians by ADIB & Masria Digital Payments, to launch Khazna Card, a Meeza prepaid card the 1st of its kind in Egypt. Khazna’s App provides employees and gig workers of Egypt’s largest employers and organizations with access to their earned wages (without any liability or financial cost to the Employer) to help fill the liquidity gap between paychecks. Khazna has signed with more than 100 of Egypt’s largest employers and organizations, extending its products and services to more than 300,000 salaried labour force with no cost on the employer.",
    });
    const onEdit = () => {
      $q.loading.show();
      router.push({
        name: "editFacility",
        params: {
          id: route.params.id,
        },
      });
      $q.loading.hide();
    };
    const onDetails = () => {
      $q.loading.show();
      services.detailsFacilitie(orgId, appID, facilitieId).then((res) => {
        if (res.data.statusCode === 200) {
          facilitieDetails.value = res.data.result;
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
      facilitieDetails,
      onDetails,
      facilitieId,
      onEdit,
      appID,
      orgId,
    };
  },
};
</script>
