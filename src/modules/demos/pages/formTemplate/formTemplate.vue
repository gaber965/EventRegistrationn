<template>
  <div
    class="form-one"
    :style="{ backgroundImage: `url(${eventDetails.backgroundImage})` }"
  >
    <div class="form">
      <div class="container-form">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-10 Registration">
            <div class="form-logo">
              <img :src="eventDetails.eventimagelogo" />
            </div>

            <q-form @submit="onSubmit" class="q-gutter-md">
              <p>Registration</p>
              <div class="row">
                <div class="col-12 first-section-form">
                  <h6 class="lable-form">Title <span>*</span></h6>
                  <q-select
                    filled
                    v-model="form.Title"
                    :options="titleOption"
                    option-label="label"
                    option-value="value"
                    emit-value
                    :label="titleOption.label"
                    color="teal"
                    options-selected-class="text-deep-orange"
                    lazy-rules
                    :rules="rules.required"
                  />
                </div>
                <div class="col-md-6 col-xs-12 first-section-form q-pr-sm">
                  <h6 class="lable-form">First Name <span>*</span></h6>
                  <q-input
                    filled
                    v-model="form.FirstName"
                    lazy-rules
                    :rules="
                      form.FirstName == '' ? rules.required : rules.validateText
                    "
                  />
                </div>

                <div class="col-md-6 col-xs-12 first-section-form q-pl-sm">
                  <h6 class="lable-form">Last Name <span>*</span></h6>
                  <q-input
                    filled
                    v-model="form.LastName"
                    lazy-rules
                    :rules="
                      form.LastName == '' ? rules.required : rules.validateText
                    "
                  />
                </div>
                <div class="col-md-12 first-section-form">
                  <h6 class="lable-form">Email <span>*</span></h6>
                  <q-input
                    filled
                    v-model="form.Email"
                    lazy-rules
                    :rules="rules.validEmail"
                  />
                </div>
                <div class="col-12 first-section-form">
                  <h6 class="lable-form">Mobile <span>*</span></h6>
                  <q-input
                    filled
                    v-model="form.MobilePhone"
                    lazy-rules
                    :rules="validation()"
                  >
                    <template v-slot:prepend> +2 | </template></q-input
                  >
                </div>
                <div
                  v-for="item in eventFormData.filter((data) => {
                    return data.type == 'datepicker';
                  })"
                  :key="item.name"
                  class="col-12 first-section-form"
                  :class="item.checked ? '' : 'in-case-of-not-required'"
                >
                  <h6 class="lable-form">
                    {{ item.placeholder }} <span v-if="item.checked">*</span>
                  </h6>
                  <q-input
                    filled
                    v-model="form.Birthdate"
                    mask="date"
                    :rules="item.checked ? rules.required : ''"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="form.Birthdate">
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
                <div
                  v-for="item in eventFormData.filter((data) => {
                    return data.type == 'text';
                  })"
                  :key="item.name"
                  class="col-12 first-section-form"
                  :class="item.checked ? '' : 'in-case-of-not-required'"
                >
                  <h6 class="lable-form">
                    {{ item.placeholder }} <span v-if="item.checked">*</span>
                  </h6>
                  <q-input
                    filled
                    v-model="form[item.name]"
                    lazy-rules
                    :rules="
                      item.checked && form[item.name] !== ''
                        ? rules.validateText
                        : item.checked && form[item.name] == ''
                        ? rules.required
                        : ''
                    "
                  />
                </div>
                <div
                  v-for="item in eventFormData.filter((data) => {
                    return data.type == 'select';
                  })"
                  :key="item.name"
                  class="col-12 first-section-form"
                  :class="item.checked ? '' : 'in-case-of-not-required'"
                >
                  <h6 class="lable-form">
                    {{ item.placeholder }} <span v-if="item.checked">*</span>
                  </h6>
                  <q-select
                    filled
                    v-model="form[item.name]"
                    :options="getOptions(item.name)"
                    option-label="name"
                    option-value="name"
                    color="teal"
                    emit-value
                    options-selected-class="text-deep-orange"
                    lazy-rules
                    :rules="item.checked ? rules.required : ''"
                  />
                </div>
                <div
                  v-for="item in eventFormData.filter((data) => {
                    return data.type == 'checkbox';
                  })"
                  :key="item.name"
                  class="col-12 first-section-form"
                  :class="item.checked ? '' : 'in-case-of-not-required'"
                >
                  <q-checkbox
                    left-label
                    :label="item.placeholder"
                    v-model="checkBox"
                    :rules="item.checked ? rules.required : ''"
                  />
                </div>

                <div class="btn-submit col-12 text-center">
                  <q-btn
                    label="Complete Registration"
                    type="submit"
                    color="blue1"
                    class="text-center"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rules from "src/configs/rules";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../../service/service";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const appId = ref("");
    const eventFormData = ref([]);
    const eventDetails = ref([]);

    const titleOption = [
      {
        label: "Mr",
        value: "Mr",
      },
      {
        label: "Mrs",
        value: "Mrs",
      },
      {
        label: "Dr",
        value: "Dr",
      },
    ];
    const country = [
      {
        name: "Egypt",
        id: "Egypt",
      },
      {
        name: "Ksa",
        id: "Ksa",
      },
      {
        name: "UAE",
        id: "UAE",
      },
    ];
    const form = ref({
      FirstName: "",
      LastName: "",
      Gender: "",
      Title: "",
      Birthdate: null,
      Industry: "",
      Password: "",
      Email: "",
      Interest: "",
      Reference: "",
      JobTitleName: "",
      MobilePhone: "",
      CompanyName: "",
      CountryName: "",
    });
    const checkBox = ref(false);
    // custom varibles
    const getInfoEvent = () => {
      $q.loading.show();
      services.eventDetailes(appId.value).then((res) => {
        if (res.data.statusCode == 200) {
          eventFormData.value = JSON.parse(
            res.data.result.eventRegisterFormJson
          );
          eventDetails.value = res.data.result;
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
        }
      });
    };
    const getOptions = (item) => {
      if (item == "References") {
        return eventReferences.value;
      } else if (item == "Interests") {
        return eventInterest.value;
      } else {
        return country;
      }
    };
    const eventInterest = ref([]);
    const eventReferences = ref([]);
    const getInterest = () => {
      services.getInterest(appId.value).then((res) => {
        if (res.data.statusCode == 200) {
          eventInterest.value = res.data.result.items;
          console.log(eventInterest.value);
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
        }
      });
    };
    const getReferences = () => {
      services.getReferences(appId.value).then((res) => {
        if (res.data.statusCode == 200) {
          eventReferences.value = res.data.result.items;
          console.log(eventReferences.value);
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
          });
        }
      });
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
    const validation = () => {
      if (form.value.MobilePhone == "") {
        return rules.required;
      } else if (!/^[0-9]*$/.test(form.value.MobilePhone)) {
        return rules.validNumber;
      } else if (/^[0-9]{11}$/.test(form.value.MobilePhone)) {
        return rules.validateDigits;
      } else {
        return rules.validateDigits;
      }
    };
    // custom varibles
    const onSubmit = () => {
      $q.loading.show();
      if (form.value.Birthdate) {
        form.value.Birthdate = formatDate(form.value.Birthdate);
      }
      form.value.MobilePhone = "+2" + form.value.MobilePhone;
      services.submitUser(appId.value, form.value).then((res) => {
        if (res.data.statusCode == 200) {
          if (eventDetails.value.registereverifytype == "sms") {
            if (eventDetails.value.eventType == "private") {
              router.push({
                path: route.path + "/registration-verfied/",
              });
            } else {
              router.push({
                path:
                  route.path +
                  "/Verfiy-otp/" +
                  form.value.MobilePhone +
                  "/" +
                  res.data.result,
              });
            }
          } else if (eventDetails.value.registereverifytype == "email") {
            if (eventDetails.value.eventType == "private") {
              router.push({
                path: route.path + "/registration-verfied/",
              });
            } else {
              router.push({
                path: route.path + "/confirm-registration/" + form.value.Email,
              });
            }
          } else {
            router.push({
              path: route.path + "/registration-verfied/",
            });
          }
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.responseException.exceptionMessage,
          });
        }
      });
    };
    onMounted(() => {
      appId.value = route.params.id;
      getInfoEvent();
      getInterest();
      getReferences();
    });
    return {
      onSubmit,
      form,
      titleOption,
      rules,
      getInfoEvent,
      eventFormData,
      eventDetails,
      checkBox,
      eventInterest,
      eventReferences,
      getInterest,
      getReferences,
      country,
      getOptions,
      formatDate,
      validation,
    };
  },
};
</script>
