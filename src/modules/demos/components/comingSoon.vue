<template>
  <div class="coming-soon">
    <img
      src="../../../assets/images/commingSoon.png"
      class="background-coming-soon"
    />
    <div class="coming-soon-container">
      <div class="row row-coming-soon">
        <div class="col-md-6 col-xs-12 col-coming-soon">
          <div class="parent-coming-soon-logo">
            <img :src="image" class="logo-coming-soon" />
          </div>
          <p>WE ARE COMING SOON!!</p>
          <p>Stay tuned for something amazing</p>
        </div>
      </div>
    </div>
    <div class="copyright-coming-soon">
      <p>© Copyrights {{ new Date().getFullYear() }} | All Rights Reserved</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["image"],
  setup(props) {
    return {};
  },
};
</script>
