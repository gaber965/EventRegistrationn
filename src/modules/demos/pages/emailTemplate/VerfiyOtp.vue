<template>
  <div class="otp">
    <div class="verifying-email">
      <img :src="eventBg" />
      <div class="container-verifying">
        <div class="row" v-if="!verifySuc">
          <div class="col-md-5 col-sm-5 col-xs-10 content-verifying">
            <div class="parent-otp-logo">
              <img :src="eventLogo" class="logo-otp" />
            </div>
            <p>Please verify your mobile number.</p>
            <h6 class="verification-code">
              Please type the verification code sent to {{ phoneNumber }}
            </h6>
            <div class="form-verification">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <div class="row">
                  <div class="col-md-1 col-sm-1 col-xs-1"></div>
                  <div
                    class="col-md-10 col-sm-10 col-xs-10 parent-input-verification otp-num"
                  >
                    <v-otp-input
                      ref="otpInput"
                      input-classes="otp-input"
                      separator="-"
                      :num-inputs="5"
                      :should-auto-focus="true"
                      :is-input-num="true"
                      :conditionalClass="[
                        'one',
                        'two',
                        'three',
                        'four',
                        'five',
                      ]"
                      @on-complete="handleOnComplete"
                    />
                  </div>
                  <div class="col-md-1 col-sm-1 col-xs-1"></div>
                  <div class="col-md-12 text-center">
                    <q-btn
                      color="btn-verifying"
                      label="Verfiy"
                      class="btn-verifying"
                      type="submit"
                    />
                  </div>
                </div>
              </q-form>
            </div>
            <div class="col-md-12">
              <div class="resend-code">
                <p>
                  Didn’t get the code?
                  <q-btn
                    color="btn-verifying resend"
                    label=" Resend code"
                    class="btn-verifying"
                    @click="reSend()"
                  />
                </p>
                <p>Entered a wrong number?</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-3"></div>
          <div class="col-md-6 col-sm-12 col-xs-12 register-confirm-main-col">
            <div class="card-verifying">
              <div class="row">
                <div class="col-md-12 content-verifying">
                  <div class="parent-otp-logo">
                    <img :src="eventLogo" class="logo-otp" />
                  </div>
                  <p class="thanks-registeration">
                    Thanks for your registration
                  </p>
                  <q-btn
                    color="btn-verifying"
                    label="Visit Event Website"
                    class="btn-verifying"
                    size="16px"
                    @click="goToSite()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import service from "../../service/service";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import VOtpInput from "vue3-otp-input";

export default {
  components: {
    VOtpInput,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const $q = useQuasar();
    const appID = ref("");
    const phoneNumber = ref("");
    const userId = ref("");
    const eventLogo = ref("");
    const eventBg = ref("");
    const token = ref("");
    const getEventData = ref([]);
    const verifySuc = ref(false);
    const getDetails = () => {
      $q.loading.show();
      service.eventDetailes(appID.value).then((res) => {
        if (res.data.statusCode == 200) {
          getEventData.value = res.data.result;
          eventLogo.value = res.data.result.eventimagelogo;
          eventBg.value = res.data.result.backgroundImage;

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
    const otpInput = ref(null);

    const handleOnComplete = (value) => {
      token.value = value;
    };

    const onSubmit = () => {
      $q.loading.show();
      service.verifyOtp(userId.value, token.value).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "User Verified Successfuly",
          });
          $q.loading.hide();
          verifySuc.value = true;
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message:
              "Failed to verify User Account or you have been verified before !",
          });
        }
      });
    };
    const goToSite = () => {
      window.open(getEventData.value.eventRegisterUrl, "_blank");
    };
    const reSend = () => {
      $q.loading.show();
      service.resendOtp(appID.value, userId.value).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "OTP Resend Successfully",
          });
          $q.loading.hide();
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "Failed To Resend OTP",
          });
        }
      });
    };
    onMounted(() => {
      appID.value = route.params.id;
      phoneNumber.value = route.params.phone;
      userId.value = route.params.userId;
      getDetails();
    });
    return {
      onSubmit,
      goToSite,
      appID,
      getDetails,
      loading,
      eventLogo,
      phoneNumber,
      userId,
      eventBg,
      handleOnComplete,
      otpInput,
      token,
      reSend,
      verifySuc,
      getEventData,
    };
  },
};
</script>
