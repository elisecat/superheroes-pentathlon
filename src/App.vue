<template>
  <div class="flex flex-col min-h-screen">
    <header class="p-0 shadow-lg">
      <div class="mx-auto">
        <Navbar :routes="navRoutes" />
      </div>
    </header>

    <main :class="[$route.path !== '/home' ? 'container mx-auto py-8 flex-grow' : 'flex-grow']">
      <RouterView />
    </main>

    <footer class="mt-auto">
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/shared/Navbar.vue'
import Footer from '@/components/shared/Footer.vue'

const navRoutes = [
  { path: '/home', name: 'Home', icon: 'fas fa-home' },
  { path: '/heroes', name: 'Heroes', icon: 'fas fa-user' },
  { path: '/pentathlon', name: 'Pentathlon', icon: 'fas fa-trophy' },
]

const $route = useRoute()
</script>
