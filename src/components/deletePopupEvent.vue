<template>
  <q-dialog>
    <q-card class="request-card delete-dialog">
      <div class="delete-image">
        <img src="../assets/images/delete-icon-oversize.png" />
      </div>
      <div class="icon-close">
        <q-icon name="close" size="sm" color="grey-13" v-close-popup />
      </div>
      <div class="title-event-popup-delete">
        <span>Are you sure?</span>
      </div>
      <q-card-section class="row items-center q-gutter-sm delete-category">
        <p v-if="name">
          Do you really want to delete this Event? You will lose all your site
          settings, data, registered users, and more This process cannot be
          undone
        </p>
        <p v-else>
          Deleting this category will delete all its related data. Are you want
          to proceed?
        </p>
        <div class="row delete-category__content__buttons row-delete-btn-event">
          <q-btn
            no-caps
            label="No"
            v-close-popup
            class="delete-category__content__buttons__cancel row-delete-btn-event-no"
            @click="cancelation()"
          />
          <q-btn
            no-caps
            label="Yes, Delete"
            class="delete-category__content__buttons__add row-delete-btn-event-yes"
            @click="onDelete()"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "deleteDialoge",
  props: ["name"],

  setup(props, { emit }) {
    const $q = useQuasar();
    const onDelete = () => {
      emit("fireEvent");
    };
    const cancelation = () => {
      $q.loading.show();
      $q.loading.hide();
      $q.notify({
        type: "info",
        badgeStyle: {
          display: "none",
        },
        message: "Delete Canceled.",
      });
    };

    return {
      onDelete,
      cancelation,
    };
  },
};
</script>
