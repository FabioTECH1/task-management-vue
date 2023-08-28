import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '../views/Guest/Login.vue'
import RegisterVue from '../views/Guest/Register.vue'
import AddTaskVue from '../views/AddTask.vue'
import TaskListVue from '../views/TaskList.vue'
import TaskViewVue from '../views/TaskView.vue'

import { isAuthenticated } from '@/services/authService';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue,
      meta: { isGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterVue,
      meta: { isGuest: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskListVue,
      meta: { requiresAuth: true },
    },
    {
      path: '/add-task',
      name: 'addTask',
      component: AddTaskVue,
      meta: { requiresAuth: true },
    },
    {
      path: '/task/:id',
      name: 'TaskView',
      component: TaskViewVue,
      meta: { requiresAuth: true },
    },

  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.isGuest)) {
    if (isAuthenticated()) {
      next({ name: 'tasks' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
