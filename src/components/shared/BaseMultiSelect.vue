<template>
    <div class="w-full">
        <div class="flex flex-wrap gap-2 mb-2">
            <span v-for="(selected, index) in selectedItems" :key="index"
                class="bg-indigo-100 border border-gray-200 rounded-full flex items-center p-1 m-1">
                <img :src="selected.picture" class="w-6 h-6 rounded-full mr-2" alt="Hero image" />
                {{ selected.name }}
                <button @click="removeItem(selected)"
                    class="ml-2 bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        </div>

        <div class="relative">
            <select @change="handleSelection" :disabled="selectedItems.length >= maxSelection"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2">
                <option value="" disabled selected>Select heroes</option>
                <option v-for="hero in options" :key="hero.id" :value="hero.id" :disabled="isSelected(hero)">
                    {{ hero.name }}
                </option>
            </select>
            <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    maxSelection: {
        type: Number,
        default: 3,
    },
})

const emit = defineEmits(['update:modelValue'])

const selectedItems = ref([])
const errorMessage = ref('')

const isSelected = (hero) => {
    return selectedItems.value.some(item => item.id === hero.id)
}

const handleSelection = (event) => {
    let heroId = event.target.value
    let selectedHero = props.options.find(hero => hero.id === heroId)

    if (selectedHero && !isSelected(selectedHero) && selectedItems.value.length < props.maxSelection) {
        selectedItems.value.push(selectedHero)
        emit('update:modelValue', selectedItems.value)
        errorMessage.value = ''
    } else if (selectedItems.value.length >= props.maxSelection) {
        event.target.value = ""
        errorMessage.value = `You can only select up to ${props.maxSelection} heroes.`
    }
}

const removeItem = (item) => {
    selectedItems.value = selectedItems.value.filter(selected => selected.id !== item.id)
    emit('update:modelValue', selectedItems.value)
}

</script>
