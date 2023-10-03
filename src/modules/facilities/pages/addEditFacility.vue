<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <q-form @submit.prevent="addEditfacilities()" v-model="form">
            <div id="add-edit-exhibitor" class="add-edit-exhibitor row">
              <div class="col-lg-2 col-md-3 col-12">
                <div class="exhibitor-image">
                  <div
                    class="upload-image"
                    :class="form.contentImagePath ? 'update-image' : ''"
                  >
                    <img
                      :src="form.contentImagePath"
                      v-if="form.contentImagePath"
                    />
                    <q-file
                      v-model="imageName"
                      @update:model-value="uploadImage()"
                    >
                      <p>Click to Upload</p>
                      <q-icon name="cloud_upload" />
                    </q-file>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-7 col-12">
                <div class="exhibitor-name input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Title*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Title"
                        dense
                        v-model="form.name"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>

                <div class="exhibitor-location input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Location *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        dense
                        outlined
                        v-model="form.placeName"
                        placeholder="Location"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>

                <div class="Description input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Description</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        type="textarea"
                        outlined
                        dense
                        class="description-input"
                        v-model="form.bio"
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
              </div>
            </div>
          </q-form>
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
  setup(props, { emit }) {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const facilityId = route.params.id;
    const add = ref(false);
    const edit = ref(false);
    const loading = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const form = ref({
      name: "",
      placeName: "",
      contentImagePath: "",
      bio: "",
    });

    watch(route, (to) => {
      if (
        to.path == "facilities/add-facility" ||
        to.path == "/facilities/edit-facility"
      ) {
        functionfacilities();
      }
    });

    const functionfacilities = () => {
      if (route.path == "/facilities/add-facility") {
        add.value = true;
        edit.value = false;
      } else if (route.path == "/facilities/edit-facility") {
        edit.value = true;
        add.value = false;
        getDetails();
      }
    };
    const addEditfacilities = () => {
      if (route.name == "addFacilite") {
        addfacilities();
      } else if (route.name == "editFacility") {
        Editfacilities();
        getDetails();
      }
    };
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "facility",
      });
      $q.loading.hide();
    };
    const addfacilities = () => {
      $q.loading.show();
      if (form.value.contentImagePath) {
        services.addFacilitie(orgId, appID, form.value).then((res) => {
          if (res.data.statusCode === 200) {
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            router.push("/facilities");
            $q.loading.hide();
          } else {
            $q.notify({
              color: "red",
              textColor: "white",
              icon: "warning",
              message: "something went wrong",
            });
            $q.loading.hide();
          }
        });
      } else {
        $q.loading.hide();
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "please upload your image",
        });
      }
    };

    const imageName = ref("");
    const file = ref("");
    const uploadImage = () => {
      $q.loading.show();
      file.value = imageName.value;
      const fileData = new FormData();
      fileData.append("file", file.value);
      services.uploadImage(fileData).then((res) => {
        if (res.data.statusCode === 200) {
          form.value.contentImagePath = res.data.result.path;

          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "wrong",
          });
        }
      });
    };
    const Editfacilities = () => {
      $q.loading.show();
      if (form.value.contentImagePath) {
        services
          .updateFacilitie(orgId, appID, facilityId, form.value)
          .then((res) => {
            if (res.data.statusCode === 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Updated Successfully",
              });
              router.push("/facilities");
              $q.loading.hide();
            } else {
              $q.loading.hide();
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "wrong",
              });
            }
          });
      } else {
        $q.loading.hide();
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "please upload your image",
        });
      }
    };
    const getDetails = () => {
      services.detailsFacilitie(orgId, appID, facilityId).then((res) => {
        if (res.data.statusCode == 200) {
          form.value = res.data.result;
        }
      });
    };
    onMounted(() => {
      functionfacilities();
      getDetails();
    });
    return {
      form,
      functionfacilities,
      add,
      edit,
      rules,
      imageName,
      uploadImage,
      loading,
      addEditfacilities,
      addfacilities,
      Editfacilities,
      facilityId,
      cancel,
      appID,
      orgId,
    };
  },
};
</script>
