<template>
  <q-page>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="my-card" @click="onDetails()">
        <q-icon name="close" class="delete" @click.stop="openDialog()"></q-icon>
        <deleteDialog
          v-model="dialog"
          @fireEvent="deletefcilitiey"
          :name="'facilitiy'"
        />
        <q-icon name="edit" class="edit" @click="Editfacilities()"></q-icon>
        <img :src="img" />

        <q-card-section>
          <p>{{ name }}</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { ref } from "vue";
import deleteDialog from "../../../components/deletePopup.vue";
export default {
  props: {
    img: {
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
    const $q = useQuasar();
    const route = useRoute();
    const loading = ref(false);
    const dialog = ref(false);
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);

    const openDialog = (id) => {
      dialog.value = true;
    };
    const facilitieId = route.params.id;
    // function delete item
    const deletefcilitiey = () => {
      emit("deletefcilitiey");
    };
    const Editfacilities = () => {
      emit("Editfacilities");
    };
    const onDetails = () => {
      $q.loading.show();
      emit("onDetails");
      $q.loading.hide();
    };

    return {
      dialog,
      openDialog,
      Editfacilities,
      deletefcilitiey,
      onDetails,
      facilitieId,
      loading,
    };
  },
};
</script>
