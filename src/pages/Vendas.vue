<template>
  <Header />
  <Content>
    <TextField v-model="productName" label="Pesquisar vendas"></TextField>
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
import {listSales} from "@/RequestFactories/Sales";


export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
    ControlButton,
    FeedbackModal,
    Builder,
    TextField,
  },
  setup() {
    const selectedCategory = ref();

    const buildData = ref({
      type: "table",
      columns: ["Data", "Produto", "Vendedor", "Quantidade", "Total venda"],
      rows: [],
    });

    const productName = ref("");

    const listaVendas = async (search: string) => {
      const response = await listSales(search);
      return response;
    };

    const searchSells = async (productName = "") => {
      const response = await listaVendas(productName);
      const buildprint = response.data.buildprint;
      if (buildprint) {
        buildData.value = response.data.buildprint;
      }
    };

    const actions = mapActions(["back", "changePage"]);
    const message = ref({
      type: "confirm",
      text: "Deseja realmente excluir o produto?",
      show: false,
    });
    const showCategoryForm = ref(false);

    onMounted(async () => {
      const response = await listSales();
      if (response.data.buildprint) {
        buildData.value = response.data.buildprint;
      }
    });

    watchEffect(async () => {
      const category = productName.value;
      searchSells(category);
    });

    const emitter: any = inject("emitter");

    
    

    return {
      ...actions,
      message,
      buildData,
      showCategoryForm,
      productName,
      selectedCategory,
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
