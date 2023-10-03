<template>
  <div class="page-content-redirect">
    <div class="row">
      <div class="col-12 title-header q-mb-lg">
        Start setting up your website
      </div>
      <div class="col-12 body-header q-mb-xl">
        Manage your apps, site settings, data, communications, and more.
      </div>
      <div class="col-12 btn-header q-mb-md">
        <q-btn
          :to="{ name: 'homePage' }"
          rounded
          no-caps
          color="primary"
          text-color="white"
          label="Go to Dashboard"
          class="btn-dash"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const eventId = ref("");
    onMounted(() => {
      eventId.value = localStorage.getItem('appID');
    });
    return {
      eventId,
    };
  },
};
</script>
