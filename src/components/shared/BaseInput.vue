<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-gray-900">{{ label }}</label>
        <input :id="name" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" :class="[
                'block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                inputClass
            ]" />
        <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    type: {
        type: String,
        default: 'text',
    },
    label: String,
    name: String,
    placeholder: String,
    rules: Array,
    inputClass: String,
})

const emit = defineEmits(['update:modelValue'])

const errorMessage = computed(() => {
    if (!props.rules) return ''
    for (const rule of props.rules) {
        const result = rule(props.modelValue)
        if (result !== true) return result
    }
    return ''
})
</script>