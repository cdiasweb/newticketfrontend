<template>
  <div>
    <BaseModal :isForm="true">
      <BaseForm @validation="checkValid">
        <TextField
          label="Nome da empresa"
          v-model="editCompany.name"
          :value="editCompany.name"
          :validators="[checkLength]"
          :required="true"
          :grow="true"
        ></TextField>
        <TextField
          label="Endereço"
          v-model="editCompany.address"
          :value="editCompany.address"
          :validators="[checkLength]"
          :required="true"
          :grow="true"
        ></TextField>
        <TextField
          v-model="editCustomer.name"
          :value="editCustomer.name"
          label="Nome do representante"
          :required="true"
          :grow="true"
        ></TextField>
        <TextField
          label="E-mail"
          v-model="editUser.email"
          :value="editUser.email"
          :validators="[checkEmail]"
          :required="true"
          :grow="true"
        ></TextField>
        <TextField
          v-model="editUser.password"
          :value="editUser.password"
          label="Senha"
          :required="true"
          password
          :validators="[checkLengthPassword]"
          :grow="true"
        ></TextField>
        <TextField
          v-model="password_confirm"
          :value="password_confirm"
          label="Confirmar senha"
          :required="true"
          password
          :validators="[checkLengthPassword]"
          :grow="true"
        ></TextField>
        <SelectPicker
          :grow="true"
          :options="companyFields"
          v-model="editCompany.field"
          label="Selecione um ramo"
          :required="true"
        />

        <ImageUpload
          @selected-files="(files) => (editCompany.companyImages = files)"
          :grow="true"
          label="Imagens"
          :initialImages="companyImages"
          :required="false"
        />
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
import ControlFooter from "@/customComponents/ControlFooter.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import SelectPicker from "@/components/SelectPicker.vue";

import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  watchEffect,
  Ref,
  watch,
  onBeforeMount,
} from "vue";
import { minLength, isEmail } from "@/util/validators";
import { deleteCompany, saveCompany } from "@/RequestFactories/Company";
import FeedbackModal from "@/components/FeedbackModal.vue";
import { company, companyImage, customer, user } from "@/types/models";
import { unformat } from "@/util/formatValue";
import { listCategory } from "@/RequestFactories/Category";

export default defineComponent({
  emits: ["cancel"],
  name: "CompanyForm",
  props: {
    selected: Object,
  },
  components: {
    BaseForm,
    BaseModal,
    TextField,
    ControlFooter,
    FeedbackModal,
    ImageUpload,
    SelectPicker,
  },
  setup(props, { emit }) {
    const password_confirm = ref("");

    const companyImages = ref([]);

    const companyDocuments = ref([]);

    const loading = ref(false);

    const enableDelete = ref(false);

    const companyFields = [
      {
        name: "Teatro",
        value: "theater",
      },
      {
        name: "Cinema",
        value: "cinema",
      },
      {
        name: "Festival",
        value: "cinema",
      },
      {
        name: "Turístico",
        value: "cinema",
      },
      {
        name: "Outro",
        value: "other",
      },
    ];

    const editCompany: Ref<company> = ref({
      name: "",
      address: "",
      field: "",
    });

    const editCustomer: Ref<customer> = ref({
      name: "",
    });

    const editUser: Ref<user> = ref({
      name: "",
      email: "",
      password: "",
      type: 0,
    });

    const message = reactive({
      title: "",
      text: "",
      type: "",
      show: false,
    });

    const enableSubmit = ref(false);

    // validators
    const checkLength = minLength(3);
    const checkEmail = isEmail();
    const checkLengthPassword = minLength(10);

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

      editUser.value.name = editCustomer.value.name;

      const response = await saveCompany({
        company: { ...editCompany.value },
        customer: { ...editCustomer.value },
        user: { ...editUser.value },
      });
      console.log(response);
      if (response.error) {
        loading.value = false;
        console.log(response);
        showMessage("Erro ao gravar empresa", response.message, "error");
        return;
      }
      loading.value = false;
      showMessage("Cadastro de empresa", response.message, "success");
    };

    watchEffect(() => {
      const selected = props.selected;
      if (selected && selected.data) {
        companyImages.value = selected.data.product_images;
        editCompany.value = selected.data;
        if (editCompany.value.id != -1) {
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
      showMessage(
        "Excluir produto",
        "Deseja realmente excluir a empresa?",
        "confirm"
      );
    };

    const requestDelete = async () => {
      loading.value = true;
      if (editCompany.value.id != -1) {
        const response = await deleteCompany(editCompany.value);
        if (response.error) {
          loading.value = false;
          showMessage("Erro ao excluir produto", response.message, "error");
          return;
        }
        loading.value = false;
        showMessage("Excluir produto", response.message, "success");
      }
    };

    const selectedFiles = ref([]);

    // onMounted(() => {});

    return {
      emit,
      checkLength,
      checkValid,
      enableSubmit,
      save,
      message,
      editCompany,
      enableDelete,
      closeForm,
      requestDelete,
      showConfirmDelete,
      selectedFiles,
      companyImages,
      loading,
      checkEmail,
      checkLengthPassword,
      companyFields,
      editCustomer,
      editUser,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
