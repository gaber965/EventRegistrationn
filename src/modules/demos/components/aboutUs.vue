<template>
  <div class="about-info q-pa-md" :class="className">
    <div class="about-info__data">
      <div class="about-info__data__artical">
        <span>About US</span>
        <p v-if="name">{{ name }}</p>
        <p v-if="!name">
          Welcome to the Anuual Tech
          <br />
          Conference {{ new Date().getFullYear() }}
        </p>
      </div>
      <div class="about-info__data__about-us">
        <p v-if="desc">
          {{ desc }}
        </p>
        <div v-if="!desc">
          <p>
            Egypt has recently launched an initiative "Digital Egypt Offshoring
            Industry Vision 2022-2026" joining this match making event will
            allow you to get first-hand information about the benefits you will
            enjoy if you decide to invest in Egypt.
          </p>
          <p>
            A full scale national electronics strategy is adapted to promote
            both the design & Manufacturing sides of the industry. MCIT is
            currently immersed in establishing the "Electronics innovation Hub"
            within the Knowledge city located in the top-notch New
            administrative capital of Egypt.
          </p>
          <p>
            Recently, ITIDA reached an agreement with the "Global Semiconductors
            Alliance" to establish an Egyptian chapter, GSA-Egypt under the
            umbrella of EiTESAL. The fast-growing semiconductor Egytian industry
            will be spreading and integrated with the worldwide technology.
            EiTESAL members will be active members in the GSA and Dr. Haddara &
            Eng. Mohamed Mohsen, EiTESAL board members will attend the global
            convention in Munich to launch the chapter.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["className"],
  props: {
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },

    aboutClass: {
      type: String,
      default: "",
    },
  },

  setup() {},
});
</script>
