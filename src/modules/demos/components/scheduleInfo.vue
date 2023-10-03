<template>
  <div class="content">
    <div class="mainsection">
      <div class="content_card">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm-6 col-12 time">
            <div class="time__date">
              <span>{{ daySession }}</span>
              <div class="time__info">
                <p>
                  {{ monthSession }} <span>{{ fromTime }} - {{ toTime }}</span>
                </p>
                <p class="place">{{ placeName }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="content_card__desc">
              <p>{{ name }}</p>
              <div class="desc">
                <p>
                  {{ bio }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-if="speakerImg">
            <div class="session-member" v-for="item in speakerImg" :key="item">
              <div class="row justify-center">
                <div class="col-md-4 col-sm-2 col-4">
                  <img :src="item.imagePath" />
                </div>
                <div class="col-md-8 col-sm-4 col-8">
                  <p>{{ item.name }}</p>
                  <p class="session-member__desc">{{ item.jobTitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-else>
            <div class="session-member">
              <div class="row justify-center">
                <div class="col-md-4 col-sm-2 col-4">
                  <img src="../../../assets/images/speaker-image.png" />
                </div>
                <div class="col-md-8 col-sm-4 col-8">
                  <p>Miriam Middleton</p>
                  <p class="session-member__desc">Cofounder, CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { ref } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    fromTime: {
      type: String,
      default: "09:30 AM",
    },
    daySession: {
      type: String,
      default: "27",
    },
    monthSession: {
      type: String,
      default: "June",
    },
    toTime: {
      type: String,
      default: " 10:30 AM",
    },
    placeName: {
      type: String,
      default: "Hall 5 connecta",
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
    speakerImg: {
      type: String,
      default: "",
    },
    speakerName: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>
