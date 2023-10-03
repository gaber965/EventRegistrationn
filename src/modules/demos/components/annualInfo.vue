<template>
  <div class="annual-info q-pa-md" :class="className">
    <div class="annual-info__data">
      <div class="row annual-info__data__container">
        <div class="col-lg-8 col-md-6 col-12">
          <div class="annual-info__data__artical">
            <p v-if="name">{{ name }}</p>
            <p v-if="!name">
              Anuual tech <br />
              conference {{ new Date().getFullYear() }}
            </p>
            <div class="annual-info__data__detailes">
              <span>
                <q-icon name="calendar_month"> </q-icon>
                {{ new Date(startdatetime).toLocaleDateString().split("T")[0] }}
                {{ eventstarttime }}
                |
                {{ new Date(enddatetime).toLocaleDateString().split("T")[0] }}
                {{ eventendtime }}</span
              >

              <span>
                <q-icon class="q-mr-sm" name="location_on"></q-icon
                >{{ eventaddress }}, Egypt</span
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 c-pa">
          <div class="annual-info__data__card">
            <p v-if="name">{{ name }}</p>
            <p v-if="!name">
              Anuual tech <br />
              conference {{ new Date().getFullYear() }}
            </p>
            <p class="desc">
              <q-icon class="q-mr-sm" name="location_on"></q-icon
              ><span
                >{{ eventaddress }}<br />
                Egypt</span
              >
            </p>
            <div class="date">
              <p>
                START TIME <br /><span>
                  {{
                    new Date(startdatetime).toLocaleDateString().split("T")[0]
                  }}
                  {{ eventstarttime }}</span
                >
              </p>
              <p>
                END TIME <br /><span
                  >{{
                    new Date(enddatetime).toLocaleDateString().split("T")[0]
                  }}
                  {{ eventendtime }}</span
                >
              </p>
            </div>
            <div class="button">
              <q-btn
                :to="{ path: buttonUrl }"
                :label="annualInfoDataCardButton"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="annual-info__data__about-us"
        :class="aboutClass == 'demo-one__annual-info_about' ? '' : 'hidden'"
      >
        <p v-if="desc">
          {{ desc }}
        </p>
        <div v-if="!desc">
          <p>
            Egypt has recently launched an initiative "Digital Egypt Offshoring
            Industry Vision 2022-2026" joining this match making event will
            allow you to get first-hand information about the benefits you will
            enjoy if you decide to invest in Egypt.
          </p>
          <p>
            A full scale national electronics strategy is adapted to promote
            both the design & Manufacturing sides of the industry. MCIT is
            currently immersed in establishing the "Electronics innovation Hub"
            within the Knowledge city located in the top-notch New
            administrative capital of Egypt.
          </p>
          <p>
            Recently, ITIDA reached an agreement with the "Global Semiconductors
            Alliance" to establish an Egyptian chapter, GSA-Egypt under the
            umbrella of EiTESAL. The fast-growing semiconductor Egytian industry
            will be spreading and integrated with the worldwide technology.
            EiTESAL members will be active members in the GSA and Dr. Haddara &
            Eng. Mohamed Mohsen, EiTESAL board members will attend the global
            convention in Munich to launch the chapter.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["className"],
  props: {
    annualInfoDataCardButton: {
      type: String,
      default: "RSVP Now!",
    },
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    startdatetime: {
      type: String,
      default: " 27 June, 8:00AM ",
    },
    enddatetime: {
      type: String,
      default: " 28 June, 9:30 PM",
    },
    eventstarttime: {
      type: String,
      default: " 00:00:00 ",
    },
    eventendtime: {
      type: String,
      default: " 00:00:00 ",
    },
    eventaddress: {
      type: String,
      default: " Grand Conference Hall st 11341 Cairo,",
    },
    aboutClass: {
      type: String,
      default: "",
    },
    buttonUrl: {
      type: String,
      default: "",
    },
  },

  setup() {},
});
</script>
