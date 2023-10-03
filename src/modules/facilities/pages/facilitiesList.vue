<template>
  <q-page padding class="facility-cards">
    <div class="container">
      <div class="row exbhibitors-category">
        <div class="col-lg-6 col-md-7 col-12">
          <div class="row exbhibitors-category__contet">
            <div class="exbhibitors-category__search-input col-md-6 col-12">
              <q-input
                placeholder="Search Facility..."
                v-model="filter"
                :dense="dense"
                @keyup.enter="filterSearch(filter)"
              >
                <template v-slot:prepend>
                  <q-icon name="search"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="resetInput"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-md-2 col-12 exbhibitors-category__filter">
              <div class="add-category-btn">
                <router-link class="menu-link" :to="{ name: 'addFacilite' }">
                  <q-btn label=" Add " class="add" icon="add" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="row content-fcilities">
          <div
            class="item-card col-md-3 col-xs-12 q-px-sm q-py-md"
            v-for="item in allFcilities"
            :key="item.contentID"
          >
            <cardFcilitiey
              :name="item.name"
              :bio="item.bio"
              :placeName="item.placeName"
              :id="item.contentID"
              :img="item.contentImagePath"
              @Editfacilities="Editfacilities(item.contentID)"
              @onDetails="onDetails(item.contentID)"
              @deletefcilitiey="deletefcilitiey(item.contentID)"
              class="origin-card"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="custom-pagination">
      <q-pagination
        v-model="currentt"
        :max="paging"
        active-color="primary"
        active-text-color="negative"
        color="gray-2"
        direction-links
        flat
        gutter="sm"
        @update:model-value="getAllFcilities()"
      />
    </div>
  </q-page>
</template>
<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import cardFcilitiey from "../components/cardFcilitiey.vue";
import services from "../services/services";
export default {
  components: {
    cardFcilitiey,
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const dialog = ref(false);
    const filter = ref(null);
    const search = ref("");
    const pageNumber = ref(1);
    const paging = ref(1);
    const loading = ref(false);
    const currentt = ref(1);
    const allFcilities = ref([]);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const filterSearch = (item) => {
      search.value = item;
      getAllFcilities();
    };
    const resetInput = () => {
      loading.value = true;
      search.value = "";
      filter.value = "";
      getAllFcilities();
      loading.value = false;
    };
    const openDialog = (id) => {
      dialog.value = true;
    };
    const onEdit = (item) => {
      $q.loading.show();
      router.push({
        name: "editFacility",
      });
      $q.loading.hide();
    };

    const getAllFcilities = () => {
      $q.loading.show();
      services
        .facilitieslist(orgId, appID, currentt.value, search.value)
        .then((res) => {
          if (res.data.statusCode === 200) {
            paging.value = res.data.result.paging.totalPages;
            allFcilities.value = res.data.result.items;
            $q.loading.hide();
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.result,
            });
          }
        });
    };
    const deletefcilitiey = (facilitieId) => {
      $q.loading.show();
      services.deleteFacilitie(orgId, appID, facilitieId).then((res) => {
        if (res.data.statusCode === 200) {
          getAllFcilities();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: " Deleted Successfully",
          });
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "something went wrong",
          });
        }
      });
    };
    const onDetails = (item) => {
      $q.loading.show();
      router.push({
        name: "detailsFacility",
        params: {
          id: item,
        },
      });
      $q.loading.hide();
    };
    const editData = (item) => {
      router.push({
        name: "editNew",
        params: {
          id: item,
        },
      });
    };
    const Editfacilities = (item) => {
      router.push({
        name: "editFacility",
        params: {
          id: item,
        },
      });
    };
    onMounted(() => {
      getAllFcilities();
    });
    return {
      currentt,
      paging,
      getAllFcilities,
      allFcilities,
      dialog,
      openDialog,
      onEdit,
      filter,
      search,
      filterSearch,
      deletefcilitiey,
      pageNumber,
      onDetails,
      editData,
      Editfacilities,
      loading,
      resetInput,
      appID,
      orgId,
    };
  },
};
</script>
