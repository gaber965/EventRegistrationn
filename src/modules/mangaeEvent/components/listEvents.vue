<template>
  <div class="page-content manage-event">
    <title-desc
      desc="Select a site to edit, view and open its dashboard."
      title="My Events"
      class="q-px-xl q-mt-xl"
    />

    <div class="row row-event">
      <div class="col-md-3 name">
        <p>
          <router-link to="" @click="homeByName(id)">
            {{ name }}
          </router-link>
        </p>
      </div>
      <div class="col-md-5 link">
        <q-icon name="link" v-if="eventRegisterUrl" />

        <router-link class="menu-link" to="">
          <p
            class="menu-text"
            id="name-event"
            @click="copyContent(eventRegisterUrl)"
          >
            {{ eventRegisterUrl }}
          </p>
        </router-link>
      </div>
      <div class="custom-toggle col-md-2">
        <q-toggle
          v-model="value"
          :label="value ? 'Active' : 'InActive'"
          @update:model-value="activatEvent(value, id)"
          color="green"
          size="lg"
        />
      </div>
      <div class="col-md-2 icons">
        <div class="row">
          <div class="speace-between-icon">
            <div class="delete-icon col-md-4">
              <img
                src="../../../assets/images/remove88.png"
                @click.stop="openDialog()"
              />
              <deleteDialog
                v-model="dialog"
                @fireEvent="onDelete"
                :name="'deleteEvent'"
                class="deleteEvent"
              />
            </div>
            <div class="edit-icon col-md-4" @click="goToUpdate(id)">
              <img src="../../../assets/images/edit.png" />
            </div>
            <div class="view-icon col-md-4">
              <div class="eye" @click="viewEvent(id)">
                <img src="../../../assets/images/eye.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import deleteDialog from "../../../components/deletePopupEvent.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import eventServices from "../services/eventServices";
export default {
  props: {
    active: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 1,
    },
    eventRegisterUrl: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  components: {
    deleteDialog,
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const $q = useQuasar();
    const value = ref(false);
    const dialog = ref(false);
    const route = useRoute();
    const router = useRouter();
    const EventId = route.params.id;
    const orgId = localStorage.getItem("orgId");
    const openDialog = (id) => {
      dialog.value = true;
    };

    const onDetails = () => {
      emit("onDetails");
    };
    const onDelete = () => {
      emit("onDelete");
    };
    const activatEvent = (item, id) => {
      eventServices.activeEvent(orgId, id, item).then((res) => {
        if (res.data.statusCode === 200) {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Status Changed Successfully",
            timeout: 1000
          });
        }else {
          $q.notify({
          color: "red",
          textColor: "white",
          icon: "warning",
          message: "something went wrong",
          timeout: 1000
        });
        }
      });
    };

    let urlEvent = document.getElementById("name-event");
    const copyContent = async (urlEvent) => {
      try {
        await navigator.clipboard.writeText(urlEvent);
        $q.notify({
          color: "green",
          textColor: "white",
          icon: "check",
          message: "copied Successfully",
          timeout: 1000
        });
      } catch (err) {
        $q.notify({
          color: "red",
          textColor: "white",
          icon: "warning",
          message: "something went wrong",
          timeout: 1000
        });
      }
    };
    const viewEvent = (id) => {
      $q.loading.show();
      router.push({
        name: "eventDetails",
        params: {
          id: id,
        },
      });
      $q.loading.hide();
    };
    const goToUpdate = (id) => {
      $q.loading.show();
      router.push({
        name: "editEvent",
        params: {
          id: id,
        },
      });
      $q.loading.hide();
    };

    const homeByName = (id) => {
      $q.loading.show();
      localStorage.setItem("appID", id);
      router.push({
        name: "homePage",
      });
      $q.loading.hide();
    };
    onMounted(() => {
      value.value = props.active;
    });
    return {
      activatEvent,
      value,
      dialog,
      openDialog,
      EventId,
      loading,
      isDanger: false,
      orgId,
      copyContent,
      onDelete,
      onDetails,
      viewEvent,
      homeByName,
      goToUpdate,
    };
  },
};
</script>
