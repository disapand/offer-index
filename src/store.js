import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'null',
    username: '',
    isCollapse: false
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getUserName: state => {
      return state.username
    },
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = localStorage.getItem('token')
    },
    setUserName (state, username) {
      state.username = username
    },
    setCollapse (state, status) {
      state.isCollapse = status
    }
  },
  actions: {
    logout ({ commit }) {
      commit('setToken', 'null')
      commit('setUserName', '')
    }
  }
})
