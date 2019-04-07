import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') === 'null' ? 'null' : localStorage.getItem('token'),
    username: localStorage.getItem('username') === 'null' ? 'null' : localStorage.getItem('username'),
    isCollapse: false
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getUserName: state => {
      return state.username
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUserName (state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    setCollapse (state, status) {
      state.isCollapse = status
    }
  },
  actions: {
    logout ({ commit }) {
      commit('setToken', 'null')
      commit('setUserName', 'null')
    }
  }
})
