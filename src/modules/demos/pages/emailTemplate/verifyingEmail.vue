<template>
  <div class="verifying-email-user">
    <div class="verifying-email">
      <img :src="getEventData.backgroundImage" />
      <div class="container-verifying">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="card-verifying self-center">
              <div class="row">
                <div class="col-md-12 content-verifying">
                  <div class="parent-otp-logo">
                    <img :src="eventLogo" class="logo-otp" />
                  </div>
                  <p class="thanks-verifying-email" v-if="!showError">
                    Thanks for verifying your email
                  </p>
                  <p class="thanks-verifying-email" v-else> This link is expired</p>
                  <q-btn
                    color="btn-verifying"
                    label="Visit Event Website"
                    class="btn-verifying"
                    size="16px"
                    target="_blank"
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
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";


export default {
  setup() {
    const showError = ref(false)
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const appId = ref('')
    const userId = ref('')
    const expire = ref('')
    const eventLogo = ref("");
    const getEventData = ref([]);

    const getDetails = () => {
      $q.loading.show();
      service.eventDetailes(appId.value).then((res) => {
        if (res.data.statusCode === 200) {
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
    const verifyemail = ()=> {
      service.verifyemail(userId.value, expire.value).then((res) => {
        if (res.data.statusCode === 200) {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Email Verified",
          });
          $q.loading.hide();
        } else {
          $q.loading.hide();
          showError.value = true
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: res.data.result.responseException.exceptionMessage,
          });
        }
      });
    }
    const goToSite = () => {
      window.open( getEventData.value.eventRegisterUrl, '_blank');
    }
    onMounted(() => {
      appId.value = route.params.id
      userId.value = route.params.userId
      expire.value = route.params.expire
      getDetails();
      verifyemail()
    });
    return {
      appId,
      getDetails,
      eventLogo,
      getEventData,
      verifyemail,
      userId,
      showError,
      goToSite,
      expire
    };
  },
};
</script>
