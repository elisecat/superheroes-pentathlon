<template>
    <div>
        <header class="py-6">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-bold text-center md:text-center">{{ sectionTitle }}</h1>
            </div>
        </header>
        <main class="container mx-auto py-8">
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
const props = defineProps({
    sectionTitle: {
        type: String,
        required: true
    }
})
</script>

<style scoped></style>