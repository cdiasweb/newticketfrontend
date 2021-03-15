<template>
  <div
    @click="(e) => handleClick(e)"
    class="container-button"
    :class="{ disabled: !enabled }"
  >
    <div class="button-default">
      <img
        v-if="loading"
        class="rotate"
        src="@/assets/loading_color_logo.png"
        height="30"
        width="25"
      />
      <div v-if="!loading">
        <img v-if="icon" class="button-icon" :src="icon" />
        <div class="title" v-if="title">{{ title }}</div>
      </div>
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
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = (e: any) => {
      e.stopImmediatePropagation();
      if (props.enabled) {
        emit("click");
      } else {
        e.preventDefault();
      }
    };
    return {
      handleClick,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container-button {
  margin: 0.4rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 5px;
  user-select: none;
  -moz-user-select: none;
  border: solid 1px #e2e2e2;
  &:active {
    background-color: gray;
  }
}

.button-default {
  padding: 0.1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  width: 50px;
  height: 38px;
}

.button-icon {
  height: 1rem;
  padding: 0.1rem;
}

.title {
  font-size: 0.8rem;
}

.disabled {
  background-color: #a9a9a9;
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
