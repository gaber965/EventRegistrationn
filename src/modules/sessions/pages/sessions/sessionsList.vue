<template>
  <q-page padding>
    <!-- table of register users  -->
    <div class="q-pa-md table row exbhibitors-category">
      <div class="col-md-6 col-12"></div>
      <div class="col-md-6 col-12">
        <div class="row exbhibitors-category__contet">
          <div class="exbhibitors-category__search-input col-md-6 col-12">
            <q-input
              placeholder="Search Session..."
              v-model="filter"
              :dense="dense"
              @keyup.enter="filterSearch(filter)"
            >
              <template v-slot:prepend>
                <q-icon name="search"></q-icon>
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="resetInput"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <div class="col-md-2 col-12">
            <div class="exbhibitors-category__filter">
              <div class="add-category-btn">
                <router-link class="menu-link" :to="{ name: 'addSessions' }">
                  <q-btn label=" Add " class="add" icon="add" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <q-card class="q-mt-lg full-width">
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
            align="left"
            @request="onRequest"
          >
            <q-tab
              v-for="(config, index) in tabsData"
              :name="'DAY ' + (index + 1)"
              :label="'DAY ' + (index + 1) + ' ' + config.date"
              :tab="config.date"
              :key="config.id"
              @click="setTabName(config.date)"
            >
            </q-tab>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              v-for="(config, index) in tabsData"
              :key="config.id"
              :name="'DAY ' + (index + 1)"
              :label="'DAY ' + (index + 1)"
            >
              <div class="q-pa-md">
                <div class="content">
                  <div class="mainsection">
                    <div
                      class="row q-mb-md"
                      v-for="data in allData"
                      :key="data.contentID"
                      @click="details(data.contentID)"
                    >
                      <div class="col-2 time">
                        {{ data.fromTime }}
                        <br />
                        <q-separator class="vir-sperator" vertical />
                        {{ data.toTime }}
                      </div>
                      <div class="col-10">
                        <div class="card">
                          <div class="label">{{ data.placeName }}</div>
                          <div class="icon">
                            <q-icon
                              name="delete"
                              size="32px"
                              @click.stop="openDialog(data.contentID)"
                            />
                          </div>
                          <div class="edit-icon">
                            <q-icon
                              name="edit"
                              @click.stop="onEdit(data.contentID)"
                              class="edit icon"
                            ></q-icon>
                          </div>
                          <div class="content">
                            <p class="header-text">{{ data.name }}</p>
                            <p class="body-text">{{ data.bio }}</p>
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
      <deleteDialoge
        v-model="dialog"
        @fireEvent="onDelete"
        :name="'this Session'"
      />
    </div>
  </q-page>
</template>
<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import deleteDialoge from "../../../../components/deletePopup.vue";
import adminServices from "../../services/servicesSession";
export default {
  components: {
    deleteDialoge,
  },
  setup() {
    const filter = ref(null);
    const isActive = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const search = ref("");
    const filterSearch = (item) => {
      search.value = item;
      onGetAllSession();
    };
    const open = () => {
      if (isActive.value) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }
    };
    const tabsData = ref([]);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const elementInnerText = ref("");
    const funOfGetDate = () => {
      $q.loading.show();
      adminServices.getDate(orgId, appID).then((resp) => {
        var stratDate = formatDate(resp.data.result.startdatetime);
        elementInnerText.value = stratDate;
        var endDate = formatDate(resp.data.result.enddatetime);
        const dateMove = new Date(stratDate);
        while (stratDate < endDate) {
          stratDate = dateMove.toISOString().slice(0, 10);
          tabsData.value.push({
            date: stratDate,
          });
          dateMove.setDate(dateMove.getDate() + 1);
        }
        onGetAllSession();
        $q.loading.hide();
      });
    };

    // get date

    const setTabName = (date) => {
      elementInnerText.value = date;

      onGetAllSession();
    };
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const sorting = ref("");
    const onRequest = (props) => {
      if (props.pagination.sortBy) {
        sorting.value = props.pagination.sortBy;
        onGetAllSession(props.pagination.page);
      } else {
        sorting.value = "";
        onGetAllSession(props.pagination.page);
      }
    };

    const allData = ref([]);
    const onGetAllSession = (page = 0) => {
      $q.loading.show();

      adminServices
        .getAllSession(orgId, appID, page, elementInnerText.value, search.value)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            $q.loading.hide();
            allData.value = resp.data.result.items;
            pagination.value.page = resp.data.result.paging.pageNumber;
            pagination.value.rowsNumber = resp.data.result.paging.totalItems;
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
    const resetInput = () => {
      loading.value = true;
      search.value = "";
      filter.value = "";
      onGetAllSession();
      loading.value = false;
    };
    // for edit and delete
    const onEdit = (item) => {
      $q.loading.show();
      router.push({
        name: "editSessions",
        params: {
          dataId: item,
        },
      });
      $q.loading.hide();
    };
    const sessionId = ref(null);
    const dialog = ref(false);
    const openDialog = (id) => {
      dialog.value = true;
      sessionId.value = id;
    };
    const details = (row) => {
      router.push({
        name: "detailsSession",
        params: {
          dataId: row,
        },
      });
    };
    onMounted(() => {
      funOfGetDate();

      // setTabName(elementInnerText.value);
    });
    const onDelete = () => {
      $q.loading.show();
      adminServices
        .deleteSession(orgId, appID, sessionId.value)
        .then((resp) => {
          dialog.value = false;
          if (resp.data.statusCode == 200) {
            $q.loading.show();
            onGetAllSession();
            loading.value = false;
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Deleted Successfully",
            });
          } else {
            loading.value = false;
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: resp.data.message,
            });
          }
        });
    };
    return {
      loading,
      filter,
      isActive,
      open,
      onEdit,
      openDialog,
      sessionId,
      dialog,
      onDelete,
      filterSearch,
      tab: ref("DAY 1"),
      details,
      pagination,
      sorting,
      onRequest,
      onGetAllSession,
      allData,
      tabsData,
      setTabName,
      elementInnerText,
      resetInput,
      appID,
      orgId,
      funOfGetDate,
      formatDate,
    };
  },
};
</script>
