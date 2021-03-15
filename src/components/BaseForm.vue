<template>
  <div class="form" @keyup="(event) => checkKey(event)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onUpdated,
  reactive,
  render,
  renderSlot,
  toRefs,
  watch,
  ref,
  onBeforeUpdate,
} from "vue";

export default defineComponent({
  name: "BaseForm",
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  emits: ["validation", "submit"],
  setup(_, { emit, slots }) {
    const invalids: any = ref([]);
    const showErrors: any = ref(false);
    const checkInputs = () => {
      invalids.value = [];
      if (slots.default) {
        slots.default().filter((child: any) => {
          //console.log(child.props.required, child);
          if (child.props.required && !child.props.modelValue) {
            invalids.value.push(child.props.label);
            showErrors.value = true;
          }
        });
      }
      if (invalids.value.length > 0) {
        emit("validation", {
          valid: false,
          components: invalids.value,
        });
      } else {
        emit("validation", {
          valid: true,
        });
      }
    };

    function checkKey(event: any) {
      const keyCode = event.keyCode;
      if(keyCode == 13) {
        // enter pressed
        emit("submit");
      }
    }

    onBeforeUpdate(() => {
      checkInputs();
    });

    onMounted(() => {
      checkInputs();
    });

    return {
      invalids,
      showErrors,
      checkKey
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: auto auto;
}


</style>
