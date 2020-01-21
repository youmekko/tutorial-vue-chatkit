import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: 'Relax! This is just a drill error message',
    user: { 
        username : 'kana',
        name: 'kanako'
    },
    reconnect: false,
    activeRoom: {
      id: '22202258-4590-42bf-a542-889de27d6cec'
    },
    rooms: [
      {
        id: '123',
        name: 'Korea'
      },
      {
        id: '124',
        name: 'Canada'
      }
    ],
    users: [
      {
        username : 'kana',
        name: 'kanako',
        presense: 'online'
      },
      {
        username: 'mica',
        name: 'mica white',
        presense: 'offline'
      }
    ],
    messages: [
      {
        username: 'kana',
        date: '01/01/2020',
        text: 'Happy New Year!'
      },
      {
        username: 'kana',
        date: '01/01/2020',
        text: 'xoxo!! LOVE!!!'
      },
      {
        username: 'edwin',
        date: '01/01/2020',
        text: 'sake bom!!!'
      }
    ],
    userTyping: null
  },
  mutations,
  actions,
  getters : {
      hasError: state => state.error ? true : false
  },
  // plugins: [vuexLocal.plugin],
  strict: debug
})
