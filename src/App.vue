<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-blue-500 p-4 shadow-lg">
    <div class="container mx-auto">
      <nav class="flex space-x-4">
        <RouterLink to="/heroes" class="text-white hover:text-gray-300">Heroes</RouterLink>
        <RouterLink to="/pentathlon" class="text-white hover:text-gray-300">Pentathlon</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container mx-auto py-8">
    <RouterView />
  </main>
</template>
