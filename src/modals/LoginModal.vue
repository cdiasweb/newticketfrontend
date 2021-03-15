<template>
  <div class="login-modal-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-modal-container {
  background-color: #ffffff85;
  min-width: 30rem;
  height: 15rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  align-items: center;
}
</style>
