<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <div id="add-edit-exhibitor" class="add-edit-exhibitor row">
            <q-form
              @submit.prevent="addEditSpearks()"
              v-model="form"
              class="row form-news"
            >
              <div class="col-md-2 col-12">
                <div class="exhibitor-image">
                  <div
                    class="upload-image"
                    :class="form.imagePath ? 'update-image' : ''"
                  >
                    <img :src="form.imagePath" v-if="form.imagePath" />
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
              <div class="col-md-8 col-12">
                <div class="speaker-name input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Name*</p>
                    </div>
                    <div class="col-md-10 col-12">
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
                        v-model="form.email"
                        :rules="
                          form.email == '' ? rules.required : rules.validEmail
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="JobTitle-account input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Job Title *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Job Title"
                        dense
                        v-model="form.jobTitleName"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>
                <div class="speaker-Company input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Company *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Company"
                        dense
                        v-model="form.companyName"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>
                <div class="speaker-phone input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Phone Number*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Phone Number"
                        dense
                        v-model="form.mobilePhone"
                        type="text"
                        :rules="validation()"
                      />
                    </div>
                  </div>
                </div>

                <div class="Bio input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Bio</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        type="textarea"
                        outlined
                        dense
                        class="description-input"
                        v-model="form.Bio"
                      />
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
                        v-model="form.fbURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="Twitter"
                        dense
                        v-model="form.twitterURL"
                        class="input-data"
                      />
                      <q-input
                        outlined
                        placeholder="LinkedIn"
                        dense
                        v-model="form.linkedinURL"
                        class="input-data"
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
  setup(props, { emit }) {
    const $q = useQuasar();
    const route = useRoute();
    const speakerId = route.params.id;
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);
    const checked = ref(false);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const changeCheckBox = () => {
      checked.value != checked.value;
    };
    const form = ref({
      imagePath: "",
      name: "",
      mobilePhone: "",
      country: "",
      email: "",
      Bio: "",
      fbURL: "",
      twitterURL: "",
      linkedinURL: "",
      jobTitleName: "",
      companyName: "",
    });
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "SpeakersList",
      });
      $q.loading.hide();
    };
    watch(route, (to) => {
      if (
        to.path == "/speakers/add-speaker" ||
        to.path == "/speakers/edit-speaker"
      ) {
        functionSpeakrs();
      }
    });
    const functionSpeakrs = () => {
      if (route.path == "/speakers/add-speaker") {
        add.value = true;
        edit.value = false;
      } else if (route.path == `/speakers/edit-speaker/${speakerId}`) {
        edit.value = true;
        add.value = false;
        getDetails();
      }
    };
    const addEditSpearks = () => {
      if (route.path == "/speakers/add-speaker") {
        addSpeaker();
      } else if (route.path == `/speakers/edit-speaker/${speakerId}`) {
        EditSpeaker();
        getDetails();
      }
    };
    const EditSpeaker = () => {
      $q.loading.show();
      if (form.value.imagePath) {
        services
          .UpdateSpeaker(orgId, appID, speakerId, form.value)
          .then((res) => {
            if (res.data.statusCode === 200) {
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Updated Successfully",
              });
              router.push("/speakers");
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
    const addSpeaker = () => {
      $q.loading.show();
      if (form.value.imagePath) {
        services.addSpeaker(orgId, appID, form.value).then((res) => {
          if (res.data.statusCode == 200) {
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            router.push("/speakers");
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
    const validation = () => {
      if (form.value.mobilePhone == "") {
        return rules.required;
      } else if (!/^[0-9]*$/.test(form.value.mobilePhone)) {
        return rules.validNumber;
      } else if (/^[0-9]{11}$/.test(form.value.mobilePhone)) {
        return rules.validateDigits;
      } else {
        return rules.validateDigits;
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
          form.value.imagePath = res.data.result.path;
          const img = new Image();
          const width = ref("");
          const height = ref("");
          img.onload = function () {
            width.value = this.width;
            height.value = this.height;
            form.value.imagePath = res.data.result.path;
          };
          img.src = form.value.imagePath;
          $q.loading.hide();
        }
      });
    };
    const getDetails = () => {
      services.detailsSpeaker(orgId, appID, speakerId).then((res) => {
        if (res.data.statusCode == 200) {
          form.value = res.data.result;
        }
      });
    };

    onMounted(() => {
      functionSpeakrs();
      getDetails();
    });
    return {
      getDetails,
      form,
      add,
      edit,
      imageName,
      file,
      validation,
      uploadImage,
      addSpeaker,
      EditSpeaker,
      changeCheckBox,
      checked,
      rules,
      addEditSpearks,
      speakerId,
      cancel,
      appID,
      orgId,
    };
  },
};
</script>
