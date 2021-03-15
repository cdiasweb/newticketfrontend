<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: whitesmoke;
  align-items: center;
}

body {
  margin: 0 auto;
  padding: 0;
  text-align: center;
  align-items: center;
}

a:link {
  color: #f27b2b;
  text-decoration: none;
  padding: 0.8rem;
  color: #f37f31;
  border-radius: 0.2rem;
  cursor: pointer;
  text-shadow: 1px 1px 1px white;
}

/* visited link */
a:visited {
  color: #f27b2b;
}

/* mouse over link */
a:hover {
  color: #f27b2b;
}

/* selected link */
a:active {
  color: #f27b2b;
}

main-content {
  display: flex;
}
</style>
