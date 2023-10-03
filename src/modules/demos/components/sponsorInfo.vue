<template>
  <div class="sponsor-info__data__container">
    <p class="sponsor-info__data__container__title">{{ categoryName }}</p>
    <div class="row" v-if="sponsorImg">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-12"
        v-for="item in sponsorImg.filter((data) => {
          return data.categoryName == categoryName;
        })"
        :key="item.contentID"
      >
        <div class="sponsor-info__data__container__content">
          <div class="sponsor-info__data__container__content__img">
            <img :src="item.contentImagePath" />
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="sponsor-info__data__container__content">
          <div class="sponsor-info__data__container__content__img"></div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="sponsor-info__data__container__content">
          <div class="sponsor-info__data__container__content__img"></div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="sponsor-info__data__container__content">
          <div class="sponsor-info__data__container__content__img"></div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="sponsor-info__data__container__content">
          <div class="sponsor-info__data__container__content__img"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    id: {
      type: Number,
      default: 1,
    },
    categoryName: {
      type: String,
      default: "Platinum Sponsors",
    },
    sponsorImg: {
      type: String,
      default: "",
    },
  },
};
</script>
