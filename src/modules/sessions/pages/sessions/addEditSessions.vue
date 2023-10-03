<template>
  <q-page padding>
    <div class="q-pa-md add-category">
      <div class="content">
        <div id="mainsection">
          <q-form @submit.prevent="addEditData()">
            <div id="add-edit-exhibitor" class="add-edit-exhibitor row">
              <div class="col-lg-2 col-md-3 col-12">
                <div class="exhibitor-image">
                  <div
                    class="upload-image"
                    :class="form.contentImagePath ? 'update-image' : ''"
                  >
                    <img
                      :src="form.contentImagePath"
                      v-if="form.contentImagePath"
                    />
                    <q-file
                      v-model="ImgWord"
                      @update:model-value="uploadImage()"
                    >
                      <p>Click to Upload</p>
                      <q-icon name="cloud_upload" />
                    </q-file>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-7 col-12">
                <div class="exhibitor-name input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Session Title*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Session Title"
                        dense
                        v-model="form.name"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-phone input-data">
                  <p class="date-text">
                    <!-- Event Date: from 07-11-2021 to 10-11-2021-->
                  </p>
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Date*</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        v-model="form.availableDays"
                        mask="date"
                        :rules="rules.required"
                        dense
                        placeholder="Pick a Day"
                        outlined
                      >
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="form.availableDays"
                                @update:model-value="
                                  updateDate(form.availableDays)
                                "
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="exhibitor-country input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Time *</p>
                    </div>
                    <div class="col-md-5 col-12 q-pr-sm">
                      <q-input
                        v-model="form.fromTime"
                        mask="time"
                        :rules="rules.required"
                        placeholder="Start Time"
                        dense
                        outlined
                      >
                        <template v-slot:prepend>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="form.fromTime">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-5 col-12 q-pl-sm">
                      <q-input
                        v-model="form.toTime"
                        mask="time"
                        :rules="rules.required"
                        placeholder="End Time"
                        dense
                        outlined
                      >
                        <template v-slot:prepend>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="form.toTime">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="website-account input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Venue *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Places"
                        dense
                        v-model="form.placeName"
                        :rules="rules.required"
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-category input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Category *</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-select
                        outlined
                        dense
                        v-model="categoryName"
                        :options="allCategories"
                        :label="categoryName ? '' : 'Select Category'"
                        :class="add == false ? 'added' : ''"
                        :rules="rules.required"
                        option-label="name"
                        option-value="id"
                        @update:model-value="selectCategoryId($event)"
                      />
                    </div>
                  </div>
                </div>
                <div class="Description input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Description</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        type="textarea"
                        outlined
                        dense
                        class="description-input"
                        v-model="form.bio"
                      />
                    </div>
                  </div>
                </div>
                <div class="exhibitor-display input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Home Display</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <label
                        ><input
                          type="checkbox"
                          name="test_id"
                          v-model="form.homeDisplay"
                          @change="changeCheckBox"
                          class="checkbox"
                        />
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="exhibitor-order input-data">
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Live URL</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-input
                        outlined
                        placeholder="Live URL"
                        dense
                        v-model="form.contentURL"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="exhibitor-order input-data input-data-addSpeaker"
                  v-if="add == true"
                >
                  <div class="row row__data">
                    <div class="col-md-2 col-12">
                      <p>Speakers</p>
                    </div>
                    <div class="col-md-10 col-12">
                      <q-btn
                        outline
                        label="Add Speakers"
                        @click.stop="openDialog"
                      />
                      <div class="add-speakers__name" v-if="selectedName">
                        <p v-for="x in selectedName" :key="x.id">
                          {{ x.name }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <q-dialog v-model="dialog" class="dialog-speaker">
                    <div class="q-pa-md">
                      <p class="dialog-speaker__title">Select Speaker</p>

                      <q-table
                        :rows="rowSpeaker"
                        :columns="columns"
                        row-key="name"
                        v-model:pagination="pagination"
                      >
                        <template v-slot:body-cell-name="props">
                          <q-td :props="props" class="name">
                            <img :src="props.row.imagePath" />
                            {{ props.row.name }}
                          </q-td>
                        </template>
                        <template v-slot:body-cell-select="props">
                          <q-td :props="props" class="select">
                            <input
                              type="checkbox"
                              name="test_id"
                              class="checkbox"
                              v-model="selected"
                              :value="props.row"
                            />
                            <span :for="props.row"></span>
                          </q-td>
                        </template>

                        <template v-slot:pagination="scope">
                          <q-btn
                            v-if="scope.pagesNumber > 2"
                            icon="first_page"
                            color="grey-8"
                            round
                            dense
                            flat
                            :disable="scope.isFirstPage"
                            @click="scope.firstPage"
                          />

                          <q-btn
                            icon="chevron_left"
                            color="grey-8"
                            round
                            dense
                            flat
                            :disable="scope.isFirstPage"
                            @click="scope.prevPage"
                          />

                          <q-btn
                            icon="chevron_right"
                            color="grey-8"
                            round
                            dense
                            flat
                            :disable="scope.isLastPage"
                            @click="scope.nextPage"
                          />

                          <q-btn
                            v-if="scope.pagesNumber > 2"
                            icon="last_page"
                            color="grey-8"
                            round
                            dense
                            flat
                            :disable="scope.isLastPage"
                            @click="scope.lastPage"
                          />
                        </template>
                      </q-table>
                      <div class="save-button">
                        <button @click="save()">save</button>
                      </div>
                    </div>
                  </q-dialog>
                </div>
                <div v-for="speaker in nameSpeaker" :key="speaker">
                  <p>your speaker is : {{ speaker }}</p>
                </div>
                <div class="add-edit-buttons">
                  <div class="add-edit-button">
                    <q-btn
                      :label="add == true ? 'Add' : 'update'"
                      type="submit"
                    />
                  </div>
                  <div class="add-edit-button" v-if="add == false">
                    <q-btn label="Cancel" @click="cancel()" />
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref, watch, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import rules from "src/configs/rules";
import adminServices from "../../services/servicesSession";
import adminService from "../../../speakers/services/services";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const add = ref(false);
    const edit = ref(false);
    const isChecked = ref(true);
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
      onGetAllSpeaker();
    };
    const cancel = () => {
      $q.loading.show();
      router.push({
        name: "sessionsList",
      });
      $q.loading.hide();
    };
    const form = ref({
      contentImagePath: "",
      name: "",
      contentCatgoryID: "",
      placeName: "",
      bio: "",
      homeDisplay: false,
      fromTime: "",
      toTime: "",
      availableDays: "",
      contentURL: "",
      speakers: "",
    });
    const options = [
      {
        label: "EGYPT",
        value: true,
      },
      {
        label: "CANADA",
        value: false,
      },
    ];
    const allCategories = ref([]);
    const onGetAllCategories = () => {
      adminServices.getCategory(orgId, appID).then((res) => {
        allCategories.value = res.data.result;
      });
    };
    const categoryName = ref("");
    const selectCategoryId = (event) => {
      form.value.contentCatgoryID = event.id;
    };
    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "Email",
        field: "email",
        field: (row) => row.email,
        sortable: true,
      },
      {
        name: "jobTitleName",
        label: "Job title",
        field: "job",
        sortable: true,
        field: (row) => row.jobTitleName,
      },
      {
        name: "mobilePhone",
        label: "Phone",
        field: "phone",
        field: (row) => row.mobilePhone,
      },
      { name: "select", label: "Select", align: "center" },
    ];
    const rowSpeaker = ref([]);
    const searchSpeaker = ref("");
    const onGetAllSpeaker = (page = 0) => {
      $q.loading.show();
      adminService
        .getAllSpeaker(orgId, appID, searchSpeaker.value, page)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            rowSpeaker.value = resp.data.result.items;
            pagination.value.page = resp.data.result.paging.pageNumber;
            pagination.value.rowsPerPage = resp.data.result.paging.totalItems;
          }
          $q.loading.hide();
        });
    };
    const selected = ref([]);

    function removeDuplicates(arr) {
      return selected.value.filter(
        (item, index) => arr.indexOf(item) === index
      );
    }
    //
    const selectedName = ref([]);
    const save = () => {
      var value = selected.value.filter(function (e) {
        var key = Object.keys(e.userID)
          .map((k) => e.userID[k])
          .join("|");

        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, {});

      var named = selected.value.filter(function (e) {
        var key = Object.keys(e.userID)
          .map((k) => e.userID[k])
          .join("|");

        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, {});

      form.value.speakers = value.map((item) => {
        return { userID: item.userID };
      });
      selectedName.value = named.map((item) => {
        return { id: item.userID, name: item.name };
      });

      var speaker = selected.value.reduce(function (r, v) {
        var name = v.split("|")[0];

        if (nameSpeaker.value.includes(name)) {
        } else {
          nameSpeaker.value.push(name);
        }
        if (!r[name]) {
          r[name] = 1;
        }
        return r;
      }, {});

      dialog.value = false;
    };
    const file = ref("");
    const ImgWord = ref("");
    const uploadImage = () => {
      file.value = ImgWord.value;
      const fileData = new FormData();
      fileData.append("file", file.value);
      $q.loading.show();
      adminServices.getImageUrl(fileData).then((resp) => {
        if (resp.data.statusCode == 200) {
          $q.loading.show();
          form.value.contentImagePath = resp.data.result.path;
        }
        $q.loading.hide();
      });
    };
    // valid dates
    const validDatesArr = ref([]);
    const validDateFun = () => {
      $q.loading.show();
      adminServices.getDate(orgId, appID).then((resp) => {
        var stratDate = formatDate(resp.data.result.startdatetime);
        var endDate = formatDate(resp.data.result.enddatetime);
        const dateMove = new Date(stratDate);
        while (stratDate < endDate) {
          stratDate = dateMove.toISOString().slice(0, 10);
          validDatesArr.value.push(stratDate);
          dateMove.setDate(dateMove.getDate() + 1);
        }
        $q.loading.hide();
      });
    };
    const updateDate = (date) => {
      if (!validDatesArr.value.includes(formatDate(date))) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "That Date Not Included With The Session Dates",
        });
        form.value.availableDays = "";
      } else {
      }
 
    };
    watch(route, (to) => {
      if (to.name == "addSessions" || to.path == "editSessions") {
        functionSessions();
      }
    });
    const changeCheckBox = () => {
      form.value.homeDisplay != form.value.homeDisplay;
    };
    const appID = localStorage.getItem("appID");
    const orgId = localStorage.getItem("orgId");
    const functionSessions = () => {
      if (route.name == "addSessions") {
        add.value = true;
        edit.value = false;
      } else if (route.name == "editSessions") {
        edit.value = true;
        add.value = false;
        onGetSessionDetailes();
      }
    };
    const addEditData = () => {
      if (route.name == "addSessions") {
        addDataSession();
      } else if (route.name == "editSessions") {
        editDataSession();
      }
    };
    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const addDataSession = () => {
      form.value.availableDays = formatDate(form.value.availableDays);
      $q.loading.show();
      if (form.value.contentImagePath) {
        adminServices.addSession(orgId, appID, form.value).then((resp) => {
          if (resp.data.statusCode == 200) {
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            $q.loading.show();
            router.push({
              name: "sessionsList",
            });
            $q.loading.hide();
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Please Add Speaker",
            });
          }
        });
      } else {
        $q.loading.hide();
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "please upload your image",
        });
      }
    };
    const onGetSessionDetailes = () => {
      adminServices
        .detailesSession(orgId, appID, route.params.dataId)
        .then((res) => {
          form.value = res.data.result;
          categoryName.value = res.data.result.categoryName;
        });
    };
    const editDataSession = () => {
      form.value.availableDays = formatDate(form.value.availableDays);
      $q.loading.show();
      adminServices
        .editSession(orgId, appID, route.params.dataId, form.value)
        .then((resp) => {
          if (resp.data.statusCode == 200) {
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Updated Successfully",
            });
            $q.loading.show();
            router.push({
              name: "sessionsList",
            });
            $q.loading.hide();
          } else {
            $q.loading.hide();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: resp.data.message,
            });
          }
        });
    };
    onMounted(() => {
      functionSessions();
      onGetAllCategories();
      validDateFun();
    });
    const pagination = ref({
      page: 2,
      rowsPerPage: 10,
    });
    return {
      form,
      functionSessions,
      onGetAllCategories,
      add,
      edit,
      addEditData,
      options,
      allCategories,
      selected,
      categoryName,
      rowSpeaker,
      pagination,
      selectCategoryId,
      onGetSessionDetailes,
      columns,
      addDataSession,
      editDataSession,
      changeCheckBox,
      dialog,
      save,
      orgId,
      removeDuplicates,
      openDialog,
      rules,
      uploadImage,
      file,
      ImgWord,
      pagesNumber: computed(() => {
        return Math.ceil(
          rowSpeaker.value.length / pagination.value.rowsPerPage
        );
      }),
      searchSpeaker,
      onGetAllSpeaker,
      formatDate,
      cancel,
      appID,
      selectedName,
      updateDate,
      validDateFun,
      validDatesArr,
    };
  },
};
</script>
