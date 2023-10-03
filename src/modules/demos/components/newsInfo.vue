<template>
  <div class="col-md-6 col-12 q-mb-xl">
    <div class="cards-news">
      <div class="row items-center">
        <div class="col-sm-6 col-12">
          <div class="news-info__data__container__data">
            <p>{{ name }}</p>
            <p>
              {{ bio }}
            </p>
            <p>June 28 {{ new Date().getFullYear() }}</p>
          </div>
        </div>
        <div class="col-sm-6 col-12">
          <div class="news-info__data__container__content">
            <div class="news-info__data__container__img">
              <img :src="newImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import defaultImage from "../../../assets/images/speaker-image.png";
export default {
  props: {
    newImage: {
      type: String,
      default: defaultImage,
    },
    name: {
      type: String,
      default: "Developer Programming Seminar",
    },
    bio: {
      type: String,
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  },
};
</script>
