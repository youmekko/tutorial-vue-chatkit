import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: 'Relax! This is just a drill error message',
    user: { 
        username : 'youmekko',
        name: 'youme choi'
    },
    reconnect: false,
    activeRoom: {
      id: '22202258-4590-42bf-a542-889de27d6cec'
    },
    rooms: [
      {
        id: '22202258-4590-42bf-a542-889de27d6cec',
        name: 'kinka'
      },
      {
        id: '17fa9e1cc-012c-42a9-aa88-647476bbcdef24',
        name: 'test'
      }
    ],
    users: [
      {
        username : 'jino',
        name: 'jinho bahng',
        presense: 'online'
      },
      {
        username: 'ten',
        name: 'teahyun kim',
        presense: 'online'
      },
      {
        username: 'edwin',
        name: 'seungkoo ryu',
        presense: 'online'
      },
      {
        username: 'youmekko',
        name: 'youme choi',
        presense: 'online'
      }
    ],
    messages: [
      {
        username: 'youmekko',
        date: '01/01/2020',
        text: 'Happy New Year!'
      },
      {
        username: 'youmekko',
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
  plugins: [vuexLocal.plugin],
  strict: debug
})
