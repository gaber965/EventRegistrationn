<template>
  <div class="thank-for-registeration">
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
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const route = useRoute()
    const $q = useQuasar();
    const appId = ref('')
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
    const goToSite = () => {
      window.open( getEventData.value.eventRegisterUrl, '_blank');
    }
    onMounted(() => {
      appId.value = route.params.id
      getDetails();
    });
    return {
      appId,
      getEventData,
      getDetails,
      eventLogo,
      goToSite
    };
  },
};
</script>
