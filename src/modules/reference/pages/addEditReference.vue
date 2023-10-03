<template>
    <q-page padding>
      <div class="q-pa-md add-category">
        <div class="content">
          <div id="mainsection">
            <div id="add-edit-exhibitor" class="add-edit-exhibitor row">
              <q-form
                @submit.prevent="addEditData()"
                v-model="form"
                class="row form-news"
              >
                <div class="col-lg-8 col-12">
                  <div class="title input-data">
                    <div class="row row__data">
                      <div class="col-md-2 col-12">
                        <p class="q-pt-sm">Title *</p>
                      </div>
                      <div class="col-md-10 col-12">
                        <q-input
                          outlined
                          placeholder="title"
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
                        :label="add == true ? 'Add' : 'Update'"
                        type="submit"
                      />
                    </div>
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
  import services from "../services/services";
  export default {
    setup() {
      const $q = useQuasar();
      const route = useRoute();
      const router = useRouter();
      const orgId = localStorage.getItem('orgId')
      const appId = localStorage.getItem('appID')
      const type = ref('DoctorSchedule')
      const dataId = route.params.id;
      const add = ref(false);
      const edit = ref(false);
      const form = ref({
        name: "",
      });
      watch(route, (to) => {
        if (to.name == "addReference" || to.name == "editReference") {
          functionMain();
        }
      });
      const functionMain = () => {
        if (route.name == "addReference") {
          add.value = true;
          edit.value = false;
        } else if (route.name == "editReference") {
          edit.value = true;
          add.value = false;
          getDetails();
        }
      };
      const addEditData = () => {
        if (route.name == "addReference") {
          addData();
        } else if (route.name == "editReference") {
          editData();
        }
      };
      const addData = () => {
        $q.loading.show();
        services.addData(form.value, orgId, appId).then((res) => {
            if (res.data.statusCode === 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Added successfully",
              });
              router.push({name:'reference'});
              $q.loading.hide();
            } else {
              $q.loading.hide();
              $q.notify({
                color: "red",
                textColor: "white",
                icon: "warning",
                message: "something went wrong",
              });
            }
          });
      };

      const editData = () => {

        $q.loading.show();
        services.updateData( form.value, orgId, appId, dataId).then((res) => {

  if (res.data.statusCode == 200) {

      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Updated successfully",
      });

      router.push({name:'reference'});
      $q.loading.hide();
    } else {

      $q.loading.hide();
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "warning",
        message: "something went wrong",
      });
    }
  });
      };
      // get details
      const getDetails = () => {
        $q.loading.show();
        services.getDetails(orgId, appId, dataId).then((res) => {
          if (res.data.statusCode == 200) {
            form.value = res.data.result;
            $q.loading.hide();
          } else {
                $q.loading.hide();
                $q.notify({
                  color: "red",
                  textColor: "white",
                  icon: "warning",
                  message: "something went wrong",
                });
              }
        });
      };

      onMounted(() => {
        functionMain();
      });
      return {
        getDetails,
        add,
        form,
        edit,
        rules,
        addData,
        addEditData,
        dataId,
        editData,
        orgId,
        appId,
        type
      };
    },
  };
  </script>
