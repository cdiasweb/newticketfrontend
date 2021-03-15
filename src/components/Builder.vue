<template>
  <TableBuilder v-if="buildprint.type == 'table'" :tableData="buildprint"/>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";
import TableBuilder from "@/components/TableBuilder.vue";

export default defineComponent({
  props: {
    buildprint: {
      type: Object,
    },
  },
  components: {
    TableBuilder
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
  background-color: #ac894fff;
  padding: 0.5rem;
  color: white;
  border-radius: 0.2rem;
  cursor: pointer;
}

.red-button {
  background-color: #f75151;
}

.green-button {
  background-color: #4fb54f;
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
