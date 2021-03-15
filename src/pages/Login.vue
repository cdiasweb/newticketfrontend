<template>
<Header @newcompany="showFormNewCompany()" @login="login()"></Header>
  <div class="login-container">
    <LoginModal>
      <BaseForm @submit="onSubmit(email, password)" @validation="checkValid">
        <TextField
          v-model="email"
          label="E-mail"
          :required="true"
          :validators="[checkEmail]"
          :grow="true"
        ></TextField>
        <TextField
          v-model="password"
          label="Senha"
          password
          :validators="[checkLength]"
          :required="true"
          :grow="true"
        ></TextField>
      </BaseForm>
      <Button
        :loading="loading"
        :enabled="submit.enabled"
        title="Acessar"
        @click="onSubmit(email, password)"
        @disclick="disclick"
      />
    </LoginModal>
    <FeedbackModal
      @close="message.show = false"
      v-if="message.show"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  ref,
  getCurrentInstance,
  inject,
} from "vue";
import TextField from "@/components/TextField.vue";
import BaseForm from "@/components/BaseForm.vue";
import Button from "@/components/Button.vue";
import FeedbackModal from "@/components/FeedbackModal.vue";
import Header from "@/components/Header.vue";
import LoginModal from "@/modals/LoginModal.vue";
import { isEmail, minLength } from "@/util/validators";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    TextField,
    LoginModal,
    Button,
    BaseForm,
    FeedbackModal,
    Header
  },
  setup(props, ctx) {
    const email = ref("");
    const password = ref("");
    const submit = reactive({ enabled: false });
    const message = reactive({
      title: "",
      text: "",
      type: "",
      show: false,
    });
    const loading = ref(false);

    const store = useStore();

    function checkValid(validation: any) {
      submit.enabled = validation.valid;
    }

    function showMessage(title: string, text: string, type: string) {
      message.show = true;
      message.title = title;
      message.text = text;
      message.type = type;
    }

    const checkEmail = isEmail();
    const checkLength = minLength(10);

    const request: any = inject("request");
    async function onSubmit() {
      if (!password.value || !email.value) {
        return;
      }

      try {
        loading.value = true;
        await request({
          url: store.getters.getApiUrl + "/autentica",
          method: "post",
          data: {
            email: email.value,
            password: password.value,
          },
        })
          .then((res: any) => {
            const response = res.data;
            console.log(response);
            store.dispatch("changePage", "Principal");
            if (response.error) {
              showMessage("Acesso ao sistema", response.message, "alert");
              return;
            }

            if (response.token) {
              store.dispatch("changePage", "Principal");
              localStorage.setItem("user", JSON.stringify(response));
            }
          })
          .catch((e: any) => {
            showMessage(
              "Acesso ao sistema",
              "Ocorreu um erro ao tentar acessar o sistema, entre em contato com o suporte: " +
                e.message,
              "error"
            );
          });
          loading.value = false;
      } catch (e) {
        showMessage(
          "Acesso ao sistema",
          "Ocorreu um erro ao tentar acessar o sistema, entre em contato com o suporte: " +
            e.message,
          "error"
        );
      }
    }

    function disclick() {
      showMessage(
        "Acesso ao sistema",
        "Informe um e-mail e uma senha para acessar.",
        "alert"
      );
    }

    return {
      email,
      password,
      checkValid,
      checkEmail,
      checkLength,
      submit,
      onSubmit,
      message,
      disclick,
      loading,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  display: block;
  background-repeat: no-repeat;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  align-items: center;
  align-content: center;
}
.login-header {
  background-color: white;
  min-height: 5rem;
  margin-bottom: 1rem;
}
.logo-agente {
  margin: 2rem;
  max-height: 2.5rem;
}
</style>
