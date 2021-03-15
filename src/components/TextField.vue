<template>
  <div class="container-text-field" :style="grow ? 'grid-column: 1 / -1' : ''">
    <div class="label-container">
      {{ label }}
      <span>{{ required ? "*" : "(Opcional) " }}</span>
      <span class="validation-message">{{
        errors[0] ? ` - ${errors.join(" e ")}` : ""
      }}</span>
    </div>
    <input
      v-model="input"
      autocomplete="off"
      name="name"
      class="text-field"
      :type="password ? 'password' : 'text'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, watchEffect } from "vue";
import useInputValidator from "@/features/useInputValidator.ts";
import { isEmail } from "@/util/validators.ts";
import { prop } from "vue-class-component";
import { formatValue } from "@/util/customFuctions";
import { format } from "@/util/formatValue";

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
      type: [Number, String],
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
    currency: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:error-field",
    "update:modelValue",
    "validation",
    "input",
    "change",
    "update:value",
  ],
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

    // watchEffect(() => {});

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
.container-text-field {
  display: flex;
  flex-direction: column;
  margin: 0.2rem;
}

.text-field {
  background-color: #ececec;
  border: none;
  border-radius: 0.2rem;
  padding: 0.2rem;

  &:focus {
    border-color: blue;
  }
}

.label-container {
  font-size: 0.9rem;
  text-align: left;
  margin: 0.2rem;
}

.validation-message {
  font-size: 0.6rem;
  color: red;
}
</style>
