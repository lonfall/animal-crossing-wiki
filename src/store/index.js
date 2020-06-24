import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 要设置的全局访问的state对象
 */
const state = {
    user: null
}

const getters = {
    getUser(state) {
        return state.user
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations
})

export default store
