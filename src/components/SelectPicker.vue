<template>
  <div
    class="container-select-picker"
    :style="grow ? 'grid-column: 1 / -1' : ''"
  >
    <div class="label-container">
      {{ label }}
      <span>{{ required ? "*" : "" }}</span>
      <span class="validation-message">{{
        errors[0] ? ` - ${errors.join(" e ")}` : ""
      }}</span>
    </div>
    <select class="select-picker" v-model="selected">
      <option disabled value="">Escolha um item</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  watchEffect,
  ref,
  watch,
  onMounted,
} from "vue";
import useInputValidator from "@/features/useInputValidator.ts";
import { isEmail } from "@/util/validators.ts";
import { prop } from "vue-class-component";

export default defineComponent({
  props: {
    options: {
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
    value: {
      type: String,
      default: "",
    },
    validators: {
      type: Array,
      default: () => {
        return [];
      },
    },
    grow: {
      type: Boolean,
      Default: true,
    },
    error: {
      type: String,
      default: "",
    },
  },
  emits: ["update:error-field", "update:modelValue", "validation"],
  setup(props, { emit }) {
    const selected = ref();

    const errors = [""];

    watchEffect(() => {
      if (props.value && !selected.value) {
        selected.value = props.value;
      }
      if (props.required && selected.value) {
        emit("update:modelValue", selected.value);
        //errors[0] = "";
      } else {
        emit("update:modelValue", "");
        //errors[0] = "Selecione";
      }
    });

    function getErrors() {
      if (errors[0]) {
        return errors.join(" e ");
      }
      return "";
    }

    return {
      selected,
      errors,
      getErrors,
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-select-picker {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.select-picker {
  background-color: #ececec;
  border: none;
  border-radius: 0.2rem;
  padding: 0.3rem;

  &:focus {
    border-color: blue;
  }
}

.label-container {
  font-size: 0.9rem;
  text-align: left;
  margin: 0.1rem;
}

.validation-message {
  color: red;
}
</style>
