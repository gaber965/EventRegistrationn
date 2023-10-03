<template>
  <q-card class="my-card no-border" @click="onDetails()">
    <div class="parent-image">
      <img :src="img" class="image-cover" />
    </div>
    <div class="close-icon">
      <q-icon name="close" class="close-icon2" @click.stop="openDialog()" />
      <deleteDialog v-model="dialog" @fireEvent="deleteNews" :name="'news'" />
    </div>
    <div class="edit-icon">
      <q-icon name="edit" class="edit-icon2" @click="EditNews()" />
    </div>
    <q-card-section>
      <div class="news-data text-center">
        <q-icon name="calendar_month" class="icon-calendar" />
        <div class="data">{{ data }}</div>
      </div>

      <div class="title">
        <span> {{ name }} </span>
      </div>
    </q-card-section>

    <q-card-section class="text">
      <p>
        {{ bio }}
      </p>
      <p class="see-more">...see more</p>
    </q-card-section>
  </q-card>
</template>
<script>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import deleteDialog from "../../../components/deletePopup.vue";
export default {
  props: {
    img: {
      type: String,
      default: "",
    },
    data: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    placeName: {
      type: String,
      default: "",
    },
  },
  components: {
    deleteDialog,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const newsId = route.params.id;
    const dialog = ref(false);
    const openDialog = (id) => {
      dialog.value = true;
    };

    // function delete item
    const deleteNews = () => {
      emit("deleteNews");
    };
    const EditNews = () => {
      emit("EditNews");
    };
    const onDetails = () => {
      emit("onDetails");
    };
    return {
      dialog,
      openDialog,
      deleteNews,
      onDetails,
      newsId,
      EditNews,
    };
  },
};
</script>
