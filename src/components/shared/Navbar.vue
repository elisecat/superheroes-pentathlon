<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Logo">
                </div>
                <!-- Links de navegación para pantallas grandes -->
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <router-link v-for="route in routes" :key="route.path" :to="route.path"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
                            <i :class="route.icon" class="text-lg"></i>
                            <span>{{ route.name }}</span>
                        </router-link>
                    </div>
                </div>

                <!-- Botón de menú móvil -->
                <div class="sm:hidden">
                    <button @click="toggleMenu" type="button"
                        class="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path :class="{ 'hidden': isOpen, 'block': !isOpen }" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            <path :class="{ 'block': isOpen, 'hidden': !isOpen }" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Menú móvil -->
        <div v-if="isOpen" class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <router-link v-for="route in routes" :key="route.path" :to="route.path"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium items-center space-x-2">
                    <i :class="route.icon" class="text-lg"></i>
                    <span>{{ route.name }}</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { ref } from 'vue'
import type { Route } from '@/types/Route';

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const props = defineProps<{
    routes: Route[];
}>();

</script>

<style scoped></style>
