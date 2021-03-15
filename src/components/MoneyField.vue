<template>
  <div class="container-text-field" :style="grow ? 'grid-column: 1 / -1' : ''">
    <div class="label-container">
      {{ label }}
      <span>{{ required ? "*" : "" }}</span>
      <span class="validation-message">{{
        errors[0] ? ` - ${errors.join(" e ")}` : ""
      }}</span>
    </div>
    <input
      v-model="formattedValue"
      autocomplete="off"
      name="name"
      class="text-field"
      :type="password ? 'password' : 'text'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, watchEffect, ref, Ref } from "vue";
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
      type: String,
      default: "0",
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
    "modelValue",
    "validation",
    "input",
    "keyup",
    "update:value",
  ],
  setup(props, { emit }) {
    

    const formattedValue = ref(""); 

    const errors: Array<string> = [];

    watchEffect(() => {
      formattedValue.value = format(props.value);
      emit("update:value", formattedValue);
    })

    return {
      formattedValue,
      errors
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-text-field {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.text-field {
  background-color: white;
  border: none;
  min-height: 2rem;
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
