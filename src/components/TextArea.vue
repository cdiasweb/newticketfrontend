<template>
  <div class="container-text-area" :style="grow ? 'grid-column: 1 / -1' : ''">
    <div class="label-container">
      {{ label }}
      <span>{{ required ? "*" : "" }}</span>
      <span class="validation-message">{{
        errors[0] ? ` - ${errors.join(" e ")}` : ""
      }}</span>
    </div>
    <textarea
      v-model="input"
      autocomplete="off"
      name="name"
      class="text-area"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import useInputValidator from "@/features/useInputValidator.ts";
import { isEmail } from "@/util/validators.ts";

export default defineComponent({
  props: {
    password: {
      type: Boolean,
      default: false,
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
    error: {
      type: String,
      default: "",
    },
    grow: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:error-field", "update:modelValue", "validation"],
  setup(props, { emit }) {
    const { input, errors } = useInputValidator(
      props.value,
      props.validators,
      (value: string, errors: any) => {
        if (!errors.value[0]) {
          emit("update:modelValue", value);
        } else {
          emit("update:modelValue", "");
        }
      }
    );

    function getErrors() {
      if (errors[0]) {
        return errors.join(" e ");
      }
      return "";
    }

    return {
      input,
      errors,
      getErrors,
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-text-area {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
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
</style>
