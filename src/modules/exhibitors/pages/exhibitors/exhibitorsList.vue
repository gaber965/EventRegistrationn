<template>
  <q-page padding>
    <!-- table of register users  -->
    <div class="q-pa-md table row exbhibitors-category">
      <div class="col-lg-6 col-md-7 col-12"></div>
      <div class="col-lg-6 col-md-7 col-12">
        <div class="row exbhibitors-category__contet">
          <div class="exbhibitors-category__search-input col-md-6 col-12">
            <q-input
              placeholder="Search Exhibitor..."
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
          <div class="col-md-5 col-12">
            <div class="row exbhibitors-category__filter">
              <div class="col-6">
                <div class="filter-by filter__content__category">
                  <div class="filter__content" ref="menu2" @click="open()">
                    <q-btn icon="filter_alt" />
                    <p>Filter By</p>
                  </div>
                  <q-list v-if="isActive">
                    <q-form>
                      <q-item v-close-popup class="category">
                        <p>Category</p>
                        <div
                          class="q-pa-md filter-select exhibitor-display exhibitor-category-list"
                        >
                          <div class="q-gutter-md">
                            <label
                              v-for="category in allCategories"
                              :key="category"
                              ><input
                                type="checkbox"
                                name="test_id"
                                class="checkbox"
                                v-model="getCategoryIdArr"
                                :value="category.id"
                              />
                              <span :for="category.id"></span>

                              <p>{{ category.name }}</p>
                            </label>
                          </div>
                        </div>
                      </q-item>
                      <div class="buttons">
                        <q-btn label="Reset" @click="reset()" />
                        <q-btn label="Done" class="apply" @click="apply()" />
                      </div>
                    </q-form>
                  </q-list>
                </div>
              </div>
              <div class="col-5">
                <div class="add-category-btn">
                  <router-link class="menu-link" :to="{ name: 'addExhibitor' }">
                    <q-btn label=" Add " class="add" icon="add" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-data col-12">
        <q-table
          class="exbhibitors-category__table"
          row-key="name"
          :rows="allData"
          :columns="columns"
          @row-click="getRow"
          v-model:pagination="pagination"
          hide-pagination
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props" class="name">
              <img :src="props.row.contentImagePath" />
              {{ props.row.name }}
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="actions">
              <q-btn
                icon="drive_file_rename_outline"
                @click.stop="onEdit(props.row)"
                class="edit icon"
              ></q-btn>
              <q-btn
                class="delete icon"
                @click.stop="openDialog(props.row.contentID)"
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

      <deleteDialoge
        v-model="dialog"
        :name="'this Exhibitor'"
        @fireEvent="onDeleteExhibitor"
      />
    </div>
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import deleteDialoge from "../../../../components/deletePopup.vue";
import adminServices from "../../services/services";
export default {
  components: {
    deleteDialoge,
  },
  setup() {
    const filter = ref(null);
    const isActive = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const search = ref("");
    const filterSearch = (item) => {
      search.value = item;
      onGetAllExibitor();
    };
    const open = () => {
      if (isActive.value) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }
    };
    const update = (item) => {
      pagination.value.rowsPerPage = item;
    };
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
        label: "Name",
        align: "left",
        sortable: true,
        field: (row) => row.name,
        sortable: true,
      },
      {
        name: "categoryName",
        label: "Category ",
        align: "left",
        sortable: true,
        field: (row) => row.categoryName,
        sortable: true,
      },
      {
        name: "placeName",
        label: " Location",
        align: "left",
        sortable: true,
        field: (row) => row.placeName,
        sortable: true,
      },
      {
        name: "mobilePhone",
        label: " Phone",
        align: "left",
        sortable: true,
        field: (row) => row.mobilePhone,
        sortable: true,
      },

      { name: "actions", label: "Action", align: "center" },
    ];
    const allCategories = ref([]);
    const onGetAllCategories = () => {
      adminServices.getCategory(orgId, appID).then((res) => {
        allCategories.value = res.data.result;
      });
    };
    const getCategoryIdArr = ref([]);
    const getCategoryId = ref("");

    function removeDuplicates(arr) {
      return getCategoryIdArr.value.filter(
        (item, index) => arr.indexOf(item) === index
      );
    }

    const apply = () => {
      removeDuplicates(getCategoryIdArr.value);
      getCategoryId.value = removeDuplicates(getCategoryIdArr.value).join(",");
      isActive.value = false;
      onGetAllExibitor();
    };
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    const reset = () => {
      loading.value = true;
      getCategoryIdArr.value = [];

      getCategoryId.value = "";
      isActive.value = false;
      onGetAllExibitor();
      loading.value = false;
    };
    const resetInput = () => {
      loading.value = true;
      search.value = "";
      filter.value = "";
      onGetAllExibitor();
      loading.value = false;
    };
    const allData = ref([]);
    const onGetAllExibitor = () => {
      $q.loading.show();
      adminServices
        .getAllExibitor(orgId, appID, getCategoryId.value, search.value)
        .then((res) => {
          if (res.data.statusCode === 200) {
            allData.value = res.data.result.items;
            $q.loading.hide();
          } else {
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.message,
            });
            $q.loading.hide();
          }
        })
        .catch()
        .finally(() => {
          $q.loading.hide();
        });
    };
    // for edit and delete
    const onEdit = (item) => {
      $q.loading.show();
      router.push({
        name: "editExhibitor",
        params: {
          id: item.contentID,
        },
      });
      $q.loading.hide();
    };
    const categoryId = ref(null);
    const dialog = ref(false);
    const openDialog = (id) => {
      categoryId.value = id;
      dialog.value = true;
    };
    const onDeleteExhibitor = () => {
      $q.loading.show();
      adminServices
        .deleteExhibitor(orgId, appID, categoryId.value)
        .then((resp) => {
          dialog.value = false;
          if (resp.data.statusCode === 200) {
            $q.loading.show();
            onGetAllExibitor();
            loading.value = false;
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: " Deleted Successfully",
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
    const getRow = (evt, row) => {
      $q.loading.show();
      router.push({
        name: "detailsExhibitor",
        params: {
          id: row.contentID,
        },
      });
      $q.loading.hide();
    };
    const model = ref(10);
    const options = ref([5, 10, 15, 20, 25, 30, 50]);
    onMounted(() => {
      onGetAllCategories();
      onGetAllExibitor();
    });
    return {
      loading,
      filter,
      isActive,
      open,
      getRow,
      apply,
      reset,
      columns,
      onEdit,
      openDialog,
      categoryId,
      dialog,
      allData,
      filterSearch,
      resetInput,
      pagination,
      allCategories,
      getCategoryIdArr,
      getCategoryId,
      removeDuplicates,
      onGetAllCategories,
      onGetAllExibitor,
      onDeleteExhibitor,
      update,
      pagesNumber: computed(() =>
        Math.ceil(allData.value.length / pagination.value.rowsPerPage)
      ),
      model,
      appID,
      options,
      orgId,
    };
  },
};
</script>
