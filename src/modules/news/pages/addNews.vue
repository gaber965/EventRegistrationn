<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <q-form @submit.prevent="addEditNews()" v-model="form">
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
                <div class="title input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p class="q-pt-sm">Date *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        v-model="form.fromtime"
                        mask="date"
                        :rules="rules.required"
                        dense
                        placeholder="Pick a Day"
                        outlined
                      >
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="form.fromtime">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>

                <div class="exhibitor-location input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p class="q-pt-sm">Location *</p>
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
    const newsId = route.params.id;
    const add = ref(false);
    const edit = ref(false);
    const loading = ref(false);
    const form = ref({
      name: "",
      placeName: "",
      bio: "",
      contentImagePath: "",
      fromtime: "",
    });
    watch(route, (to) => {
      if (to.path == "/news/add-new" || to.path == "/news/edit-new") {
        functionNews();
      }
    });
    const functionNews = () => {
      if (route.path == "/news/add-new") {
        add.value = true;
        edit.value = false;
      } else if (route.path == "/news/edit-new") {
        edit.value = true;
        add.value = false;
        getDetails();
      }
    };
    const addEditNews = () => {
      if (route.name == "addNew") {
        addNews();
      } else if (route.name == "editNew") {
        EditNews();
        getDetails();
      }
    };
    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "news",
      });
      $q.loading.hide();
    };
    const addNews = () => {
      $q.loading.show();
      form.value.fromtime = formatDate(form.value.fromtime);
      if (form.value.contentImagePath) {
        services.addNews(orgId, appID, form.value).then((res) => {
          if (res.data.statusCode === 200) {
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            router.push("/news");
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
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "something went wrong",
          });
        }
      });
    };
    const EditNews = () => {
      form.value.fromtime = formatDate(form.value.fromtime);
      if (form.value.contentImagePath) {
        services.updateNews(orgId, appID, newsId, form.value).then((res) => {
          if (form.value.contentImagePath) {
            if (res.data.statusCode == 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",

                message: "Updated Successfully",
              });
              router.push("/news");
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
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red",
              textColor: "white",
              icon: "warning",
              message: "please upload your image",
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
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    // get details
    const getDetails = () => {
      services.detailsNews(orgId, appID, newsId).then((res) => {
        if (res.data.statusCode == 200) {
          form.value = res.data.result;
        }
      });
    };

    onMounted(() => {
      functionNews();
      getDetails();
    });
    return {
      getDetails,
      add,
      form,
      uploadImage,
      cancel,
      file,
      edit,
      location,
      rules,
      addNews,
      loading,
      imageName,
      addEditNews,
      newsId,
      EditNews,
      formatDate,
      appID,
      orgId,
    };
  },
};
</script>
