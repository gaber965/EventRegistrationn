<template>
  <q-page padding>
    <!-- table of register users  -->
    <div class="q-pa-md table row exbhibitors-category">
      <div class="col-lg-6 col-md-6 col-12">
        <div class="row exbhibitors-category__contet">
          <div class="exbhibitors-category__search-input col-md-5 col-12"></div>

          <div class="col-md-2 col-12 exbhibitors-category__filter">
            <div class="add-category-btn">
              <router-link
                class="menu-link"
                :to="{ name: 'sponsorsAddCategory' }"
              >
                <q-btn label=" Add" class="add" icon="add" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="table-data col-12">
        <q-table
          class="exbhibitors-category__table"
          row-key="name"
          :rows="allCategories"
          :columns="columns"
          v-model:pagination="pagination"
          hide-pagination
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="actions">
              <q-btn
                icon="drive_file_rename_outline"
                @click.stop="onEdit(props.row.contentCatgoryID)"
                class="edit icon"
              ></q-btn>

              <q-btn
                class="delete icon"
                @click.stop="openDialog(props.row.contentCatgoryID)"
              >
                <img src="../../../../assets/images/delete.png" />
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

      <deleteDialoge v-model="dialog" @fireEvent="onDeleteSponsorCategory" />
    </div>
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import deleteDialoge from "../../../../components/deletePopup.vue";
import adminServices from "../../services/servicesSponsors";
export default {
  components: {
    deleteDialoge,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const columns = [
      {
        name: "orderNumber",
        label: "Order",
        align: "left",
        field: (row) => row.orderNumber,
        sortable: true,
      },
      {
        name: "name",
        label: "Category Name",
        align: "left",
        field: (row) => row.name,
        sortable: true,
      },
      { name: "actions", label: "Action", align: "center" },
    ];

    const allCategories = ref([]);
    const onGetAllCategories = (page = 0) => {
      $q.loading.show();
      adminServices
        .getSponsorCategories(orgId, appID, page)
        .then((res) => {
          if (res.data.statusCode == 200) {
            $q.loading.hide();
            allCategories.value = res.data.result.items;
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.message,
            });
          }
        })
        .catch()
        .finally(() => {
          $q.loading.hide();
        });
    };
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });
    // for edit and delete
    const onEdit = (item) => {
      $q.loading.show();
      router.push(`/sponsors/category/edit-category/${item}`);
      $q.loading.hide();
    };
    const categoryId = ref(null);
    const dialog = ref(false);
    const openDialog = (id) => {
      categoryId.value = id;
      dialog.value = true;
    };
    const onDeleteSponsorCategory = () => {
      $q.loading.show();
      dialog.value = false;
      adminServices
        .deleteSponsorCategory(orgId, appID, categoryId.value)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            onGetAllCategories();
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Deleted Successfully",
            });
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: resp.data.Message,
            });
          }
        });
    };
    const model = ref(10);
    const options = ref([5, 10, 15, 20, 25, 30, 50]);
    const update = (item) => {
      pagination.value.rowsPerPage = item;
    };
    onMounted(() => {
      onGetAllCategories();
    });
    return {
      loading,
      pagination,
      columns,
      onEdit,
      openDialog,
      onDeleteSponsorCategory,
      categoryId,
      dialog,
      allCategories,
      onGetAllCategories,
      pagesNumber: computed(() =>
        Math.ceil(allCategories.value.length / pagination.value.rowsPerPage)
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
