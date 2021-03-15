<template>
  <div>
    <BaseModal :isForm="true">
      <BaseForm @validation="checkValid">
        <TextField
          label="Nome"
          v-model="editUser.name"
          :value="editUser.name"
          :validators="[checkLength]"
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
          password
          :validators="[checkLengthPassword]"
          :required="true"
          :grow="true"
        ></TextField>
        <TextField
          v-model="passwordConfirm"
          :value="passwordConfirm"
          label="Confirmação de senha"
          password
          :validators="[checkLengthPassword]"
          :required="true"
          :grow="true"
        ></TextField>
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
import MoneyField from "@/components/MoneyField.vue";
import SelectPicker from "@/components/SelectPicker.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import ControlFooter from "@/customComponents/ControlFooter.vue";
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
import { minLength, isEmail } from "@/util/validators.ts";
import FeedbackModal from "@/components/FeedbackModal.vue";
import { user } from "@/types/models";
import { deleteUser, saveUser } from "@/RequestFactories/User";

export default defineComponent({
  emits: ["cancel"],
  name: "UserForm",
  props: {
    selectedUser: Object,
  },
  components: {
    BaseForm,
    BaseModal,
    TextField,
    ControlFooter,
    FeedbackModal,
  },
  setup(props, { emit }) {
    const loading = ref(false);

    const passwordConfirm = ref();

    const productImages = ref([]);

    const enableDelete = ref(false);

    const message = reactive({
      title: "",
      text: "",
      type: "",
      show: false,
    });

    const editUser: Ref<user> = ref({
      id: -1,
      name: "",
      email: "",
      password: "",
      email_verified_at: "",
      type: 0,
    })

    const enableSubmit = ref(false);

    const checkLength = minLength(3);
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

    
    const closeForm = () => {
      emit("cancel");
    };

    const showConfirmDelete = () => {
      showMessage(
        "Excluir usuário",
        "Deseja realmente excluir o usuário?",
        "confirm"
      );
    };

    watchEffect(() => {
      if (props.selectedUser) {
        editUser.value = {
          id: props.selectedUser.id,
          name: props.selectedUser.name,
          email: props.selectedUser.email,
          password: "",
          type: 0
        };
        enableDelete.value = true;
      }
    })

   const checkEmail = isEmail();

  const requestDelete = async () => {
    loading.value = true;
      if (editUser.value.id != -1) {
        const response = await deleteUser(editUser.value);
        if (response.error) {
          loading.value = false;
          showMessage("Erro ao excluir usuário", response.message, "error");
          return;
        }
        loading.value = false;
        showMessage("Excluir usuário", response.message, "success");
      }
    };

    const save = async () => {

      if(passwordConfirm.value != editUser.value.password) {
        showMessage("Cadastro de usuário", "A senha e a confirmação de senha devem ser iguais.", "alert");
        return;
      }

      loading.value = true;
      const response = await saveUser({
        ...editUser.value,
      });
      if (response.error) {
        loading.value = false;
        showMessage("Erro ao gravar usuário", response.message, "error");
        return;
      }
      loading.value = false;
      showMessage("Cadastro de usuário", response.message, "success");
    };


    return {
      emit,
      checkLength,
      checkValid,
      enableSubmit,
      message,
      enableDelete,
      closeForm,
      showConfirmDelete,
      editUser,
      checkEmail,
      passwordConfirm,
      requestDelete,
      save,
      checkLengthPassword,
      loading
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
