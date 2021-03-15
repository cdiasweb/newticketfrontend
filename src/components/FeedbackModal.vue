<template>
  <div @click="close" class="container-modal">
    <BaseModal>
      <div>
        <div>
          <img
            class="message-icon"
            v-if="message.type == 'success'"
            src="@/assets/success.png"
            height="50"
          />
          <img
            class="message-icon"
            v-if="message.type == 'error'"
            src="@/assets/error.png"
            height="50"
          />
          <img
            class="message-icon"
            v-if="message.type == 'alert'"
            src="@/assets/alert.png"
            height="50"
          />
          <img
            class="message-icon"
            v-if="message.type == 'confirm'"
            src="@/assets/alert.png"
            height="50"
          />
        </div>
        <div class="message-title">{{ message.title }}</div>
        <div class="message-text">{{ message.text }}</div>
        <div v-if="message.type == 'success'">
          <Button
            @click="close"
            title="Fechar"
          />
        </div>
        <div v-if="message.type == 'error'">
          <Button
            @click="close"
            title="Fechar"
          />
        </div>
        <div v-if="message.type == 'confirm'">
          <div class="container-confirm">
            <Button
              @click="confirm"
              :buttonClass="{ 'red-button': true }"
              title="SIM"
            />
            <Button
              @click="deny"
              :buttonClass="{ 'green-button': true }"
              title="NÃO"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "FeedbackModal",
  props: {
    message: {
      type: Object,
      default: () => {
        return {
          type: "success",
          text: "",
          title: "",
          show: false,
        };
      },
    },
  },
  components: {
    BaseModal,
    Button,
  },
  setup(props, { emit }) {
    function close(): any {
      emit("close");
    }

    function confirm(): any {
      emit("confirm");
    }

    function deny(): any {
      emit("deny");
    }

    return {
      close,
      confirm,
      deny,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.message-icon {
  padding: 0.5rem;
}
.message-title {
  font-weight: bold;
}

.message-text {
  margin: 1rem;
}
.container-confirm {
  display: flex;
}
</style>
