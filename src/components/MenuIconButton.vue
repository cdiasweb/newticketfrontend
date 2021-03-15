<template>
  <div>
    <div class="menu-icon-button">
      <div v-if="title">{{ title }}</div>
      <img class="icon-button" v-if="icon" :src="icon"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";

export default defineComponent({
  name: "MenuIconButton",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menu-icon-button {
  background-color: white;
  margin: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  width: 20rem;
  height: 5rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  font-size: 1.2rem;
  user-select:none;
  -moz-user-select:none;
  &:active {
    background-color: gray;
    color: white;
  }  
}

.icon-button {
  height: 2.5rem;
}
</style>
