<template>
    <div>
        <header class="py-6">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between">
                <div class="w-full md:w-auto text-left md:text-left mb-4 md:mb-0">
                    <button v-if="showBackButton" @click="goBack"
                        class="text-blue-500 flex items-center space-x-2 hover:text-blue-700">
                        <i class="fas fa-arrow-left"></i>
                        <span>Regresar</span>
                    </button>
                </div>

                <h1 class="text-4xl font-bold text-center w-full md:flex-grow">{{ sectionTitle }}</h1>
            </div>
        </header>
        <main class="container mx-auto py-8">
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    sectionTitle: {
        type: String,
        required: true
    },
    showBackButton: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<style scoped></style>
