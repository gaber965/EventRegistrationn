<template>
  <q-page>
    <!-- table of register users  -->
    <div class="q-pa-md" id="detailsImage">
      <div class="detailsImage__img">
        <div class="img__bg">
          <div class="username">
            <p>{{ allSponsorDetailes.name }}</p>
            <div class="edit-icon">
              <q-icon
                name="edit"
                @click.stop="onEdit(item)"
                class="edit icon"
              ></q-icon>
            </div>
          </div>
          <div class="detailsImage__content">
            <img :src="allSponsorDetailes.contentImagePath" />
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
                    <div class="col-md-10 col-12">
                      <div class="exhibitor-name input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Name</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.name }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="email-account input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Email</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.email }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-category input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Category</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allSponsorDetailes.categoryName }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-order input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Order number</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.orderNumber }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="Description input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Bio</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.bio }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-display input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Home display</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.homeDisplay }} </label>
                          </div>
                        </div>
                      </div>

                      <div class="exhibitor-social input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Social info</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSponsorDetailes.fbURL }} </label>
                            <br />
                            <label>{{ allSponsorDetailes.twitterURL }} </label>
                            <br />
                            <label>{{ allSponsorDetailes.linkedinURL }} </label>
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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import adminServices from "../../services/servicesSponsors";
export default {
  setup() {
    const loading = ref(false);
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const allSponsorDetailes = ref([]);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const onEdit = () => {
      $q.loading.show();
      router.push({
        name: "editSponsor",
        params: {
          id: route.params.id,
        },
      });
      $q.loading.hide();
    };
    const onSponsorDetailes = () => {
      $q.loading.show();
      adminServices
        .detailesSponsor(orgId, appID, route.params.id)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            $q.loading.hide();
            allSponsorDetailes.value = resp.data.result;
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: resp.data.message,
            });
          }
        });
    };
    onMounted(() => {
      onSponsorDetailes();
    });
    return {
      allSponsorDetailes,
      tab: ref("Info"),
      loading,
      onSponsorDetailes,
      onEdit,
      appID,
      orgId,
    };
  },
};
</script>
