<template>
  <div class="page-content q-px-xl q-mt-xl manage-event">
    <q-stepper
      class="stepper-content"
      v-model="step"
      ref="stepper"
      animated
      done-color="grey-7"
      active-color="primary"
      inactive-color="grey-7"
    >
      <q-step :name="1" title="Select Template" :done="step > 1">
        <title-desc
          :title="'Pick the Website Template You Love'"
          :desc="'Choose one and make it your own!'"
        ></title-desc>
        <div class="event-list">
          <div class="select-layout">
            <div class="row">
              <div
                class="col-md-4 col-sm-6 col-12"
                v-for="item in items"
                :key="item.id"
              >
                <div class="select-layout__template">
                  <div class="select-layout__layout-img">
                    <img :src="item.img" />
                    <div class="select-template__button">
                      <div class="button-select">
                        <button @click="selectLayout" :id="item.id">
                          Select
                        </button>
                      </div>
                      <div class="button-preview">
                        <button @click="previewLayout(item.pathName)">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="select-layout__layout-data">
                    <p>{{ item.name }}</p>
                    <input
                      type="checkbox"
                      name="test_id"
                      class="checkbox-layout"
                      v-model="item.checked"
                      v-if="item.checked == true && active == true"
                      :value="item.name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="2" title="Event Details" :done="step > 2">
        <title-desc
          desc="Let us seamlessly power your next event."
          title="Next, we just need a few more details"
        />
        <div class="row form-content">
          <div class="col-md-7 col-12">
            <div class="row">
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable"> Event Name </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <q-input
                  outlined
                  v-model="form.name"
                  placeholder="Type event name...."
                  dense
                  :rules="rules.required"
                />
              </div>
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable">
                  Event Description
                </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <q-input
                  outlined
                  type="textarea"
                  v-model="form.description"
                  placeholder="Event description..."
                  dense
                  :rules="rules.required"
                />
              </div>
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable">
                  Event Start at
                </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <div class="row">
                  <div class="col-6 q-pr-sm">
                    <q-input
                      outlined
                      dense
                      v-model="form.startdatetime"
                      mask="date"
                      :rules="rules.required"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="form.startdatetime"
                              @update:model-value="
                                updateStartDate(form.startdatetime)
                              "
                            >
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
                  <div class="col-6 q-pl-sm">
                    <q-input
                      outlined
                      dense
                      v-model="form.eventstarttime"
                      mask="time"
                      :rules="rules.required"
                    >
                      <template v-slot:prepend>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="form.eventstarttime">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable"> Event End at </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <div class="row">
                  <div class="col-6 q-pr-sm">
                    <q-input
                      outlined
                      dense
                      v-model="form.enddatetime"
                      mask="date"
                      :rules="rules.required"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="form.enddatetime"
                              @update:model-value="
                                updateEndDate(form.enddatetime)
                              "
                            >
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
                  <div class="col-6 q-pl-sm">
                    <q-input
                      outlined
                      dense
                      v-model="form.eventendtime"
                      mask="time"
                      :rules="rules.required"
                    >
                      <template v-slot:prepend>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="form.eventendtime">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable">
                  Event Location
                </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <q-input
                  outlined
                  v-model="form.eventaddress"
                  dense
                  :rules="rules.required"
                />
              </div>

              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable">
                  Event Registration Type
                </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio
                        v-model="form.eventType"
                        val="public"
                        color="primary"
                        @update:model-value="checkTruth(form.eventType)"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Open Registration</q-item-label>
                      <q-item-label caption
                        >In this simple registration attendees register by
                        entering their name, email address and any other
                        required custom form questions.</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <!--start Private Registration  -->
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio
                        v-model="form.eventType"
                        val="private"
                        color="primary"
                        @update:model-value="checkTruth(form.eventType)"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Private Registration</q-item-label>
                      <q-item-label caption
                        >Attendees must be invited via uploaded sheet in order
                        to Register.</q-item-label
                      >
                      <div class="upload-excel" v-if="awesome">
                        <p class="upload-files">upload File <span>*</span></p>
                        <div class="row">
                          <div class="col-md-1 col-sm-1 icon-excel">
                            <img src="../../../assets/images/iconexcel.png" />
                          </div>
                          <div class="col-md-9">
                            <div class="row">
                              <div class="custom-input">
                                <q-file
                                  v-model="form.eventusersheeturl"
                                  outlined
                                  @rejected="onRejected"
                                  @update:model-value="
                                    fileExcel(form.eventusersheeturl)
                                  "
                                  :rules="
                                    form.eventType == 'private'
                                      ? rules.required
                                      : ''
                                  "
                                />
                              </div>
                              <div class="col-md-3 simple-file">
                                <a :href="eventlist">Download Sample File</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <p
                              v-if="form.eventusersheeturl"
                              class="uploaded-file"
                            >
                              <a :href="form.eventusersheeturl">
                                Uploaded File</a
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                  <!--start Private Registration  -->
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio
                        v-model="form.eventType"
                        val="moderator"
                        color="primary"
                        @update:model-value="checkTruth(form.eventType)"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Moderated Registration</q-item-label>
                      <q-item-label caption
                        >The event will require approval for each registration
                        via Event Portal/Admin</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-3 q-mb-md">
                <label for="" class="manage-event-lable">
                  Verification Type
                </label>
              </div>
              <div class="col-9 q-mb-md q-pl-md">
                <div class="q-gutter-sm">
                  <q-radio
                    v-model="form.registereverifytype"
                    val="email"
                    label="Email"
                    color="primary"
                  />
                  <q-radio
                    v-model="form.registereverifytype"
                    val="sms"
                    label="SMS"
                    color="primary"
                  />
                  <q-radio
                    v-if="form.eventType != 'private'"
                    v-model="form.registereverifytype"
                    val="none"
                    label="None"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 col-12 q-px-md">
            <div class="row">
              <div class="col-md-6 col-12 q-px-sm">
                <label for="" class="manage-event-lable"> Event Logo </label>
                <div class="custom-input">
                  <img :src="logoSrc" v-if="logoSrc" />
                  <q-file
                    v-model="form.eventimagelogo"
                    outlined
                    :filter="checkLogoSize"
                    @rejected="onRejected"
                    @update:model-value="uploadLogo(form.eventimagelogo)"
                  />
                </div>
                <p class="validation-input">Dimensions 220x75px, 500kb</p>
              </div>
              <div class="col-md-6 col-12 q-px-sm">
                <label for="" class="manage-event-lable"> Event Image </label>
                <div class="custom-input">
                  <img :src="imgSrc" v-if="imgSrc" />
                  <q-file
                    v-model="form.backgroundImage"
                    outlined
                    :filter="checkImageSize"
                    @rejected="onRejected"
                    @update:model-value="uploadImage(form.backgroundImage)"
                  />
                </div>
                <p class="validation-input">Dimensions 1920x900px, 2MB</p>
                <p class="validation-input">
                  Make your event more noticeable by adding a beautiful image.
                </p>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="3" title="Apps" :done="step > 3">
        <title-desc
          :title="'What do you want to add to your event?'"
          :desc="'Choose any additional features for your event.'"
        ></title-desc>
        <div class="event-list">
          <div class="apps">
            <div class="apps__selection">
              <p>Recommended for You</p>
              <div class="select-layout__layout-data">
                <label v-for="select in appSelect" :key="select"
                  ><input
                    type="checkbox"
                    name="test_id"
                    class="checkboxAppear"
                    v-model="form.showenfeaturejson"
                    :value="select.name"
                  />
                  <span class="spanCheckbox" :for="select.id"></span>

                  <p>{{ select.name }}</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="4" title="Registration Setup">
        <title-desc
          :title="'Customize your registration form'"
          :desc="'Choose form questions'"
        ></title-desc>
        <div class="event-list">
          <div class="register">
            <div class="register__field">
              <p>What field info do you need?</p>
              <div
                class="register__field-inputs"
                v-for="x in registerInput"
                :key="x.id"
              >
                <p color="grey-3" outlined class="input-data">
                  {{ x.placeholder }}
                </p>
                <p v-if="x.isRequired">Required</p>
              </div>
              <div class="registerAccordion" v-if="addEventArr.length != 0">
                <q-list
                  bordered
                  class="rounded-borders"
                  v-for="(x, index) in addEventArr"
                  :key="x.id"
                >
                  <q-expansion-item expand-separator default-opened>
                    <template v-slot:header>
                      <q-item-section>
                        {{ x.name }}
                      </q-item-section>

                      <q-item-section side>
                        <div class="buttons">
                          <div
                            class="row items-center"
                            v-if="x.isEditable == false"
                          >
                            <q-btn
                              class="delete icon"
                              @click.stop="
                                deleteAccordion(
                                  x,
                                  x.name,
                                  x.type,
                                  x.placeholder
                                )
                              "
                            >
                              <img
                                src="../../../assets/images/deleteicon.png"
                              />
                            </q-btn>
                            <q-btn @click.stop="falseFun(index)">
                              <img src="../../../assets/images/edit.png" />
                            </q-btn>
                          </div>
                        </div>
                        <p v-if="x.checked" class="required">Required</p>
                      </q-item-section>
                    </template>

                    <q-card v-if="appearAccordion == true" :id="x.id">
                      <q-card-section>
                        <label
                          ><q-checkbox
                            name="test_id"
                            class="checkboxAppear"
                            value="1"
                            v-model="x.checked"
                            :disabled="x.isEditable ? false : true"
                          />
                          <!-- <span class="spanCheckbox" for="1"></span> -->
                          <p>Make this field required</p>
                        </label>
                        <div class="buttons">
                          <div class="" v-if="x.isEditable == true">
                            <button
                              class="close"
                              @click="
                                deleteAccordion(
                                  x,
                                  x.name,
                                  x.type,
                                  x.placeholder
                                )
                              "
                            >
                              <span class="material-icons"> close </span>
                            </button>
                            <button
                              class="done"
                              @click.stop="
                                appearAccordionFun(
                                  $event,
                                  x.id,
                                  x.checked,
                                  index
                                )
                              "
                            >
                              <span class="material-icons"> done </span>
                            </button>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="more">
              <div class="arrow-down" v-if="isActive"></div>
              <q-btn-dropdown
                label="+ Add More Options"
                @click.stop="isActive = !isActive"
              >
                <q-list @click.stop="isActive = !isActive">
                  <q-item
                    clickable
                    v-close-popup
                    v-for="x in label"
                    :key="x.id"
                    @click="onItemClick(x, x.name, x.type, x.placeholder)"
                  >
                    <q-item-section>
                      <q-item-label>{{ x.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step > 1"
            @click="$refs.stepper.previous()"
            label="Back"
            rounded
            class="prev-btn"
          />
          <q-btn
            v-if="step != 4"
            @click="$refs.stepper.next()"
            label="Next"
            rounded
            :disable="activeAndDisable(step)"
            :class="activeAndDisable(step) ? 'next-btn-not-active' : 'next-btn'"
          />
          <q-btn
            v-if="step === 4"
            @click="addEvent"
            label="Finish"
            rounded
            :disable="activeAndDisable(step)"
            :class="activeAndDisable(step) ? 'next-btn-not-active' : 'next-btn'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import eventServices from "../services/eventServices";
import TitleDesc from "../components/titleDesc.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import rules from "../../../configs/rules";
import Demo1 from "../../../assets/images/Demo1.png";
import Demo2 from "../../../assets/images/Demo2.png";
import Demo3 from "../../../assets/images/Demo3.png";

export default defineComponent({
  name: "addEvent",
  components: {
    TitleDesc,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const imgSrc = ref("");
    const logoSrc = ref("");
    const width = ref("");
    const height = ref("");
    const orgId = ref("");
    const appId = ref("");
    const eventlist =
      "https://sqlvan7yn4lryemneu.blob.core.windows.net/cairoict/e1cccd08-5331-4316-8b6c-a49ae645c189.xlsx";
    const form = ref({
      name: "",
      description: "",
      startdatetime: "",
      enddatetime: "",
      eventstarttime: "",
      eventendtime: "",
      eventaddress: "",
      eventType: "public",
      backgroundImage: "",
      eventimagelogo: "",
      registereverifytype: "email",
      eventRegisterFormJson: [],
      eventRegisterUrl: "",
      active: false,
      showenfeaturejson: [],
      eventtemplatename: "",
      eventusersheeturl: "",
      contactUs: "",
      contactUsUrl: "",
      facebookurl: "",
      twitterurl: "",
      aboutus: "",
      aboutUsUrl: "",
    });
    const detailsEventData = ref([]);
    // this for upload image
    const uploadImage = (item) => {
      const fileData = new FormData();
      fileData.append("file", item);
      $q.loading.show();
      eventServices.getImageUrl(fileData).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.loading.show();
          imgSrc.value = resp.data.result.path;
          form.value.backgroundImage = resp.data.result.path;
          $q.loading.hide();
        }
      });
    };
    // this for upload logo image
    const uploadLogo = (item) => {
      const fileData = new FormData();
      fileData.append("file", item);
      $q.loading.show();
      eventServices.getImageUrl(fileData).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.loading.show();
          logoSrc.value = resp.data.result.path;
          form.value.eventimagelogo = resp.data.result.path;
          $q.loading.hide();
        }
      });
    };
    const checkImageSize = (files) => {
      return files.filter((file) => file.size / 1024 < 2048);
    };
    const checkImageDimentions = (files) => {
      let img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = () => {
        height.value = img.height;
        width.value = img.width;
        alert(width.value + " x " + height.value);
      };
      setTimeout(() => {}, 2000);
      return files.filter((file) => width.value == 1920 && height.value == 900);
    };
    const checkLogoSize = (files) => {
      return files.filter((file) => file.size / 1024 < 500);
    };
    const onRejected = () => {
      $q.notify({
        type: "negative",
        message: `Please uploade file within limits`,
      });
    };
    const isCheckAll = ref([]);
    const items = ref([
      {
        id: 1,
        img: Demo1,
        name: "Professional",
        checked: false,
        pathName: "demoOnePrev",
      },
      {
        id: 2,
        name: "Hype",
        img: Demo2,
        checked: false,
        pathName: "demoTwoPrev",
      },
      {
        id: 3,
        name: "Simplicity",
        img: Demo3,
        checked: false,
        pathName: "demoThreePrev",
      },
    ]);
    const previewLayout = (name) => {
      $q.loading.show();
      window.open(router.resolve({ name: name }).href);
      $q.loading.hide();
    };
    const active = ref(false);
    // selecting layout
    const selectLayout = (e) => {
      active.value = true;
      items.value.forEach((item) => {
        if (e.target.id == item.id) {
          item.checked = true;
          form.value.eventtemplatename = item.name.toLowerCase();
        } else {
          item.checked = false;
        }
      });
    };
    const updateStartDate = (time) => {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      if (formatDate(form.value.startdatetime) < formatDate(date)) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "the date must be today or after today",
        });
        form.value.startdatetime = "";
      }
    };
    // validation for end date
    const updateEndDate = (time) => {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      if (formatDate(form.value.enddatetime) < formatDate(date)) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "The Date must be Today or after today",
        });
        form.value.enddatetime = "";
      } else if (
        formatDate(form.value.enddatetime) <
        formatDate(form.value.startdatetime)
      ) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "The Date must be After Start Date",
        });
        form.value.enddatetime = "";
      }
    };
    const activeAndDisable = (step) => {
      if (step == 1) {
        if (form.value.eventtemplatename == "") {
          return true;
        } else {
          return false;
        }
      } else if (step == 2) {
        if (
          form.value.name == "" ||
          form.value.description == "" ||
          form.value.startdatetime == "" ||
          form.value.enddatetime == "" ||
          form.value.eventstarttime == "" ||
          form.value.eventendtime == "" ||
          form.value.eventaddress == "" ||
          form.value.eventimagelogo == "" ||
          form.value.backgroundImage == ""
        ) {
          return true;
        } else {
          if (form.value.eventType == "private") {
            if (form.value.eventusersheeturl == "") {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else if (step == 3) {
        if (form.value.showenfeaturejson == "") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    const activeSection = ref(false);
    const appSelect = ref([
      {
        id: 1,
        name: "Sessions",
      },
      {
        id: 2,
        name: "Speakers",
      },
      {
        id: 3,
        name: "Sponsors",
      },
      {
        id: 4,
        name: "Exhibitors",
      },
      {
        id: 5,
        name: "News",
      },
    ]);
    const nextStep = () => {
      activeSection.value = true;
    };
    const registerInput = ref([
      {
        id: 1,
        placeholder: "Title",
        isRequired: true,
      },
      {
        id: 2,
        placeholder: "First Name",
        isRequired: true,
      },
      {
        id: 3,
        placeholder: "Last Name",
        isRequired: true,
      },
      {
        id: 4,
        placeholder: "Email",
        isRequired: true,
      },
      {
        id: 5,
        placeholder: "Phone Number",
        isRequired: true,
      },
    ]);
    const label = ref([
      {
        placeholder: "Gender",
        name: "Gender",
        type: "text",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Date of birth",

        name: "Date of birth",
        type: "datepicker",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Job title",

        name: "Job title",
        type: "text",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Company",
        name: "Company",
        type: "text",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Country",
        name: "Country",
        type: "select",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Industry",
        name: "Industry",
        type: "text",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Interests",
        name: "Interests",
        type: "select",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "Terms and conditions(Checkbox)",
        name: "Terms and conditions(Checkbox)",
        type: "checkbox",
        isRequired: false,
        isEditable: true,
      },
      {
        placeholder: "References",
        name: "References",
        type: "select",
        isRequired: false,
        isEditable: true,
      },
    ]);
    const labelIndex = ref("");
    // on load page

    const onItemClick = (item, labelName, type, labelPlaceholder) => {
      // alert(label.value.indexOf(item));
      isActive.value = false;
      form.value.eventRegisterFormJson = addEventArr.value;
      form.value.eventRegisterFormJson.push({
        placeholder: labelPlaceholder,
        isRequired: false,
        name: labelName,
        type: type,
        isEditable: true,
      });
      let pos = label.value.indexOf(item);
      if (pos >= 0) label.value.splice(pos, 1);

      // let pos = label.value
      //   .map(function (e) {
      //     return e.name;
      //   })
      //   .indexOf(item);
      // let pos = label.value.indexOf(item);
      // console.log("pos", pos);

      // label.value.splice(pos, 1);

      // console.log("splice", label.value.splice(pos, 1));
      labelIndex.value = pos;
    };

    const isActive = ref(false);
    const deleteAccordion = (
      item,
      accordionName,
      type,
      accordionPlaceholder
    ) => {
      let pos = addEventArr.value.indexOf(item);
      if (pos >= 0) addEventArr.value.splice(pos, 1);
      // addEventArr.value.splice(pos, 1);
      label.value.splice(labelIndex.value, 0, {
        id: labelIndex.value,
        name: accordionName,
        placeholder: accordionPlaceholder,
        isRequired: false,
        type: type,
        isEditable: true,
      });
      form.value.eventRegisterFormJson = JSON.stringify(addEventArr.value);
    };
    const appearAccordion = ref(true);
    const appearAccordionFun = (item, accordionId, checked, index) => {
      addEventArr.value[index].isEditable = false;
      var x = item.path[6].id;
      var y = accordionId;
      if (x == y) {
        appearAccordion.value = false;
        addEventArr.value[index].isRequired = checked;
        form.value.eventRegisterFormJson = JSON.stringify(addEventArr.value);
      }
    };
    const falseFun = (index) => {
      addEventArr.value[index].isEditable = true;
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
    const addEventArr = ref([]);

    const addEvent = () => {
      form.value.eventRegisterFormJson = JSON.stringify(addEventArr.value);

      form.value.showenfeaturejson = JSON.stringify(
        form.value.showenfeaturejson
      );
      form.value.startdatetime = formatDate(form.value.startdatetime);
      form.value.enddatetime = formatDate(form.value.enddatetime);
      $q.loading.show();
      if (!appId.value) {
        eventServices.addEvent(form.value, orgId.value).then((res) => {
          if (res.data.statusCode === 200) {
            $q.loading.hide();
            const eventId = res.data.result;
            localStorage.setItem("appID", eventId);
            router.push({
              name: "redirectPage",
            }),
              $q.notify({
                color: "green",
                textColor: "white",
                icon: "check",
                message: "Event Added Successfully",
              });
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Somthing went wrong",
            });
          }
        });
      } else {
        eventServices
          .updateEvent(orgId.value, appId.value, form.value)
          .then((res) => {
            if (res.data.statusCode === 200) {
              localStorage.setItem("appID", appId.value);
              router.push({
                name: "homePage",
              }),
                $q.notify({
                  color: "green",
                  textColor: "white",
                  icon: "check",
                  message: "Event Updated Successfully",
                });
            } else {
              $q.loading.hide();
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Somthing went wrong",
              });
            }
          });
      }
    };
    const getEventDetails = () => {
      $q.loading.show();
      eventServices.getEventDetails(orgId.value, appId.value).then((res) => {
        if (res.data.statusCode === 200) {
          detailsEventData.value = res.data.result;
          form.value = detailsEventData.value;
          items.value.forEach((item) => {
            if (
              detailsEventData.value.eventtemplatename ==
              item.name.toLowerCase()
            ) {
              item.checked = true;
              active.value = true;
            } else {
              item.checked = false;
            }
          });
          logoSrc.value = detailsEventData.value.eventimagelogo;
          imgSrc.value = detailsEventData.value.backgroundImage;
          form.value.showenfeaturejson = JSON.parse(
            detailsEventData.value.showenfeaturejson
          );
          addEventArr.value = JSON.parse(
            detailsEventData.value.eventRegisterFormJson
          );

          if (addEventArr.value.length) {
            var jsonArray = label.value.filter(
              (o1) => !addEventArr.value.some((o2) => o1.name === o2.name)
            );
            label.value = jsonArray;
          }

          addEventArr.value.forEach((item) => {
            item.isEditable = false;
          });
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Somthing went wrong",
          });
        }
      });
    };
    // start function Private
    const awesome = ref(false);

    const fileExcel = (item) => {
      const fileData = new FormData();
      fileData.append("file", item);
      $q.loading.show();
      eventServices.getImageUrl(fileData).then((resp) => {
        if (resp.data.statusCode == 200) {
          form.value.eventusersheeturl = resp.data.result.path;
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Somthing went wrong",
          });
        }
      });
    };
    // end function Private
    const checkTruth = (item) => {
      if (item == "private") {
        awesome.value = true;
      } else {
        awesome.value = false;
      }
    };
    onMounted(() => {
      orgId.value = localStorage.getItem("orgId");
      if (route.params.id) {
        appId.value = route.params.id;
        getEventDetails();
      }
    });

    return {
      logo: ref(""),
      uploadImage,
      uploadLogo,
      imgSrc,
      logoSrc,
      onRejected,
      checkLogoSize,
      checkImageSize,
      checkImageDimentions,
      rules,
      width,
      height,
      step: ref(1),
      previewLayout,
      isCheckAll,
      selectLayout,
      nextStep,
      active,
      deleteAccordion,
      appearAccordionFun,
      items,
      appSelect,
      activeSection,
      registerInput,
      onItemClick,
      label,
      isActive,
      appearAccordion,
      form,
      activeAndDisable,
      addEvent,
      orgId,
      falseFun,
      addEventArr,
      updateStartDate,
      updateEndDate,
      getEventDetails,
      detailsEventData,
      appId,
      //
      awesome,
      fileExcel,
      checkTruth,
      eventlist,
    };
  },
});
</script>
