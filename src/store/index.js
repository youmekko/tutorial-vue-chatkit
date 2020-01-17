import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV ! == 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: [],
    reconnect: false,
    activeRoom: null,
    rooms: [],
    users: [],
    message: [],
    userTyping: null
  },
  mutations,
  actions,
  getters : {
      hasError: state => state.error ? true : false
  },
  plugins: [vuexLocal.plugins],
  strict: debug
})
