<template>
  <div class="modal-overlay"></div>
  <div class="container-modal" :class="{form: isForm, 'gradient-border': loading}">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";

export default defineComponent({
  name: "BaseModal",
  props: {
    isForm: {
      Type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal-overlay {
  background-color: #00000073;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  align-items: center;
}
.container-modal {
  background-color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 20rem;
  min-height: 10rem;
}

.form {
  background-color: white;
  //min-width: 60%;
  min-height: 60%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>
