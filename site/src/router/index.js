import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      public: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Home.vue'),
    meta: {
      public: false
    }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/Home.vue'),
    meta: {
      public: false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta) return next()

  const { public: publicRoute } = to.meta

  const authRequired = !publicRoute

  if (!authRequired) return next()

  const loggedIn = localStorage.getItem('token')

  if (!loggedIn && to.path !== '/login') {
    return next('/login')
  }

  return next()
})

export default router
