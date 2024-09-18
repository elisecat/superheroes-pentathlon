<template>
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div class="text-center md:text-left mb-4 md:mb-0">
                <h2 class="text-xl font-semibold">Superheroes Pentathlon</h2>
            </div>

            <div class="text-sm text-center md:text-right">
                <p>&copy; {{ currentYear }} Superheroes Pentathlon. All rights reserved.</p>
                <p>Version {{ version }}</p>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>

const currentYear = new Date().getFullYear()
const version = '0.3.0'

</script>
