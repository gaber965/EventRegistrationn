<template>
  <q-page>
    <!-- table of register users  -->
    <div class="q-pa-md" id="detailsImage">
      <div class="detailsImage__img">
        <div class="img__bg">
          <div class="username">
            <p>{{ allSessionDetailes.name }}</p>
            <div class="edit-icon">
              <q-icon
                name="edit"
                @click.stop="onEdit(item)"
                class="edit icon"
              ></q-icon>
            </div>
          </div>
          <div class="detailsImage__content">
            <img :src="allSessionDetailes.contentImagePath" />
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
          <q-tab name="speaker" label="Speakers" />
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
                            <label>{{ allSessionDetailes.name }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-name input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Date</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allSessionDetailes.availableDays }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-name input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Time</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allSessionDetailes.fromTime }} -
                              {{ allSessionDetailes.toTime }}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="exhibitor-location input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Venu</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSessionDetailes.placeName }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="exhibitor-location input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Category</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label
                              >{{ allSessionDetailes.categoryName }}
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
                            <label>{{ allSessionDetailes.bio }} </label>
                          </div>
                        </div>
                      </div>
                      <div class="Description input-data">
                        <div class="row row__data">
                          <div class="col-md-3 col-12">
                            <p>Live url</p>
                          </div>
                          <div class="col-md-8 col-12">
                            <label>{{ allSessionDetailes.contentURL }} </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="speaker" class="exbhibitors-category">
            <div class="exhibitor-order input-data input-data-addSpeaker">
              <div class="add-speaker-btn">
                <q-btn
                  class="add-speaker-btn"
                  outline
                  label="+ Add "
                  @click.stop="openAddDialog"
                />
              </div>

              <q-dialog v-model="dialog" class="dialog-speaker">
                <div class="q-pa-md">
                  <p class="dialog-speaker__title">Select Speaker</p>

                  <q-table
                    :rows="rowSpeaker"
                    :columns="columnsSpeaker"
                    row-key="name"
                  >
                    <template v-slot:body-cell-name="props">
                      <q-td :props="props" class="name">
                        <img :src="props.row.imagePath" />
                        {{ props.row.name }}
                      </q-td>
                    </template>
                    <template v-slot:body-cell-select="props">
                      <q-td :props="props" class="select">
                        <input
                          type="checkbox"
                          name="test_id"
                          class="checkbox"
                          v-model="selected"
                          :value="props.row.userID"
                        />
                        <span :for="props.row.userID"></span>
                      </q-td>
                    </template>

                    <template v-slot:pagination="scope">
                      <q-btn
                        v-if="scope.pagesNumber > 2"
                        icon="first_page"
                        color="grey-8"
                        round
                        dense
                        flat
                        :disable="scope.isFirstPage"
                        @click="scope.firstPage"
                      />

                      <q-btn
                        icon="chevron_left"
                        color="grey-8"
                        round
                        dense
                        flat
                        :disable="scope.isFirstPage"
                        @click="scope.prevPage"
                      />

                      <q-btn
                        icon="chevron_right"
                        color="grey-8"
                        round
                        dense
                        flat
                        :disable="scope.isLastPage"
                        @click="scope.nextPage"
                      />

                      <q-btn
                        v-if="scope.pagesNumber > 2"
                        icon="last_page"
                        color="grey-8"
                        round
                        dense
                        flat
                        :disable="scope.isLastPage"
                        @click="scope.lastPage"
                      />
                    </template>
                  </q-table>

                  <div class="save-button">
                    <button @click="save()">save</button>
                  </div>
                </div>
              </q-dialog>
            </div>
            <!-- table  -->
            <div class="table-data col-12">
              <q-table
                class="exbhibitors-category__table"
                row-key="name"
                v-model:pagination="pagination"
                hide-pagination
                :rows="allSpeakers"
                :columns="columns"
              >
                <template v-slot:body-cell-name="props">
                  <q-td :props="props" class="name">
                    <img :src="props.row.imagePath" />
                    {{ props.row.name }}
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" class="actions">
                    <q-btn
                      class="delete icon"
                      @click.stop="openDialogDelete(props.row.userID)"
                    >
                      <img src="../../../../assets/images/delete.png" />
                    </q-btn>
                  </q-td>
                </template>

                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
              </q-table>
              <div class="row justify-center q-pb-md">
                <q-pagination
                  v-model="pagination.page"
                  color="grey-8"
                  active-color="base-white"
                  active-text-color="negative"
                  :max="pagesNumber"
                  size="sm"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <deleteDialoge
        v-model="dialogDelete"
        :name="' Speaker'"
        @fireEvent="onDelete"
      />
    </div>
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import deleteDialoge from "../../../../components/deletePopup.vue";
import adminServices from "../../services/servicesSession";
export default {
  components: {
    deleteDialoge,
  },
  setup() {
    const loading = ref(false);
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const allSessionDetailes = ref([]);
    const appID = localStorage.getItem("appID");
    const onGetSessionDetailes = () => {
      $q.loading.show();
      adminServices
        .detailesSession(orgId, appID, route.params.dataId)
        .then((resp) => {
          if (resp.data.statusCode === 200) {
            allSessionDetailes.value = resp.data.result;
            $q.loading.hide();
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
    const onEdit = () => {
      $q.loading.show();
      router.push({
        name: "editSessions",
        params: {
          id: route.params.id,
        },
      });
      $q.loading.hide();
    };
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });
    const columns = [
      {
        name: "name",
        label: "Name",
        align: "left",
        sortable: true,
        field: (row) => row.name,
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        sortable: true,
        field: (row) => row.email,
      },
      {
        name: "job",
        label: "Job Title",
        align: "left",
        sortable: true,
        field: (row) => row.jobTitle,
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
    const allSpeakers = ref([]);
    const onGetSpeaker = () => {
      $q.loading.show();
      adminServices
        .sessionSpeakers(orgId, appID, route.params.dataId)
        .then((resp) => {
          if (resp.data.statusCode === 200) {
            allSpeakers.value = resp.data.result;
            $q.loading.hide();
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
    const orgId = localStorage.getItem("orgId");
    const dialog = ref(false);
    const openAddDialog = () => {
      dialog.value = true;
      onGetAllSpeaker();
    };
    const columnsSpeaker = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "Email",
        field: "email",
        field: (row) => row.email,
        sortable: true,
      },
      {
        name: "jobTitleName",
        label: "Job title",
        field: "job",
        sortable: true,
        field: (row) => row.jobTitleName,
      },
      {
        name: "mobilePhone",
        label: "Phone",
        field: "phone",
        field: (row) => row.mobilePhone,
      },
      { name: "select", label: "Select", align: "center" },
    ];

    const rowSpeaker = ref([]);
    const onGetAllSpeaker = () => {
      $q.loading.show();
      adminServices
        .notAsignSessionSpeaker(orgId, appID, route.params.dataId)
        .then((resp) => {
          if (resp.data.statusCode === 200) {
            rowSpeaker.value = resp.data.result;
            $q.loading.hide();
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
    const selected = ref([]);
    function removeDuplicates(arr) {
      return selected.value.filter(
        (item, index) => arr.indexOf(item) === index
      );
    }
    const form = ref({
      // speakers: "",
    });
    const save = () => {
      var value = selected.value.filter(function (e) {
        var key = Object.keys(e)
          .map((k) => e[k])
          .join("|");
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, {});
      form.value = value.map((item) => {
        return { contentID: route.params.id, userID: item };
      });
      dialog.value = false;
      onGetAllSpeaker();
      addDataSessionSpeaker();
    };
    const addDataSessionSpeaker = () => {
      $q.loading.show();
      adminServices
        .addSessionSpeaker(orgId, appID, route.params.dataId, form.value)
        .then((resp) => {
          if (resp.data.statusCode === 200) {
            onGetSpeaker();
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            router.push({
              name: "detailsSession",
            });
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
    const sessionSpeakerId = ref(null);
    const dialogDelete = ref(false);
    const openDialogDelete = (id) => {
      dialogDelete.value = true;
      sessionSpeakerId.value = id;
    };
    const onDelete = () => {
      $q.loading.show();
      dialogDelete.value = false;

      adminServices
        .deleteSessionSpeaker(
          orgId,
          appID,
          route.params.dataId,
          sessionSpeakerId.value
        )
        .then((resp) => {
          if (resp.data.statusCode === 200) {
            onGetSpeaker();
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Deleted Successfully",
            });
          } else {
            loading.value = false;
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
      onGetSessionDetailes();
      onGetSpeaker();
    });
    return {
      tab: ref("Info"),
      loading,
      allSessionDetailes,
      onGetSessionDetailes,
      columns,
      allSpeakers,
      onGetSpeaker,
      dialog,
      openAddDialog,
      rowSpeaker,
      onGetAllSpeaker,
      columnsSpeaker,
      selected,
      removeDuplicates,
      save,
      form,
      addDataSessionSpeaker,
      openDialogDelete,
      sessionSpeakerId,
      onDelete,
      dialogDelete,
      onEdit,
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(allSpeakers.value.length / pagination.value.rowsPerPage)
      ),
      appID,
      orgId,
    };
  },
};
</script>
