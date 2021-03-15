<template>
  <div>
    <BaseModal :isForm="true">
      <BaseForm @validation="checkValid">
        <TextField
          label="Categoria"
          v-model="editCategory.name"
          :value="editCategory.name"
          :validators="[checkLength]"
          :required="true"
          :grow="true"
        ></TextField>
        <TextArea
          v-model="editCategory.description"
          :value="editCategory.description"
          label="Descrição"
          :grow="true"
        ></TextArea>
      </BaseForm>
      <ControlFooter
        :enableDelete="enableDelete"
        :enableCancel="true"
        :enableSave="enableSubmit"
        @cancel="closeForm()"
        @delete="showConfirmDelete()"
        @save="save()"
        :loading="loading"
      />
    </BaseModal>
  </div>
  <FeedbackModal
    @close="message.show = false"
    v-if="message.show"
    :message="message"
    @confirm="requestDelete"
  />
</template>

<script lang="ts">
import BaseForm from "@/components/BaseForm.vue";
import BaseModal from "@/components/BaseModal.vue";
import TextField from "@/components/TextField.vue";
import TextArea from "@/components/TextArea.vue";
import ControlFooter from "@/customComponents/ControlFooter.vue";
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  watchEffect,
  Ref,
} from "vue";
import { minLength } from "@/util/validators.ts";
import {
  saveCategory,
  listCategory,
  deleteCategory,
} from "@/RequestFactories/Category.ts";
import FeedbackModal from "@/components/FeedbackModal.vue";
import { category } from "@/types/models";

export default defineComponent({
  emits: ["cancel"],
  name: "CategoryForm",
  props: {
    selectedCategory: Object,
  },
  components: {
    BaseForm,
    BaseModal,
    TextField,
    TextArea,
    ControlFooter,
    FeedbackModal,
  },
  setup(props, { emit }) {

    const loading = ref(false);

    const enableDelete = ref(false);

    const editCategory: Ref<category> = ref({
      idproduct_category: -1,
      name: "",
      description: "",
      status: "",
    });

    const message = reactive({
      title: "",
      text: "",
      type: "",
      show: false,
    });

    const enableSubmit = ref(false);

    const checkLength = minLength(3);

    const checkValid = (validation: any) => {
      enableSubmit.value = validation.valid;
    };

    function showMessage(title: string, text: string, type: string) {
      message.show = true;
      message.title = title;
      message.text = text;
      message.type = type;
    }

    const save = async () => {
      loading.value = true;
      const response = await saveCategory({
        ...editCategory.value,
      });
      if (response.error) {
        showMessage("Erro ao gravar categoria", response.message, "error");
        loading.value = false;
        return;
      }
      loading.value = false;
      showMessage("Cadastro de categoria", response.message, "success");
    };

    watchEffect(() => {
      const selectedCategory = props.selectedCategory;
      if (selectedCategory && selectedCategory.data) {
        editCategory.value = selectedCategory.data;
        if (editCategory.value.idproduct_category != -1) {
          enableDelete.value = true;
        } else {
          enableDelete.value = false;
        }
      }
    });

    const closeForm = () => {
      emit("cancel");
    };

    const showConfirmDelete = () => {
      showMessage("Excluir categoria", "Deseja realmente excluir a categoria?","confirm");
    }

    const requestDelete = async () => {
      loading.value = true;
      if (editCategory.value.idproduct_category != -1) {
        const response = await deleteCategory(editCategory.value);
        if (response.error) {
          loading.value = false;
          showMessage("Erro ao excluir categoria", response.message, "error");
          return;
        }
        loading.value = false;
        showMessage("Excluir categoria", response.message, "success");
      }
    };

    return {
      emit,
      checkLength,
      checkValid,
      enableSubmit,
      save,
      message,
      editCategory,
      enableDelete,
      closeForm,
      requestDelete,
      showConfirmDelete,
      loading
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
