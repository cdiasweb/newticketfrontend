<template>
  <div class="container-button">
    <div
      @click="emitClick"
      class="button-default"
      :class="{ disabled: !enabled, ...buttonClass }"
    >
      <img
        v-if="loading"
        class="rotate"
        src="@/assets/loading.png"
        height="30"
        width="30"
      />
      <div v-if="!loading">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const emitClick = () => {
      if (!props.enabled) {
        emit("disclick");
        //emit("click");
      }
    };
    return {
      emitClick,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-button {
  margin: 0.4rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  user-select: none;
  -moz-user-select: none;
}

.label-container {
  font-size: 0.8rem;
  text-align: left;
  margin: 0.1rem;
}

.button-default {
  background-color: #f37f31;
  padding: 0.5rem;
  color: #ffffff;
  border-radius: 0.2rem;
  cursor: pointer;
}

.red-button {
  background-color: #f75151;
}

.green-button {
  background-color: #4fb54f;
}

.blue-button {
  background-color: #4f73b5;
}

.disabled {
  background-color: rgb(170, 170, 170);
}

.rotate {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
