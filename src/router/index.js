import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardCreationView from '../views/CardCreationView.vue'
import CardEditView from '../views/CardEditView.vue'
import CardListView from '../views/CardListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/card_create',
    name: 'card_create',
    component: CardCreationView
  },
  {
    path: '/card_edit/:id',
    name: 'card_edit',
    component: CardEditView
  },
  {
    path: '/card_list',
    name: 'card_list',
    component: CardListView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
