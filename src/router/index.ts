import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProblemList from '../views/ProblemList.vue'
import ProblemEditor from '../views/ProblemEditor.vue'
import Login from '../views/Login.vue'
import AuthCallback from '../views/AuthCallback.vue'
import { supabase } from '../supabase'

const routes = [
  { path: '/', component: Home },
  { path: '/problems', component: ProblemList, meta: { requiresAuth: true } },
  { path: '/problems/new', component: ProblemEditor, meta: { requiresAuth: true } },
  { path: '/problems/:id', component: ProblemEditor, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/auth/callback', component: AuthCallback }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !session) {
    next('/login')
  } else {
    next()
  }
})

export default router