<template>
  <div class="row title-desc-component q-mb-xl">
    <div class="col-12 title q-mb-lg">
      {{ title }}
    </div>
    <div class="col-12 desc">
      <p>{{ desc }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "titleDesc",
  props: {
    title: {
      type: String,
      default: "Pick the Website Template You Love",
    },
    desc: {
      type: String,
      default: "Choose one and make it your own!",
    },
  },
  setup() {
    return {};
  },
});
</script>
