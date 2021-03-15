<template>
  <div class="content">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: "Content",
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  display: block;
  text-align: center;
  padding-left: 2rem;
  padding-right: 2rem;
  padding: 1rem;
  overflow: auto;
  width: 90%;
  height: 100%;
}
</style>
