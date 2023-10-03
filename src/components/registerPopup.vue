<template>
  <q-dialog>
    <q-card class="request-card delete-dialog">
      <div class="title">
        <q-icon :name="iconName"></q-icon>
        <span>Warning</span>
      </div>

      <q-card-section class="row items-center q-gutter-sm delete-category">
        <p>Are you sure you want to {{ name }} this user ?</p>
        <!--  -->
        <div class="row delete-category__content__buttons">
          <q-btn
            no-caps
            label="Cancel"
            v-close-popup
            class="delete-category__content__buttons__cancel"
            @click="cancelation()"
          />
          <q-btn
            no-caps
            label="ok"
            class="delete-category__content__buttons__add"
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
  props: ["name", "iconName"],

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
        message: "",
      });
    };
    return {
      onDelete,
      cancelation,
    };
  },
};
</script>
