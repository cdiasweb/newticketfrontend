<template>
  <div class="container-controls">
    <ControlButton
      title="Excluir"
      :enabled="enableDelete"
      :icon="require('@/assets/trash.png')"
      @click="emitDelete"
    />
    <ControlButton
      title="Salvar"
      @click="save"
      :enabled="enableSave"
      :icon="require('@/assets/save.png')"
      :loading="loading"
    />
    <ControlButton
      title="Cancelar"
      @click="cancel"
      :enabled="enableCancel"
      :icon="require('@/assets/cancel.png')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import ControlButton from "@/components/ControlButton.vue";

export default defineComponent({
  name: "ControlFooter",
  props: {
    enableDelete: {
      Type: Boolean,
      default: false,
    },
    enableSave: {
      Type: Boolean,
      default: false,
    },
    enableCancel: {
      Type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ControlButton,
  },
  emits: ["cancel", "save", "delete"],
  setup(props, { emit }) {
    const cancel = () => {
      emit("cancel");
    };

    const save = () => {
      emit("save");
    };

    const emitDelete = () => {
      emit("delete");
    };

    return {
      cancel,
      save,
      emitDelete
    }
  },
});
</script>
<style lang="scss" scoped>
.container-controls {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-around;
  width: 100%;
}
</style>
