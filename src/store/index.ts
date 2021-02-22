import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: 0,
        drawerToggle: false
    },
    mutations: {
        beginLoading(state) {
            state.loading += 1;
        },
        endLoading(state) {
            state.loading -= 1;
        }
    },
    actions: {
        beginLoading(context) {
            context.commit("beginLoading");
        },
        endLoading(context) {
            context.commit("endLoading");
        }
    },
    modules: {},
    getters: {
        loading: state => state.loading
    },
    
});
