<template>
  <Header />
  <Content>
    <div class="container-button">
      <MenuIconButton
        :icon="require('@/assets/products.png')"
        @click="store.dispatch('changePage', 'produtos');"
        title="Produtos"
      />
      <MenuIconButton :icon="require('@/assets/sells.png')"  @click="store.dispatch('changePage', 'vendas');" title="Vendas" />
      <MenuIconButton
        @click="store.dispatch('changePage', 'categorias');"
        :icon="require('@/assets/categories.png')"
        title="Categorias"
      />
      <MenuIconButton @click="store.dispatch('changePage', 'usuarios');" :icon="require('@/assets/users.png')" title="Usuários" />
    </div>
  </Content>
  <Footer>
    <template v-slot:left>
      <ControlButton
        @click="message.show = true"
        enabled
        :icon="require('@/assets/exit.png')"
        title="Sair"
      />
    </template>
  </Footer>
  <FeedbackModal
    v-if="message.show"
    :message="message"
    @confirm="logout"
    @deny="message.show = false"
  />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
import FeedbackModal from "@/components/FeedbackModal.vue";
import { defineComponent, inject, ref } from "vue";
import MenuIconButton from "@/components/MenuIconButton.vue";
import ControlButton from "@/components/ControlButton.vue";
import { mapGetters, mapActions } from "vuex";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Header,
    Content,
    MenuIconButton,
    Footer,
    ControlButton,
    FeedbackModal,
  },
  setup() {
    const store = useStore();
    const message = ref({
      type: "confirm",
      text: "Deseja realmente sair do sistema?",
      show: false,
    });

    function logout() {
      localStorage.removeItem("user");
      store.dispatch("changePage", "login");
    }

    return {
      message,
      logout,
      store
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
