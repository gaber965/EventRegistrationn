<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <q-form @submit.prevent="addEditData()">
            <div id="add-edit-exhibitor" class="add-edit-exhibitor row">
              <div class="col-lg-2 col-md-3 col-12">
                <div class="exhibitor-image">
                  <div
                    class="upload-image"
                    :class="
                      allExhibitorDetailes.contentImagePath
                        ? 'update-image'
                        : ''
                    "
                  >
                    <img
                      :src="allExhibitorDetailes.contentImagePath"
                      v-if="allExhibitorDetailes.contentImagePath"
                    />
                    <q-file
                      v-model="ImgWord"
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
                      <p>Company Name*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Company Name"
                        dense
                        v-model="allExhibitorDetailes.name"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>

                <div class="exhibitor-phone input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Phone*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Phone Number"
                        dense
                        v-model="allExhibitorDetailes.mobilePhone"
                        type="text"
                        :rules="validation()"
                      />
                    </div>
                  </div>
                </div>

                <div class="website-account input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Website *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Website"
                        dense
                        v-model="allExhibitorDetailes.websiteURL"
                        :rules="
                          allExhibitorDetailes.websiteURL == ''
                            ? rules.required
                            : rules.validUrl
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="email-account input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Email *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Email"
                        dense
                        v-model="allExhibitorDetailes.email"
                        :rules="
                          allExhibitorDetailes.email == ''
                            ? rules.required
                            : rules.validEmail
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-category input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Category *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-select
                        outlined
                        dense
                        v-model="categoryName"
                        :options="allCategories"
                        :class="add == false ? 'added' : ''"
                        :label="categoryName ? '' : 'Select Category'"
                        :rules="rules.required"
                        option-label="name"
                        option-value="id"
                        @update:model-value="selectCategoryId($event)"
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
                        outlined
                        placeholder="Booth Location"
                        dense
                        v-model="allExhibitorDetailes.placeName"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-order input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Order *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="0"
                        dense
                        v-model="allExhibitorDetailes.orderNumber"
                        type="number"
                        :rules="rules.required"
                        min="0"
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
                        v-model="allExhibitorDetailes.bio"
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-display input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Home Display</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <label
                        ><input
                          type="checkbox"
                          name="test_id"
                          v-model="allExhibitorDetailes.homeDisplay"
                          @change="changeCheckBox"
                          class="checkbox"
                        />
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="exhibitor-social input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Social Info</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Facebook"
                        dense
                        v-model="allExhibitorDetailes.fbURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="Twitter"
                        dense
                        v-model="allExhibitorDetailes.twitterURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="LinkedIn"
                        dense
                        v-model="allExhibitorDetailes.linkedinURL"
                        class="input-data"
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
import adminService from "../../services/services";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);

    const allCategories = ref([]);

    const onGetAllCategories = () => {
      adminService.getCategory(orgId, appID).then((res) => {
        allCategories.value = res.data.result;
      });
    };

    const allExhibitorDetailes = ref({
      contentImagePath: "",
      name: "",
      mobilePhone: "",
      websiteURL: "",
      email: "",
      contentCatgoryID: "",
      placeName: "",
      bio: "",
      homeDisplay: false,
      fbURL: "",
      twitterURL: "",
      linkedinURL: "",
      orderNumber: "",
    });

    watch(route, (to) => {
      if (
        to.path == "/exhibitors/add-exhibitor" ||
        to.path == "/exhibitors/edit-exhibitor"
      ) {
        functionExhibitors();
      }
    });
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const changeCheckBox = () => {
      allExhibitorDetailes.value.homeDisplay !=
        allExhibitorDetailes.value.homeDisplay;
    };
    const functionExhibitors = () => {
      if (route.name == "addExhibitor") {
        add.value = true;
        edit.value = false;
      } else if (route.name == "editExhibitor") {
        edit.value = true;
        add.value = false;
        onGetExhibitorDetailes();
      }
    };
    const validation = () => {
      if (allExhibitorDetailes.value.mobilePhone == "") {
        return rules.required;
      } else if (!/^[0-9]*$/.test(allExhibitorDetailes.value.mobilePhone)) {
        return rules.validNumber;
      } else if (/^[0-9]{11}$/.test(allExhibitorDetailes.value.mobilePhone)) {
        return rules.validateDigits;
      } else {
        return rules.validateDigits;
      }
    };
    const addEditData = () => {
      if (route.name == "addExhibitor") {
        addDataExhibitor();
      } else if (route.name == "editExhibitor") {
        updateDataExhibitor();
      }
    };
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "exhibitorsList",
      });
      $q.loading.hide();
    };
    const file = ref("");
    const ImgWord = ref("");
    const uploadImage = () => {
      file.value = ImgWord.value;
      const fileData = new FormData();
      fileData.append("file", file.value);
      $q.loading.show();
      adminService.getImageUrl(fileData).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.loading.show();
          allExhibitorDetailes.value.contentImagePath = resp.data.result.path;
        }
        $q.loading.hide();
      });
    };
    const categoryName = ref("");
    const selectCategoryId = (event) => {
      allExhibitorDetailes.value.contentCatgoryID = event.id;
    };

    const addDataExhibitor = () => {
      $q.loading.show();
      allExhibitorDetailes.value.orderNumber = parseInt(
        allExhibitorDetailes.value.orderNumber
      );
      if (allExhibitorDetailes.value.contentImagePath) {
        adminService
          .addExhibitor(orgId, appID, allExhibitorDetailes.value)
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
                name: "exhibitorsList",
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

    const onGetExhibitorDetailes = () => {
      adminService
        .detailesExhibitor(orgId, appID, route.params.id)
        .then((res) => {
          allExhibitorDetailes.value = res.data.result;
          categoryName.value = res.data.result.categoryName;
        });
    };

    const updateDataExhibitor = () => {
      $q.loading.show();
      allExhibitorDetailes.value.orderNumber = parseInt(
        allExhibitorDetailes.value.orderNumber
      );
      if (allExhibitorDetailes.value.contentImagePath) {
        adminService
          .editExhibitor(
            orgId,
            appID,
            route.params.id,
            allExhibitorDetailes.value
          )
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
                name: "exhibitorsList",
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
          message: "please upload this image",
        });
      }
    };
    onMounted(() => {
      functionExhibitors();
      onGetAllCategories();
    });
    return {
      functionExhibitors,
      add,
      edit,
      allCategories,
      addDataExhibitor,
      updateDataExhibitor,
      onGetAllCategories,
      uploadImage,
      allExhibitorDetailes,
      changeCheckBox,
      addEditData,
      selectCategoryId,
      rules,
      ImgWord,
      categoryName,
      cancel,
      onGetExhibitorDetailes,
      appID,
      orgId,
      validation,
    };
  },
};
</script>
