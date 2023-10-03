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
                      allSponsorDetailes.contentImagePath ? 'update-image' : ''
                    "
                  >
                    <img
                      :src="allSponsorDetailes.contentImagePath"
                      v-if="allSponsorDetailes.contentImagePath"
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
                      <p>Name*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Name"
                        dense
                        v-model="allSponsorDetailes.name"
                        :rules="rules.required"
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
                        v-model="allSponsorDetailes.email"
                        :rules="
                          allSponsorDetailes.email == ''
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
                        :label="categoryName ? '' : 'Select Category'"
                        :class="add == false ? 'added' : ''"
                        :rules="rules.required"
                        option-label="name"
                        option-value="id"
                        @update:model-value="selectCategoryId($event)"
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
                        v-model="allSponsorDetailes.orderNumber"
                        type="number"
                        min="0"
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
                        v-model="allSponsorDetailes.bio"
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
                          v-model="allSponsorDetailes.homeDisplay"
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
                        v-model="allSponsorDetailes.fbURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="Twitter"
                        dense
                        v-model="allSponsorDetailes.twitterURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="LinkedIn"
                        dense
                        v-model="allSponsorDetailes.linkedinURL"
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
import adminService from "../../services/servicesSponsors";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const allCategories = ref([]);
    const onGetAllCategories = () => {
      adminService.getCategory(orgId, appID).then((res) => {
        allCategories.value = res.data.result;
      });
    };
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "sponsorList",
      });
      $q.loading.hide();
    };
    const categoryName = ref("");
    const selectCategoryId = (event) => {
      allSponsorDetailes.value.contentCatgoryID = event.id;
    };
    const allSponsorDetailes = ref({
      homeDisplay: false,
      contentImagePath: "",
      orderNumber: "",
      contentCatgoryID: "",
      name: "",
      bio: "",
      email: "",
      fbURL: "",
      twitterURL: "",
      linkedinURL: "",
    });

    watch(route, (to) => {
      if (
        to.path == "/sponsor/add-sponsor" ||
        to.path == "/sponsor/edit-sponsor"
      ) {
        functionSponsors();
      }
    });
    const changeCheckBox = () => {
      allSponsorDetailes.value.homeDisplay !=
        allSponsorDetailes.value.homeDisplay;
    };
    const functionSponsors = () => {
      if (route.name == "addSponsor") {
        add.value = true;
        edit.value = false;
      } else if (route.name == "editSponsor") {
        edit.value = true;
        add.value = false;
        onGetSponsorDetailes();
      }
    };
    const addEditData = () => {
      if (route.name == "addSponsor") {
        addDataSponsor();
      } else if (route.name == "editSponsor") {
        updateDataSponsor();
      }
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
          allSponsorDetailes.value.contentImagePath = resp.data.result.path;
          $q.loading.hide();
        }
      });
    };
    const addDataSponsor = () => {
      allSponsorDetailes.value.orderNumber = parseInt(
        allSponsorDetailes.value.orderNumber
      );
      if (allSponsorDetailes.value.contentImagePath) {
        adminService
          .addSponsor(orgId, appID, allSponsorDetailes.value)
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
                name: "sponsorList",
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

    const onGetSponsorDetailes = () => {
      adminService
        .detailesSponsor(orgId, appID, route.params.id)
        .then((res) => {
          allSponsorDetailes.value = res.data.result;
          categoryName.value = res.data.result.categoryName;
        });
    };
    // update data
    const updateDataSponsor = () => {
      $q.loading.show();
      allSponsorDetailes.value.orderNumber = parseInt(
        allSponsorDetailes.value.orderNumber
      );
      if (allSponsorDetailes.value.contentImagePath) {
        adminService
          .editSponsor(orgId, appID, route.params.id, allSponsorDetailes.value)
          .then((resp) => {
            if (resp.data.statusCode == 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Updated Successfully",
              });
              $q.loading.hide();
              router.push({
                name: "sponsorList",
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
    onMounted(() => {
      functionSponsors();
      onGetAllCategories();
    });
    return {
      functionSponsors,
      uploadImage,
      add,
      edit,
      allCategories,
      onGetAllCategories,
      categoryName,
      selectCategoryId,
      addEditData,
      changeCheckBox,
      rules,
      file,
      ImgWord,
      onGetSponsorDetailes,
      allSponsorDetailes,
      addDataSponsor,
      updateDataSponsor,
      cancel,
      appID,
      orgId,
    };
  },
};
</script>
