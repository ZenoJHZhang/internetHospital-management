import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    user
  },
  getters
})

export default store
