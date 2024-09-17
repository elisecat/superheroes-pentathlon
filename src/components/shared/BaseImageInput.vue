<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
        <input :id="name" type="file" accept="image/*" @change="handleFileChange"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
        <div v-if="previewSrc" class="mt-4">
            <img :src="previewSrc" alt="Image preview"
                class="w-32 h-32 object-cover border border-gray-300 rounded-md" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    label: String,
    name: String,
    rules: Array,
})

const emit = defineEmits(['update:modelValue'])

const previewSrc = ref(null)
const errorMessage = ref('')

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
        previewSrc.value = reader.result
        validateImage(file)
        emit('update:modelValue', reader.result)
    }

    reader.onerror = () => {
        errorMessage.value = 'Error uploading image.'
    }

    reader.readAsDataURL(file)
}

const validateImage = (file) => {
    if (file.size > 1024 * 1024) {
        errorMessage.value = 'Image size should not exceed 1MB.'
        previewSrc.value = null
        return
    }
    errorMessage.value = ''
}
</script>

<style scoped>
.error {
    color: red;
    font-size: 0.875rem;
}
</style>
