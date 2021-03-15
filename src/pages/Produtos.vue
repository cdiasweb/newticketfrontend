<template>
  <Header />
  <Content>
    <TextField v-model="productName" label="Pesquisar produtos"></TextField>
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
        @click="showProductForm = true"
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


import { listCompany } from "@/RequestFactories/Company";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
    ControlButton,
    FeedbackModal,
    Builder,
    TextField
  },
  setup() {
    const selectedProduct = ref();

    const buildData = ref({
      type: "table",
      columns: ["Nome", "Marca", "Modelo", "Cor", "Estoque", "Valor"],
      rows: [],
    });

    const productName = ref("");

    const listProducts = async (search: string) => {
      const response = await listCompany(search);
      return response;
    };

    const searchProducts = async (productName = "") => {
      const response = await listCompany(productName);
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
    const showProductForm = ref(false);

    onMounted(async () => {
      const response = await listCompany();
      if (response.data.buildprint) {
        buildData.value = response.data.buildprint;
      }
    });

    watchEffect(async () => {
      const product = productName.value;
      searchProducts(product);
    });

    const emitter: any = inject("emitter");

    // editar produto
    emitter.on("editProduct", (data: any) => {
      console.log(data.data);
      if (data) {
        selectedProduct.value = data;
        showProductForm.value = true;
      }
    });

    const cancelProductEdit = () => {
      selectedProduct.value = {};
      showProductForm.value = false;
      searchProducts();
    };

    return {
      ...actions,
      message,
      buildData,
      showProductForm,
      productName,
      selectedProduct,
      cancelProductEdit,
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
