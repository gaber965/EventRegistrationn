<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-12">
    <div class="exhibitor-info__data__container__content">
      <div
        class="exhibitor-info__data__container__content__img"
        v-if="exhibitorImg"
      >
        <img :src="exhibitorImg" />
      </div>
      <div class="exhibitor-info__data__container__content__img" v-else></div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    exhibitorImg: {
      type: String,
      default: "",
    },
  },
};
</script>
