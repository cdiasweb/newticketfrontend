<template>
  <Header />
  <Content>
    <TextField v-model="userName" label="Pesquisar usuários"></TextField>
    <br />
    <Builder :buildprint="buildData"></Builder>
  </Content>
  <Footer>
    <template v-slot:left>
      <ControlButton
        @click="back()"
        :icon="require('@/assets/back.png')"
        title="Voltar"
        enabled
      />
    </template>
    <template v-slot:center>
      <ControlButton
        @click="showUserForm = true"
        :icon="require('@/assets/add.png')"
        title="Adicionar"
        enabled
      />
    </template>
  </Footer>
  <FeedbackModal
    v-if="message.show"
    :message="message"
    @confirm="logout"
    @deny="message.show = false"
  />
  <UserForm
    :selectedUser="selectedUser"
    v-if="showUserForm"
    @cancel="cancelUserEdit()"
  />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
import FeedbackModal from "@/components/FeedbackModal.vue";
import {
  defineComponent,
  inject,
  onMounted,
  ref,
  watchEffect,
  getCurrentInstance,
} from "vue";
import ControlButton from "@/components/ControlButton.vue";
import Builder from "@/components/Builder.vue";
import { mapGetters, mapActions } from "vuex";
import { useStore } from "vuex";
import TextField from "@/components/TextField.vue";

import UserForm from "@/customComponents/UserForm.vue";

import { listUser } from "@/RequestFactories/User";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
    ControlButton,
    FeedbackModal,
    Builder,
    TextField,
    UserForm,
  },
  setup() {
    const selectedUser = ref();

    const buildData = ref({
      type: "table",
      columns: ["Nome", "E-mail"],
      rows: [],
    });

    const userName = ref("");

    const searchUser = async (userName = "") => {
      const response = await listUser(userName);
      const buildprint = response.data.buildprint;
      if (buildprint) {
        buildData.value = buildprint;
      }
    };

    const actions = mapActions(["back", "changePage"]);
    const message = ref({
      type: "confirm",
      text: "Deseja realmente excluir o produto?",
      show: false,
    });
    const showUserForm = ref(false);

    onMounted(async () => {
      const response = await listUser();
      if (response.data.buildprint) {
        buildData.value = response.data.buildprint;
      }
    });

    watchEffect(async () => {
      const product = userName.value;
      searchUser(product);
    });

    const emitter: any = inject("emitter");

    // editar usuário
    emitter.on("editUser", (data: any) => {
      if (data) {
        selectedUser.value = data.data;
        showUserForm.value = true;
      }
    });

    const cancelUserEdit = () => {
      selectedUser.value = {};
      showUserForm.value = false;
      searchUser();
    };

    return {
      ...actions,
      message,
      buildData,
      showUserForm,
      userName,
      selectedUser,
      cancelUserEdit,
    };
  },
});
</script>

<!-- Add 
Header"scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-button {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
}
</style>
