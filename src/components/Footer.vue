<template>
  <div class="footer">
    <div class="container-content-footer">
      <div class="container-slots">
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: "Footer",
  setup(props) {
    const store = inject("store");
    const user = localStorage.getItem("user");
    const userName = ref("");
    if (user) {
      userName.value = JSON.parse(user).userName;
    }

    return {
      userName,
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer {
  background-color: #efefef;
  min-width: 100%;
}
.container-content-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
  padding: 1rem;
  border-bottom: solid 1px whitesmoke;
}
.container-slots {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-around;
  width: 100%;
}
</style>
