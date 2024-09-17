<template>
  <header class="p-0 shadow-lg">
    <div class="mx-auto">
      <Navbar :routes="navRoutes" />
    </div>
  </header>

  <main :class="[$route.path !== '/home' ? 'container mx-auto py-8' : '']">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/shared/Navbar.vue'

const navRoutes = [
  { path: '/home', name: 'Home', icon: 'fas fa-home' },
  { path: '/heroes', name: 'Heroes', icon: 'fas fa-user' },
  { path: '/pentathlon', name: 'Pentathlon', icon: 'fas fa-trophy  ' },

]
</script>
