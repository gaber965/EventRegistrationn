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
                  <div class="col-md-8 col-12">
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
                  <div class="col-md-8 col-12">
                    <q-input
                      outlined
                      placeholder="name"
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
  </q-page>
</template>
<script>
import { ref, watch, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import rules from "src/configs/rules";
import adminServices from "../../services/servicesSponsors";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const form = ref({
      orderNumber: "",
      name: "",
    });
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "sponsorsCategory",
      });
      $q.loading.hide();
    };
    watch(route, (to) => {
      if (
        to.name == "sponsorsAddCategory" ||
        to.name == "sponsorsEditCategory"
      ) {
        functionCategory();
      }
    });

    const functionCategory = () => {
      if (route.name == "sponsorsAddCategory") {
        add.value = true;
        edit.value = false;
      } else if (route.name == `sponsorsEditCategory`) {
        edit.value = true;
        add.value = false;
        onGetCategoryDetailes();
      }
    };
    const addEditData = () => {
      if (route.name == "sponsorsAddCategory") {
        addData();
      } else if (route.name == `sponsorsEditCategory`) {
        editData();
      }
    };
    const addData = () => {
      $q.loading.show();
      form.value.orderNumber = parseInt(form.value.orderNumber);
      if (form.value.orderNumber && form.value.name) {
        adminServices
          .addSponsorCategory(orgId, appID, form.value)
          .then((resp) => {
            if (resp.data.statusCode == 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Added Successfully",
              });
              $q.loading.show();
              router.push({
                name: "sponsorsCategory",
              });
              $q.loading.hide();
            }
          });
      }
    };
    const onGetCategoryDetailes = () => {
      $q.loading.show();
      adminServices
        .detailesSponsorCategory(orgId, appID, route.params.id)
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
          .editSponsorCategory(orgId, appID, route.params.id, form.value)
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
                name: "sponsorsCategory",
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
      rules,
      cancel,
      appID,
      orgId,
    };
  },
};
</script>
