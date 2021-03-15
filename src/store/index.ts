import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    apiUrl: (process.env.VUE_APP_AMBIENTE == 1) ? "" : "http://127.0.0.1/api",
    currentPage: "Login"
  },
  mutations: {
    changePage(state, to) {
      router.push(to);
      state.currentPage = to;
    },
    back(state) {
      router.go(-1);
      const routePage = router.currentRoute.value.name;
      if(routePage) {
        state.currentPage = routePage.toString();
      }
      
    }
  },
  actions: {
    changePage( context, to ) {
      context.commit("changePage", to);
    },
    back(context) {
      context.commit("back");
    },
  },
  modules: {
  },
  getters: {
    getApiUrl: state => {
      return state.apiUrl
    },
    getCurrentPage: (): string => {
      return router.currentRoute.value.meta.description;
    }
  }
});
