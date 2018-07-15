import Vue from 'vue'
import Router from 'vue-router'
import loginIn from '@/components/loginIn//loginIn.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: loginIn
    }, {
      path: '/home',
      component: Home,
      children: [{ path: '/user', component: User }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    var token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      this.a.push('/')
    }
  }
})
export default router
