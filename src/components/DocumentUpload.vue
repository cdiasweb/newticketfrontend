<template>
  <div
    class="container-document-upload"
    :style="grow ? 'grid-column: 1 / -1' : ''"
  >
    <div class="label-container">
      {{ label }}
      <span>{{ required ? "*" : "" }}</span>
      <span class="validation-message">{{
        errors[0] ? ` - ${errors.join(" e ")}` : ""
      }}</span>
    </div>
    <div class="container-document">
      <div class="add">
        <input
          class="input-file"
          type="file"
          multiple
          accept="*"
          @change="processFiles"
        />
        <div style="position: absolute">Adicionar</div>
      </div>

      <div
        class="image"
        v-for="image in images"
        :key="image.key"
        :style="{ 'background-image': `url(${image.imagePreview.image})` }"
      >
        <div class="delete-button" @click="excluir(image)">Excluir</div>
      </div>
    </div>
  </div>
  <FeedbackModal
    @confirm="deleteImage"
    @deny="message.show = false"
    @close="message.show = false"
    :message="message"
    v-if="message.show"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, Ref, watchEffect, reactive } from "vue";
import useInputValidator from "@/features/useInputValidator.ts";
import { generateKey } from "@/util/customFuctions.ts";
import { imageUploadPreview } from "@/types/models.ts";
import FeedbackModal from "./FeedbackModal.vue";
import { deleteImageCompany } from "@/RequestFactories/Company";

export default defineComponent({
  components: { FeedbackModal },
  props: {
    initialImages: {
      type: Array,
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    validators: {
      type: Array,
      default: () => {
        return [];
      },
    },
    error: {
      type: String,
      default: "",
    },
    grow: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:error-field",
    "update:modelValue",
    "validation",
    "selected-files",
    "error",
  ],
  setup(props, { emit }) {
    const images: any = ref([]);

    const errors = ref([""]);

    const message = reactive({
      title: "",
      text: "",
      type: "",
      show: false,
    });

    function showMessage(title: string, text: string, type: string) {
      message.show = true;
      message.title = title;
      message.text = text;
      message.type = type;
    }

    let currentImage = 0;
    const readNext = (files: any, reader: any) => {
      if (files.value.length > 0) {
        const filesPersistent = { ...files.value };
        const image: Blob = files.value[currentImage];
        if (typeof image == "object") {
          reader.readAsDataURL(image);
        }
        currentImage++;
        if (currentImage == files.value.length) {
          emit("selected-files", images);
          currentImage = 0;
          files.value = [];
        }
      }
    };

    const processFiles = async (event: any) => {
      try {
        const files = ref(event.target.files);
        console.log(files.value);
        // exibe prévia
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64: string = e.target.result;
          console.log(e.target.result);
          let twoEqual = false;
          if(base64.match(/\=\=/)) {
            twoEqual = true;
          }

          const n = base64.length;
          const y = twoEqual ? 2 : 1;
          const fileZise = (((n * (3/4)) - y) / 1e+6);
          console.log("Size of file: " + fileZise);

          if(fileZise > 8) {
            showMessage("Envio de documentos", "Um documento selecionado possui mais que 8MB, compacte o arquivo.", "alert");
            return;
          }

          const key: string = generateKey();
          const len = images.value.length;
          console.log(files.value);
          //console.log(files.value[len-1].name);
          const imagePreview: imageUploadPreview = {
            imagePreview: {
              image: base64,
              idimage: -1, 
            },
            key: generateKey(),
          };

          images.value.push(imagePreview);
          readNext(files, reader);
        };

        //inicia
        readNext(files, reader);
      } catch (e) {
        console.error("Erro ao selecionar documentos: ", e);
        emit("error", "Erro ao selecionar documentos: " + e.message);
      }
    };

    watchEffect(async () => {
      if (props.initialImages && props.initialImages.length > 0) {
        let i: any = 0;
        for (i in props.initialImages) {
          const image: any = props.initialImages[i];
          image.key = generateKey();
          const base64: string = image.image;

          image.imagePreview = { image: "", ...image };
          image.imagePreview.image = base64;
          images.value.push(image);
        }
      }
    });

    

    let selectedImage: imageUploadPreview = {
      imagePreview: {
        idimage: -1,
        image: "",
      },
      key: "",
    };
    const excluir = (image: imageUploadPreview): void => {
      if (image.imagePreview.idimage != -1) {
        // confirmar e apagar do banco de dados
        showMessage(
          "Excluir documento",
          "Deseja realmente excluir o documento?",
          "confirm"
        );
        selectedImage = image;
        return;
      }

      // remover do preview
      for (const i in images.value) {
        const imageInList: imageUploadPreview = images.value[i];
        if (imageInList.key == image.key) {
          images.value.splice(i, 1);
        }
      }
    };

    const deleteImage = async () => {
      const response = await deleteImageCompany(
        selectedImage.imagePreview.idimage
      );

      if (response.error) {
        showMessage("Deletar imagem", response.message, "error");
        return;
      }

      showMessage("Deletar imagem", response.message, "success");

      // remove imagem do preview
      for (const i in images.value) {
        const imageInList: imageUploadPreview = images.value[i];
        if (imageInList.key == selectedImage.key) {
          images.value.splice(i, 1);
        }
      }

      selectedImage = {
        imagePreview: {
          idimage: -1,
          image: "",
        },
        key: "",
      };
    };

    return {
      images,
      errors,
      processFiles,
      excluir,
      message,
      deleteImage,
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-document-upload {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  overflow-x: auto;
}

.text-area {
  background-color: white;
  border: none;
  min-height: 8rem;
  border-radius: 0.2rem;
  padding: 0.5rem;

  &:focus {
    border-color: blue;
  }
}

.label-container {
  font-size: 1rem;
  text-align: left;
  margin: 0.1rem;
}

.validation-message {
  color: red;
}

.container-document {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: flex-end;
  background-color: white;
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  justify-content: space-around;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60px 60px;
}

.add {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 12px;
  justify-content: space-around;
  border: solid 1px #e2e2e2;
}

.delete-button {
  background-color: red;
  color: white;
  width: 100%;
  cursor: pointer;
  padding: 2px;
}

.input-file {
  opacity: 0;
  float: left;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
}
</style>
