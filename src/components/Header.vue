<template>
  <div style="width: 100%">
    <div class="header">
      <div class="container-content-header">
        {{ userName }}
        <img src="@/assets/logo_new.png" height="30" />
        <div class="container-controls">
          <Button @click="handleClickNewCompany()" title="Cadastrar minha empresa"/>
          <a href="">Novo evento</a>
          <a @click="handleClickLogin()" href="">Acessar</a>
        </div>
      </div>
    </div>
    <div class="current-page">{{ getCurrentPage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { mapGetters } from "vuex";
import Button from "@/components/Button.vue";

export default defineComponent({
  components: {
    Button,
  },  
  name: "Header",
  computed: {
    ...mapGetters(["getCurrentPage"]),
  },

  emits: ["newcompany", "login"],
  setup(props, { emit }) {

    const store = inject("store");
    const user = localStorage.getItem("user");
    const userName = ref("");
    if (user) {
      userName.value = JSON.parse(user).userName;
    }

    const handleClickNewCompany = () => {
      emit("newcompany");
    }

    const handleClickLogin = () => {
      emit("login");
    }

    return {
      userName,
      handleClickNewCompany,
      handleClickLogin
    };
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  background-color: white;
}

.container-controls {
  display: flex;
}

.container-content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
  padding: 1rem;
  border-bottom: solid 1px #f27b2bff;
}
.current-page {
  text-align: left;
  padding-top: 10px;
  margin-left: 5%;
  background-color: whitesmoke;
  font-weight: bold;
  font-size: 1.5rem;
  color: gray;
}
</style>
