<template>
  <div
    class="col-lg-3 col-md-4 col-sm-6 col-12 speaker-info__data__container__data"
  >
    <div class="speaker-info__data__img">
      <img :src="img" />
    </div>
    <div class="speaker-info__data__detailes">
      <p>{{ name }}</p>
      <span>{{ jobTitleName }}</span>
      <p class="description">{{ bio }}</p>
    </div>
    <div
      class="speaker-info__data__social-info"
      :class="classSocial == 'demo-two__socialMedia' ? 'hidden' : ''"
    >
      <a href="https://wwww.facebook.com" target="_blanck"
        ><img src="~assets/images/face-book.png" alt="facebook"
      /></a>
      <a href="https://twitter.com/" target="_blanck"
        ><img src="~assets/images/twitter.png" alt="twitter" />
      </a>
      <a href="https://www.linkedin.com/" target="_blanck"
        ><img src="~assets/images/linkedin.png" alt="linkedin" />
      </a>
    </div>
    <div
      class="speaker-info__data__social-info"
      :class="classSocial == 'demo-two__socialMedia' ? '' : 'hidden'"
    >
      <a href="https://wwww.facebook.com" target="_blanck"
        ><img src="~assets/images/Group-209.png" alt="facebook"
      /></a>
      <a href="https://twitter.com/" target="_blanck"
        ><img src="~assets/images/Group-210.png" alt="twitter" />
      </a>
      <a href="https://www.linkedin.com/" target="_blanck"
        ><img src="~assets/images/Group-28.png" alt="linkedin" />
      </a>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import defaultImage from "../../../assets/images/speaker-image.png";

export default defineComponent({
  props: ["className"],
  props: {
    id: {
      type: Number,
      default: 1,
    },
    img: {
      type: String,
      default: defaultImage,
    },
    name: {
      type: String,
      default: "Nancy Orbien",
    },
    jobTitleName: {
      type: String,
      default: "Vice Chairman",
    },
    bio: {
      type: String,
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    classSocial: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>
