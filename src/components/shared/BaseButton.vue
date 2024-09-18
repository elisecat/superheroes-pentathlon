<template>
    <button type="button" :class="buttonClass" @click="onClick" :disabled="disabled">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'indigo',
    },
    size: {
        type: String,
        default: 'md',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['click'])
const onClick = () => {
    if (!props.disabled) {
        emit('click')
    }
}

const buttonClass = computed(() => {
    let baseClass = 'font-large rounded-lg text-center focus:ring-4 focus:outline-none w-auto'
    let sizeClass = ''
    let gradientClass = ''
    let ringClass = ''

    switch (props.size) {
        case 'sm':
            sizeClass = 'text-xs px-4 py-2 sm:text-sm sm:px-6 sm:py-2.5'
            break
        case 'md':
            sizeClass = 'text-sm px-5 py-2.5 sm:text-base sm:px-6 sm:py-3'
            break
        case 'lg':
            sizeClass = 'text-lg px-6 py-3 sm:text-lg sm:px-7 sm:py-3.5'
            break
        default:
            sizeClass = 'text-sm px-5 py-2.5 sm:text-base sm:px-6 sm:py-3'
    }

    switch (props.variant) {
        case 'indigo':
            gradientClass = 'bg-indigo-600 text-white hover:bg-indigo-500'
            ringClass = 'focus:ring-indigo-300 dark:focus:ring-indigo-600'
            break
        case 'purple-blue':
            gradientClass = 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-white'
            ringClass = 'focus:ring-blue-300 dark:focus:ring-blue-800'
            break
        default:
            gradientClass = 'bg-indigo-600 text-white hover:bg-indigo-500'
            ringClass = 'focus:ring-indigo-300 dark:focus:ring-indigo-600'
    }

    const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'

    return `${baseClass} ${sizeClass} ${gradientClass} ${ringClass} ${disabledClass}`
})
</script>
