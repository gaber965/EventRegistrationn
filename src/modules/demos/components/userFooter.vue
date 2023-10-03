<template>
  <div class="footer-info q-pa-md" :class="className">
    <div class="footer-info__data">
      <p>Join us on June 27</p>
      <p>We look forward to hosting you!</p>
      <div class="button">
        <q-btn :to="{ path: buttonUrl }" :label="footerButton" />
      </div>
    </div>

    <div class="footer-info__reserve">
      <p>
        © {{ new Date().getFullYear() }}. All Rights Reserved.<br />
        Event website powered by IPMagiX
      </p>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["className", "footerButton", "buttonUrl"],
};
</script>
