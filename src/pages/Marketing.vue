<template>
  <Header @newcompany="showFormNewCompany()" @login="login()"></Header>
  <Content>
    
  </Content>
  <Footer>
  </Footer>
  <FeedbackModal
    v-if="message.show"
    :message="message"
    @confirm="logout"
    @deny="message.show = false"
  />
  <CompanyForm
    :selected="selected"
    v-if="companyFormVisible"
    @cancel="cancelCompanyEdit()"
  />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
import CompanyForm from "@/customComponents/CompanyForm.vue";
import FeedbackModal from "@/components/FeedbackModal.vue";
import { defineComponent, inject, ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
    FeedbackModal,
    CompanyForm
  },
  setup() {
    
    const companyFormVisible = ref(false);

    const store = useStore();
    
    const message = ref({
      type: "confirm",
      text: "Deseja realmente sair do sistema?",
      show: false,
    });

    function login() {
      localStorage.removeItem("user");
      store.dispatch("changePage", "login");
    }

    const showFormNewCompany = () => {
      companyFormVisible.value = true;
    }

    const cancelCompanyEdit = () => {
      companyFormVisible.value = false;
    }

    return {
      message,
      login,
      store,
      showFormNewCompany,
      companyFormVisible,
      cancelCompanyEdit
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
