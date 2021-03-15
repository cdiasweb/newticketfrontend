import { createWebHistory, createRouter } from "vue-router";
import Principal from "@/pages/Principal.vue";
import Categorias from "@/pages/Categorias.vue";
import Produtos from "@/pages/Produtos.vue";
import Usuarios from "@/pages/Usuarios.vue";
import Vendas from "@/pages/Vendas.vue";
import Login from "@/pages/Login.vue";
import Marketing from "@/pages/Marketing.vue";

const routes = [
  {
    path: "/",
    name: "Marketing",
    component: Marketing,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
      description: "Login",
    }
  },
  {
    path: "/principal",
    name: "Principal",
    component: Principal,
    meta: {
      requiresAuth: true,
      description: "Página inicial",
    },
  },
  {
    path: "/categorias",
    name: "Categorias",
    component: Categorias,
    meta: {
      requiresAuth: true,
      description: "Categorias de produto",
    },
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
    meta: {
      requiresAuth: true,
      description: "Produtos",
    },
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
    meta: {
      requiresAuth: true,
      description: "Usuarios",
    },
  },
  {
    path: "/vendas",
    name: "Vendas",
    component: Vendas,
    meta: {
      requiresAuth: true,
      description: "Vendas",
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      const user = localStorage.getItem("user");
      if ( user == null || JSON.parse(user).token == null) {
          next({
              path: "/login",
              params: { nextUrl: to.fullPath }
          });
      } else {
        next();
      }
  } else {
    next();
  }
})

export default router;