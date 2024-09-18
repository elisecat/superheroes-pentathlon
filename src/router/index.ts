import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Heroes from '../views/Heroes.vue';
import Pentathlon from '../views/Pentathlon.vue';
import HeroForm from '../components/HeroForm.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/heroes', name: 'Heroes', component: Heroes },
  { path: '/pentathlon', name: 'Pentathlon', component: Pentathlon },
  { path: '/heroes/create', name: 'CreateHero', component: HeroForm }, 
  { path: '/heroes/:heroId/edit', name: 'EditHero', component: HeroForm, props: true,  }, 


]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
