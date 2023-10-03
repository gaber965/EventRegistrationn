<template>
  <q-page>
    <!-- table of register users  -->
    <div class="q-pa-md" id="detailsImage">
      <div class="detailsImage__img">
        <div class="img__bg">
          <div class="username">
            <p>{{ allExhibitorDetailes.name }}</p>
            <div class="edit-icon">
              <q-icon
                name="edit"
                @click.stop="onEdit(item)"
                class="edit icon"
              ></q-icon>
            </div>
          </div>
          <div class="detailsImage__content">
            <img :src="allExhibitorDetailes.contentImagePath" />
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
          <!-- <q-tab name="Members" label="Members" />
          <q-tab name="LeadGeneration" label="Lead Generation" /> -->
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
                            <p>Company name</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allExhibitorDetailes.name }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-phone input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Phone</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allExhibitorDetailes.mobilePhone }}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="website-account input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Website</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allExhibitorDetailes.websiteURL }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="email-account input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Email</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allExhibitorDetailes.email }} </label>
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
                              >{{ allExhibitorDetailes.categoryName }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-location input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Location</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allExhibitorDetailes.placeName }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-order input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Order number</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allExhibitorDetailes.orderNumber }}
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
                            <label>{{ allExhibitorDetailes.bio }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-display input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Home display</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allExhibitorDetailes.homeDisplay }}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="exhibitor-social input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Social info</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allExhibitorDetailes.fbURL }} </label>
                            <br />
                            <label
                              >{{ allExhibitorDetailes.twitterURL }}
                            </label>
                            <br />
                            <label
                              >{{ allExhibitorDetailes.linkedinURL }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!--
          <q-tab-panel name="Members">
            <div class="q-pa-md table row exbhibitors-category">
              <div class="col-lg-6 col-12"></div>
              <div class="col-lg-6 col-12">
                <div class="row exbhibitors-category__contet">
                  <div class="col-md-5 col-12">
                    <div class="row exbhibitors-category__filter">
                      <div class="col-6">
                        <div class="filter-by filter__content__category"></div>
                      </div>
                      <div class="col-5">
                        <div class="add-category-btn">
                          <router-link
                            class="menu-link"
                            :to="{ name: 'addExhibitor' }"
                          >
                            <q-btn label=" Add " class="add" icon="add" />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <q-table
                class="col-12 exbhibitors-category__table"
                row-key="name"
                :rows="allCategories"
                :columns="columns"
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" class="actions">
                    <q-btn
                      class="delete icon"
                      @click.stop="openDialog(props.row.event_ID)"
                    >
                      <img src="../../../../assets/images/delete.png" />
                    </q-btn>
                    <deleteDialoge v-model="dialog" :name="'this member'" />
                  </q-td>
                </template>

                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
              </q-table>
            </div>
          </q-tab-panel> -->

          <!-- <q-tab-panel name="LeadGeneration">
            <div class="q-pa-md table row exbhibitors-category">
              <q-table
                class="col-12 exbhibitors-category__table"
                row-key="name"
                :rows="Categories"
                :columns="Leadcolumns"
              >
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
              </q-table>
            </div>
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
// import deleteDialoge from "../../../../components/deletePopup.vue";
import adminServices from "../../services/services";
export default {
  // components: {
  //   deleteDialoge,
  // },
  setup() {
    const loading = ref(false);
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const columns = [
      {
        name: "name",
        label: "Name",
        align: "left",
        sortable: true,
        field: (row) => row.name,
      },
      {
        name: "Category",
        label: "Email ",
        align: "left",
        sortable: true,
        field: (row) => row.Category,
      },
      {
        name: "location",
        label: " Job Title",
        align: "left",
        sortable: true,
        field: (row) => row.location,
      },
      {
        name: "phone",
        label: " Phone",
        align: "left",
        sortable: true,
        field: (row) => row.phone,
      },

      { name: "actions", label: "Action", align: "center" },
    ];
    const allCategories = [
      {
        order: 1,
        name: "Frozen Yogurt",
        Category: "Frozen cat",
        location: "gehad@ghaly.com",
        phone: "014258",
      },
    ];
    const Categories = [
      {
        order: 1,
        name: "Frozen Yogurt",
        Category: "Frozen cat",
        location: "gehad@ghaly.com",
        phone: "014258",
      },
    ];
    const Leadcolumns = [
      {
        name: "name",
        label: " Member Name",
        align: "left",
        sortable: true,
        field: (row) => row.name,
      },
      {
        name: "Category",
        label: "Attendee Name ",
        align: "left",
        sortable: true,
        field: (row) => row.Category,
      },
      {
        name: "location",
        label: " Email",
        align: "left",
        sortable: true,
        field: (row) => row.location,
      },
      {
        name: "location",
        label: " Company",
        align: "left",
        sortable: true,
        field: (row) => row.location,
      },
      {
        name: "phone",
        label: " Phone",
        align: "left",
        sortable: true,
        field: (row) => row.phone,
      },
      {
        name: "Comment",
        label: " Comment",
        align: "left",
        sortable: true,
        field: (row) => row.phone,
      },
    ];

    const allExhibitorDetailes = ref([]);
    const onExhibitorDetailes = () => {
      $q.loading.show();
      adminServices
        .detailesExhibitor(orgId, appID, route.params.id)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            $q.loading.hide();
            allExhibitorDetailes.value = resp.data.result;
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

    const categoryId = ref(null);
    const dialog = ref(false);
    const onEdit = () => {
      $q.loading.show();
      router.push({
        name: "editExhibitor",
        params: {
          id: route.params.id,
        },
      });
      $q.loading.hide();
    };
    onMounted(() => {
      onExhibitorDetailes();
    });
    return {
      tab: ref("Info"),
      loading,
      columns,
      Leadcolumns,
      // openDialog,
      onEdit,
      categoryId,
      allExhibitorDetailes,
      dialog,
      allCategories,
      Categories,
      onExhibitorDetailes,
      appID,
      orgId,
    };
  },
};
</script>
