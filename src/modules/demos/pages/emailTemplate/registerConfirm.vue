<template>
  <div class="register-confirm">
    <div class="verifying-email">
      <img :src="getEventData.backgroundImage" />
      <div class="container-verifying">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6 col-sm-12 col-xs-12 register-confirm-main-col">
            <div class="card-verifying">
              <div class="row">
                <div class="col-md-12 content-verifying">
                  <div class="parent-otp-logo">
                    <img :src="eventLogo" class="logo-otp" />
                  </div>
                  <p class="thanks-registeration">
                    Thanks for your registration, Please confirm your email.
                  </p>
                  <p class="text-email-register-confirm">
                    We have sent you an email to verify your account, please
                    click
                  </p>
                  <p class="text-email-register-confirm padding-text">
                    on the verification link in the email to confirm your
                    attendance.
                  </p>
                  <p class="find-email-register-confirm">
                    Still can’t find the email?
                  </p>
                  <q-btn
                    color="btn-verifying"
                    label="Resend email"
                    class="btn-verifying"
                    size="16px"
                    @click="reSend()"
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

export default {
  setup() {
    const loading = ref(false);
    const route = useRoute();
    const $q = useQuasar();
    const appId = ref('')
    const email= ref('')
    const eventLogo = ref("");
    const getEventData = ref([]);
    const getDetails = () => {
      $q.loading.show();
      service.eventDetailes(appId.value).then((res) => {
        if (res.data.statusCode == 200) {
          eventLogo.value = res.data.result.eventimagelogo;
          getEventData.value = res.data.result
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
    const reSend = ()=> {
      $q.loading.show()
      service.reSendEmail(appId.value, email.value).then((res)=> {
        if(res.data.statusCode === 200) {
          $q.loading.hide();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Email resended",
          });
        }else {
          $q.loading.hide();
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "something went wrong",
          });
        }
      })
    }
    onMounted(() => {
      appId.value = route.params.id
      email.value = route.params.email
      getDetails();
    });
    return {
      getDetails,
      loading,
      eventLogo,
      appId,
      getEventData,
      reSend,
      email
    };
  },
};
</script>
