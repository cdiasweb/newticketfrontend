<template>
  <Header />
  <Content>
    <TextField v-model="categoryName" label="Pesquisar categoria"></TextField>
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
        @click="showCategoryForm = true"
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
  <CategoryForm
    :selectedCategory="selectedCategory"
    v-if="showCategoryForm"
    @cancel="cancelCategoryEdit()"
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

import CategoryForm from "@/customComponents/CategoryForm.vue";

import { listCategory } from "@/RequestFactories/Category";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
    ControlButton,
    FeedbackModal,
    Builder,
    TextField,
    CategoryForm,
  },
  setup() {
    const selectedCategory = ref();

    const buildData = ref({
      type: "table",
      columns: ["Nome", "Descrição"],
      rows: [],
    });

    const categoryName = ref("");

    const listCategories = async (search: string) => {
      const response = await listCategory(search);
      return response;
    };

    const searchCategories = async (categoryName = "") => {
      const response = await listCategories(categoryName);
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
      const response = await listCategory();
      if (response.data.buildprint) {
        buildData.value = response.data.buildprint;
      }
    });

    watchEffect(async () => {
      const category = categoryName.value;
      searchCategories(category);
    });

    const emitter: any = inject("emitter");

    // editar categoria
    emitter.on("editCategory", (data: any) => {
      if (data) {
        showCategoryForm.value = true;
        selectedCategory.value = data;
      }
    });

    const cancelCategoryEdit = () => {
      selectedCategory.value = {};
      showCategoryForm.value = false;
      searchCategories();
    };

    return {
      ...actions,
      message,
      buildData,
      showCategoryForm,
      categoryName,
      selectedCategory,
      cancelCategoryEdit,
    };
  },
});
</script>

<!-- Add 
Header"scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-button {
  display: grid;
  grid-template-rows: auto auto;
  justify-content: space-around;
}
</style>
