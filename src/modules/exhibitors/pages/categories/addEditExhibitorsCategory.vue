<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <div id="main-section__child">
            <q-form @submit.prevent="addEditData()">
              <div class="category-order">
                <div class="row row__data">
                  <div class="col-md-3 col-12">
                    <p>Order *</p>
                  </div>
                  <div class="col-md-9 col-12">
                    <q-input
                      outlined
                      placeholder="0"
                      dense
                      v-model="form.orderNumber"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div class="category-name">
                <div class="row row__data">
                  <div class="col-md-3 col-12">
                    <p>Name*</p>
                  </div>
                  <div class="col-md-9 col-12">
                    <q-input
                      outlined
                      placeholder="Name"
                      dense
                      v-model="form.name"
                      :rules="rules.required"
                    />
                  </div>
                </div>
              </div>
              <div class="add-edit-buttons">
                <div class="add-edit-button">
                  <q-btn
                    :label="add == true ? 'Add' : 'update'"
                    type="submit"
                  />
                </div>
                <div class="add-edit-button" v-if="add == false">
                  <q-btn label="Cancel" @click="cancel()" />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-page>
</template>

<script>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import rules from "src/configs/rules";
import adminServices from "../../services/services";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);
    const loading = ref(false);
    const form = ref({
      orderNumber: "",
      name: "",
    });
    watch(route, (to) => {
      if (
        to.name == "exhibitorsEditCategory" ||
        to.name == "exhibitorsAddCategory"
      ) {
        functionCategory();
      }
    });
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "exhibitorsCategory",
      });
      $q.loading.hide();
    };
    const functionCategory = () => {
      loading.value = true;
      if (route.name == "exhibitorsAddCategory") {
        add.value = true;
        edit.value = false;
      } else if (route.name == "exhibitorsEditCategory") {
        edit.value = true;
        add.value = false;
        onGetCategoryDetailes();
      }
    };
    const addEditData = () => {
      if (route.name == "exhibitorsAddCategory") {
        addData();
      } else if (route.name == "exhibitorsEditCategory") {
        editData();
      }
    };
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const addData = () => {
      $q.loading.show();
      form.value.orderNumber = parseInt(form.value.orderNumber);

      if (form.value.orderNumber && form.value.name) {
        adminServices
          .addExhibitorCategory(orgId, appID, form.value)
          .then((resp) => {
            if (resp.data.statusCode == 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Added Successfully",
              });
              $q.loading.hide();
              router.push({
                name: "exhibitorsCategory",
              });
              $q.loading.hide();
            }
          });
      }
    };
    const onGetCategoryDetailes = () => {
      $q.loading.show();
      adminServices
        .detailesExhibitorCategory(orgId, appID, route.params.id)
        .then((res) => {
          form.value = res.data.result;
          $q.loading.hide();
        });
    };

    const editData = () => {
      $q.loading.show();
      form.value.orderNumber = parseInt(form.value.orderNumber);
      if (form.value.orderNumber && form.value.name) {
        adminServices
          .editExhibitorCategory(orgId, appID, route.params.id, form.value)
          .then((resp) => {
            if (resp.data.statusCode == 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Updated Successfully",
              });
              $q.loading.show();
              router.push({
                name: "exhibitorsCategory",
              });
              $q.loading.hide();
            }
          });
      }
    };
    onMounted(() => {
      functionCategory();
    });
    return {
      form,
      functionCategory,
      onGetCategoryDetailes,
      add,
      edit,
      addEditData,
      addData,
      editData,
      loading,
      rules,
      cancel,
      appID,
      orgId,
    };
  },
};
</script>
