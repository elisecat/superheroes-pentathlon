<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-gray-900">{{ label }}</label>
        <input :id="name" type="file" accept="image/*" @change="handleFileChange"
            class="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />
        <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
        <div v-if="previewSrc || modelValue" class="mt-4">
            <img :src="previewSrc || modelValue" alt="Image preview"
                class="w-32 h-32 object-cover border border-gray-300 rounded-md" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
    label: String,
    name: String,
    rules: Array,
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const previewSrc = ref(null)
const errorMessage = ref('')

const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
        const img = new Image();

        if (typeof reader.result === 'string') {
            img.src = reader.result;
        } else {
            errorMessage.value = 'Error processing image.';
            return;
        }

        img.onload = () => {
            if (img.width === 128 && img.height === 128) {
                previewSrc.value = reader.result as any
                validateImage(file);
                emit('update:modelValue', reader.result);
            } else {
                errorMessage.value = 'Image dimensions must be 128x128px.';
                previewSrc.value = null;
            }
        };
    };

    reader.onerror = () => {
        errorMessage.value = 'Error uploading image.';
    };

    reader.readAsDataURL(file);
}

const validateImage = (file: { size: number; }) => {
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
