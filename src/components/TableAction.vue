<template>
  <div
    @click="sendEvent()"
    :class="actionData.icon"
    v-if="actionData.type == 'handler'"
  ></div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onUnmounted,
  onUpdated,
  toRefs,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  props: {
    actionData: {
      type: Object,
      default: () => {
        return {
          type: "handler",
          icon: "",
          event: "",
          data: "",
        };
      },
    },
  },
  setup(props, { emit }) {
    const internalInstance = getCurrentInstance();
    const emitter: any = inject("emitter");
    
    const sendEvent = () => {
      emitter.emit(props.actionData.event, props.actionData);
    };

    return {
      emit,
      sendEvent
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.edit {
  background-image: url("../assets/edit.png");
  background-position: center;
  background-repeat: no-repeat;
  width: 1.5rem;
  height: 1.5rem;
  background-size: 1rem;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
}
</style>
