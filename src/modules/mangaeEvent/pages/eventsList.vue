<template>
  <div class="page-content q-px-xl manage-event">
    <title-desc
      desc="Select a site to edit, view and open its dashboard."
      title="My Events"
      class="q-mt-xl"
    />
    <div class="my-Event">
      <div class="row" v-for="item in getAllEvent" :key="item.id">
        <div class="col-md-1 col-sm-6 col-xs-12"></div>
        <div class="col-md-10 col-sm-6 col-xs-12">
          <listEvents
            :name="item.name"
            :eventRegisterUrl="item.eventRegisterUrl"
            :id="item.id"
            :active="item.active"
            @onDetails="onDetails(item.id)"
            @onDelete="onDelete(item.id)"
          />
        </div>

        <div class="col-md-1 col-sm-6 col-xs-12"></div>
      </div>
      <div class="row" v-if="!getAllEvent.length">
        <p>you do not have any event yet please add event from btutton above</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import TitleDesc from "../components/titleDesc.vue";
import eventServices from "../services/eventServices";
import { useQuasar } from "quasar";
import listEvents from "../components/listEvents.vue";
export default defineComponent({
  name: "eventList",
  components: {
    listEvents,
    TitleDesc,
  },
  setup() {
    const loading = ref(false);
    const $q = useQuasar();
    const value = ref("Inactive");
    const dialog = ref(false);
    const appID = localStorage.getItem("orgId");
    const openDialog = (id) => {
      dialog.value = true;
    };

    const onDetails = (item) => {
    };

    const getAllEvent = ref([]);

    const onGetAllEvent = () => {
      $q.loading.show();
      eventServices.getAllEvent(appID).then((res) => {
        if (res.data.statusCode == 200) {
          getAllEvent.value = res.data.result;
          $q.loading.hide();
        } else {
          $q.loading.hide();
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
    const onDelete = (item) => {
      $q.loading.show();
      eventServices.deleteEvent(appID, item).then((res) => {
        if (res.data.statusCode == 200) {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Delete Event Successfully",
            timeout: 1000
          });
          onGetAllEvent();
          $q.loading.hide();
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

    onMounted(() => {
      onGetAllEvent();
    });
    return {
      value,
      dialog,
      openDialog,
      // deleteEvent,
      onDelete,
      appID,
      getAllEvent,
      loading,
      isDanger: false,
      copyContent,
      onDetails,
    };
  },
});
</script>
