<template>
    <q-page padding>
      <!-- table of register users  -->
      <div class="q-pa-md table row exbhibitors-category" id="List">
        <div class="col-lg-6 col-md-7 col-12">
          <div class="row exbhibitors-category__contet">
            <div class="col-md-2 col-12 exbhibitors-category__filter">
              <div class="add-category-btn">
                <router-link class="menu-link" :to="{ name: 'addReference' }">
                  <q-btn label=" Add" class="add" icon="add" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- :rows="allReference" -->
        <div class="table-data col-12">
          <q-table
            class="exbhibitors-category__table"
            row-key="name"
            :rows="allReference"
            :columns="columns"
            :loading="loading"
            v-model:pagination="pagination"
            hide-pagination
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="actions">
                <q-btn
                  icon="drive_file_rename_outline"
                  @click.stop="editReference(props.row.id)"
                  class="edit icon"
                ></q-btn>

                <q-btn
                  class="delete icon"
                  @click.stop="openDialog(props.row.id)"
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

        <deleteDialoge @fireEvent="onDelete" v-model="dialog" :name="'Reference'" />
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
      const loading = ref(false);
      const router = useRouter();
      const dialog = ref(false);
      const allReference = ref([]);
      const orgId = localStorage.getItem('orgId')
      const appId = localStorage.getItem('appID')
      const pagination = ref({
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      });
      const columns = [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: (row) => row.name,

          sortable: true,
        },
        { name: "actions", label: "Action", align: "center" },
      ];
      const onGetAllReference = () => {
        $q.loading.show();
        services
          .getAllReference(orgId, appId)
          .then((res) => {
            if (res.data.statusCode == 200) {
              allReference.value = res.data.result.items;
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

      const referenceId = ref("");
      const openDialog = (id) => {
        referenceId.value = id;
        dialog.value = true;
      };
      const onDelete = () => {
        $q.loading.show();
        dialog.value = false;
        services.deleteData(orgId, appId, referenceId.value).then((res) => {
          if (res.data.statusCode == 200) {
            onGetAllReference();
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
      const editReference = (item) => {
        router.push({
          name: "editReference",
          params: {
            id: item,
          },
        });
      };
      const model = ref(10);
      const options = ref([5, 10, 15, 20, 25, 30, 50]);
      const update = (item) => {
        pagination.value.rowsPerPage = item;
      };
      onMounted(() => {
        onGetAllReference();
      });
      return {
        columns,
        onGetAllReference,
        loading,
        allReference,
        onDelete,
        editReference,
        openDialog,
        referenceId,
        pagination,
        dialog,
        pagesNumber: computed(() =>
          Math.ceil(allReference.value.length / pagination.value.rowsPerPage)
        ),
        model,
        options,
        update,
        orgId,
        appId
      };
    },
  };
  </script>
