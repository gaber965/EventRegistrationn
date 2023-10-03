<template>
  <q-page padding>
    <!-- start toolbar  -->
    <div>
      <div class="q-pa-md table row exbhibitors-category">
        <div class="col-lg-6 col-md-7 col-12">
          <div class="row exbhibitors-category__contet">
            <div class="exbhibitors-category__search-input col-md-6 col-12">
              <q-input
                placeholder="Search News..."
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
                <router-link class="menu-link" :to="{ name: 'addNew' }">
                  <q-btn label=" Add " class="add" icon="add" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end toolbar -->
      <!--start content card -->
      <div class="content row">
        <div
          class="item-card col-md-3 col-xs-12 q-px-sm q-py-md"
          v-for="item in events"
          :key="item"
        >
          <news-card
            :name="item.name"
            :bio="item.bio"
            :placeName="item.placeName"
            :data="item.fromtime"
            :id="item.contentID"
            :img="item.contentImagePath"
            @EditNews="EditNews(item.contentID)"
            @onDetails="onDetails(item.contentID)"
            @deleteNews="deleteNews(item.contentID)"
          />
        </div>
      </div>
      <!--start content card -->
    </div>
    <div class="custom-pagination">
      <q-pagination
        v-model="currentt"
        :max="paging"
        active-color="primary"
        active-text-color="negative"
        color="gray-2"
        gutter="sm"
        direction-links
        flat
        @update:model-value="getNews()"
      />
    </div>
  </q-page>
</template>
<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import newsCard from "../components/newsCard.vue";
import services from "../services/services";
export default {
  setup() {
    const $q = useQuasar();
    const filter = ref(null);
    const router = useRouter();
    const loading = ref(false);
    const search = ref("");
    const paging = ref(1);
    const currentt = ref(1);
    const events = ref([]);
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const getNews = () => {
      $q.loading.show();
      services.news(orgId, appID, currentt.value, search.value).then((res) => {
        if (res.data.statusCode === 200) {
          paging.value = res.data.result.paging.totalPages;
          events.value = res.data.result.items;
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
    const filterSearch = (item) => {
      search.value = item;
      getNews();
    };
    const resetInput = () => {
      loading.value = true;
      search.value = "";
      filter.value = "";
      getNews();
      loading.value = false;
    };
    const EditNews = (item) => {
      router.push({
        name: "editNew",
        params: {
          id: item,
        },
      });
    };
    const onDetails = (item) => {
      $q.loading.show();
      router.push({
        name: "detailsNews",
        params: {
          id: item,
        },
      });
      $q.loading.hide();
    };
    const deleteNews = (newsId) => {
      $q.loading.show();
      services.deleteNews(orgId, appID, newsId).then((res) => {
        if (res.data.statusCode === 200) {
          getNews();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Deleted Successfully",
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

    onMounted(() => {
      getNews();
    });
    return {
      loading,
      EditNews,
      onDetails,
      filter,
      filterSearch,
      current: ref(3),
      getNews,
      paging,
      events,
      currentt,
      deleteNews,
      resetInput,
      appID,
      orgId,
    };
  },
  components: { newsCard },
};
</script>
