import { createRouter, createWebHistory } from 'vue-router';
import Heroes from '../views/Heroes.vue';
import Pentathlon from '../views/Pentathlon.vue';

const routes = [
  { path: '/heroes', name: 'Heroes', component: Heroes },
  { path: '/pentathlon', name: 'Pentathlon', component: Pentathlon }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
