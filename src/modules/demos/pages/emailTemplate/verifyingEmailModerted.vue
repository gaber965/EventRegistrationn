<template>
  <div class="verifying-email-moderted">
    <div class="verifying-email">
      <img src="../../../../assets/images/Mask-group.png" />
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
                  <p class="thanks-verifying-email">
                    Thanks for verifying your email
                  </p>
                  <span class="text-verifying-email-moderted">
                    Your attendance registration awaiting approval
                  </span>
                  <q-btn
                    color="btn-verifying"
                    label="Visit Event Website"
                    class="btn-verifying"
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

export default {
  setup() {
    const loading = ref(false);
    const $q = useQuasar();
    const appID = localStorage.getItem("appID");
    const eventLogo = ref("");
    const getDetails = () => {
      $q.loading.show();
      service.eventDetailes(appID).then((res) => {
        if (res.data.statusCode == 200) {
          eventLogo.value = res.data.result.eventimagelogo;
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
    onMounted(() => {
      getDetails();
    });
    return {
      appID,
      getDetails,
      loading,
      eventLogo,
    };
  },
};
</script>
