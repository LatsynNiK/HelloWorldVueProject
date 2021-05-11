import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        products: {}
    },
    getters: {
        REVIEWS: (state) => (productId) => {
            return state.products[productId] ?? []
        }
    },
    mutations: {
        ADD_REVIEW: (state, submitRequest ) => {
            var reviewList = state.products[submitRequest.productId];
            if (!state.products[submitRequest.productId]) {
                state.products[submitRequest.productId] = []
            }
            state.products[submitRequest.productId].push(submitRequest.submittedReview)
        },
    },
    actions: {
        SUBMIT_REVIEW: (context, submitRequest) => {
            context.commit('ADD_REVIEW', submitRequest)
        }
    },
});

export default store;