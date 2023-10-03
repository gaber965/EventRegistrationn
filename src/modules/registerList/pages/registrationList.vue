<template>
  <q-page padding>
    <!-- table of register users  -->
    <div class="q-pa-md table row exbhibitors-category">
      <div class="table-data col-12">
        <q-table
          class="exbhibitors-category__table registar-table"
          row-key="name"
          :rows="allData"
          :columns="columns"
          v-model:pagination="pagination"
          hide-pagination
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props" class="">
              {{ props.row.name }}
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props" class="">
              <q-btn class="approved status" v-if="props.row.active == true">
                Approved
              </q-btn>
              <q-btn class="pending status" v-if="props.row.active == null">
                Pending
              </q-btn>
              <q-btn class="decline status" v-if="props.row.active == false">
                Declined
              </q-btn>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="actions">
              <q-btn
                v-if="props.row.active == true || props.row.active == null"
                class="delete icon"
                @click.stop="onReject(props.row.userID)"
              >
                <img src="../../../assets/images/delete.png"
              /></q-btn>
              <q-btn
                v-if="props.row.active == null || props.row.active == false"
                no-caps
                icon="done"
                class="icon approved"
                @click.stop="onApprove(props.row.userID)"
              ></q-btn>
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
      <resgisterPopup
        v-model="dialog"
        :iconName="iconName"
        :name="nameTitle"
        @fireEvent="onRejectFun"
      />
    </div>
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import resgisterPopup from "../../../components/registerPopup.vue";
import adminServices from "../services/service";
export default {
  components: {
    resgisterPopup,
  },
  setup() {
    const isActive = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");

    const update = (item) => {
      pagination.value.rowsPerPage = item;
    };
    const columns = [
      {
        name: "name",
        label: "Name",
        align: "left",
        sortable: true,
        field: (row) => row.name,
        sortable: true,
      },
      {
        name: "email",
        label: "Email ",
        align: "left",
        sortable: true,
        field: (row) => row.email,
        sortable: true,
      },
      {
        name: "phone",
        label: " Mobile Number",
        align: "left",
        sortable: true,
        field: (row) => row.mobilePhone,
        sortable: true,
      },
      {
        name: "status",
        label: " Status",
        align: "left",
        sortable: true,
        field: (row) => row.active,
        sortable: true,
      },

      { name: "actions", label: "Action", align: "center" },
    ];

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    const allData = ref([]);
    const onGetAllRegistarMoudrator = (page = 1) => {
      $q.loading.show();
      adminServices
        .getRegisterMoudrator(orgId, appID, page)
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
    const dialog = ref(false);
    const nameTitle = ref("");
    const iconName = ref("");
    const UserId = ref("");
    // for edit and delete
    const onReject = (userId) => {
      nameTitle.value = "reject";
      iconName.value = "error";
      dialog.value = true;
      UserId.value = userId;
      console.log(" UserId.value ", UserId.value);
    };
    const onRejectFun = () => {
      if (nameTitle.value == "reject") {
        $q.loading.show();
        adminServices
          .approveRegisterMoudrator(orgId, appID, UserId.value, false)
          .then((resp) => {
            dialog.value = false;
            if (resp.data.statusCode === 200) {
              $q.loading.show();
              onGetAllRegistarMoudrator();
              loading.value = false;
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: " Declined Successfully",
              });
            } else {
              dialog.value = false;
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: resp.data.message,
              });
            }
          });
      } else if (nameTitle.value == "approve") {
        $q.loading.show();
        adminServices
          .approveRegisterMoudrator(orgId, appID, UserId.value, true)
          .then((resp) => {
            dialog.value = false;
            if (resp.data.statusCode === 200) {
              $q.loading.show();
              onGetAllRegistarMoudrator();
              loading.value = false;
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: " Approved Successfully",
              });
            } else {
              dialog.value = false;
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: resp.data.message,
              });
            }
          });
      }
    };
    const onApprove = (item) => {
      nameTitle.value = "approve";
      iconName.value = "done";
      dialog.value = true;
      UserId.value = item;
    };
    onMounted(() => {
      onGetAllRegistarMoudrator();
    });
    const model = ref(10);
    const options = ref([5, 10, 15, 20, 25, 30, 50]);

    return {
      loading,
      isActive,
      open,
      columns,
      allData,
      pagination,
      dialog,
      update,
      pagesNumber: computed(() =>
        Math.ceil(allData.value.length / pagination.value.rowsPerPage)
      ),
      model,
      appID,
      options,
      orgId,
      onReject,
      onApprove,
      nameTitle,
      iconName,
      onGetAllRegistarMoudrator,
      onRejectFun,
      UserId,
    };
  },
};
</script>
