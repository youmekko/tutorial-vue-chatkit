import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import ChatDashboard from './views/ChatDashboard';

Vue.use(Router)

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('loginSuccess');
  const loginPath = `/`;
  isAuth ? next() : next(loginPath);
}

/*
#이 붙는건 브라우저에서 라우팅 할 때 Hashbang 모드가 동작하고 있기 때문이다. 
브라우저 히스토리 API가 없을 때 해시뱅 모드를 사용하지만 크롬의 경우는 히스토리 API가 있기 때문에 해시뱅 모드가 아닌 히스토리 모드를 사용하면 된다.
*/
export default new Router({
  mode: 'history',
  base : process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatDashboard,
      beforeEnter: requireAuth
    }
  ]

})