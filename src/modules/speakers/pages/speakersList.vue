<template>
  <q-page padding>
    <!-- table of register users  -->
    <div class="q-pa-md table row exbhibitors-category" id="List">
      <div class="col-lg-6 col-md-7 col-12">
        <div class="row exbhibitors-category__contet">
          <div class="exbhibitors-category__search-input col-md-6 col-12">
            <q-input
              placeholder="Search Speaker..."
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

          <div class="col-md-2 col-12 exbhibitors-category__filter">
            <div class="add-category-btn">
              <router-link class="menu-link" :to="{ name: 'addSpeaker' }">
                <q-btn label=" Add" class="add" icon="add" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- :rows="allEvents" -->
      <div class="table-data col-12">
        <q-table
          class="exbhibitors-category__table"
          row-key="name"
          :rows="allEvents"
          :columns="columns"
          :loading="loading"
          @row-click="getRow"
          v-model:pagination="pagination"
          hide-pagination
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
                icon="drive_file_rename_outline"
                @click.stop="EditSpeaker(props.row.userID)"
                class="edit icon"
              ></q-btn>

              <q-btn
                class="delete icon"
                @click.stop="openDialog(props.row.userID)"
              >
                <img src="../../../assets/images/delete.png" />
              </q-btn>
            </q-td>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
        <div class="row justify-center q-mb-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            active-color="base-white"
            active-text-color="negative"
            :max="pagesNumber"
            size="sm"
          />
          <div class="show">
            <p>Show</p>
            <q-select
              v-model="model"
              @update:model-value="update(model)"
              outlined
              :options="options"
              dense
            />
          </div>
        </div>
      </div>

      <deleteDialoge @fireEvent="onDelete" v-model="dialog" :name="'speaker'" />
    </div>
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import deleteDialoge from "../../../components/deletePopup.vue";
import services from "../services/services";
export default {
  components: {
    deleteDialoge,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const speakerId = route.params.id;
    const loading = ref(false);
    const router = useRouter();
    const filter = ref(null);

    const dialog = ref(false);
    const allEvents = ref([]);
    const isActive = ref(false);
    const open = () => {
      if (isActive.value) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }
    };
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });
    const search = ref("");
    const columns = [
      {
        name: "name",
        label: "Name",
        align: "left",
        field: (row) => row.name,

        sortable: true,
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        field: (row) => row.email,
        sortable: true,
      },
      {
        name: "companyName",
        label: "Company",
        align: "left",
        field: (row) => row.companyName,
        sortable: true,
      },
      {
        name: "jobTitleName",
        label: "Job Title",
        align: "left",
        field: (row) => row.jobTitleName,
        sortable: true,
      },
      {
        name: "mobilePhone",
        label: "Phone",
        align: "left",
        field: (row) => row.mobilePhone,

        sortable: true,
      },
      { name: "actions", label: "Action", align: "center" },
    ];

    const resetInput = () => {
      loading.value = true;
      search.value = "";
      filter.value = "";
      onGetAllspeakers();
      loading.value = false;
    };
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const onGetAllspeakers = (page = 0) => {
      $q.loading.show();
      services
        .getAllSpeaker(orgId, appID, search.value, page)
        .then((res) => {
          if (res.data.statusCode == 200) {
            allEvents.value = res.data.result.items;
            $q.loading.hide();
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "something went wrong",
            });
          }
        })
        .catch()
        .finally(() => {
          loading.value = false;
        });
    };
    const filterSearch = (item) => {
      $q.loading.show();
      search.value = item;
      $q.loading.hide();
      onGetAllspeakers();
    };

    const spearkId = ref("");
    const openDialog = (id) => {
      spearkId.value = id;
      dialog.value = true;
    };
    const onDelete = () => {
      $q.loading.show();
      dialog.value = false;
      services.deleteSpeaker(orgId, appID, spearkId.value).then((res) => {
        if (res.data.statusCode == 200) {
          onGetAllspeakers();
          $q.loading.hide();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: " Deleted Successfully",
          });
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.Message,
          });
        }
      });
    };
    const EditSpeaker = (item) => {
      router.push({
        name: "editSpeaker",
        params: {
          id: item,
        },
      });
    };

    const getRow = (evt, row) => {
      router.push(`/speakers/details-speaker/${row.userID}`);
    };
    const model = ref(10);
    const options = ref([5, 10, 15, 20, 25, 30, 50]);
    const update = (item) => {
      pagination.value.rowsPerPage = item;
    };
    onMounted(() => {
      onGetAllspeakers();
    });
    return {
      columns,
      filter,
      isActive,
      open,
      onGetAllspeakers,
      loading,
      allEvents,
      search,
      onDelete,
      EditSpeaker,
      getRow,
      openDialog,
      spearkId,
      pagination,
      dialog,
      filterSearch,
      speakerId,
      resetInput,
      pagesNumber: computed(() =>
        Math.ceil(allEvents.value.length / pagination.value.rowsPerPage)
      ),
      model,
      options,
      update,
      appID,
      orgId,
    };
  },
};
</script>
