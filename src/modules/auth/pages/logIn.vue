<template>
  <div class="container-login fullscreen">
    <div class="row fullscreen content">
      <div class="login-form col-md-3 col-sm-12 self-center">
        <h3>Sign in</h3>
        <q-form
          @submit.prevent="login"
          @reset="onReset"
          class="q-gutter-md login_form"
          v-model="form"
        >
          <q-input
            filled
            v-model="form.email"
            placeholder="Email *"
            :dense="dense"
            lazy-rules
            :rules="rules.validEmail"
            class="input-email"
          />

          <q-input
            v-model="form.password"
            filled
            :dense="dense"
            placeholder="Password *"
            :type="isPwd ? 'password' : 'text'"
            :rules="rules.required"
            class="input-password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div>
            <q-btn
              type="submit"
              color="btn"
              label="sign in"
              size="15px"
              class="btn-singin"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/services";
import rules from "src/configs/rules.js";
export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const isPwd = ref(true);
    const form = ref({
      email: "",
      password: "",
    });
    // login function
    const login = () => {
      $q.loading.show();
      services.logIn(form.value).then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.result));
          localStorage.setItem("accessToken", res.data.result.token);
          localStorage.setItem("orgId", res.data.result.orgID);
          router.push({ name: "eventsList" });
          $q.loading.hide();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Loged in Successfully",
          });
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "password or email is wrong",
          });
        }
      });
    };
    return {
      isPwd,
      form,
      login,
      rules,
    };
  },
};
</script>
