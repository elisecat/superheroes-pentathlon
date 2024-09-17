<template>
    <div class="p-4 w-full md:w-1/2 lg:w-1/3">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden flex relative">
            <img :src="heroImage" alt="Hero Image" class="w-1/3 h-auto object-cover">

            <div class="p-4 flex-1">
                <h2 class="text-xl font-bold mb-2">{{ hero.name }}</h2>
                <p class="text-gray-600 text-md"><b>Agility:</b> {{ hero.attributes.agility }}</p>
                <p class="text-gray-600 text-md"><b>Strength:</b> {{ hero.attributes.strength }}</p>
                <p class="text-gray-600 text-md"><b>Weight:</b> {{ hero.attributes.weight }}</p>
                <p class="text-gray-600 text-md"><b>Endurance:</b> {{ hero.attributes.endurance }}</p>
                <p class="text-gray-600 text-md"><b>Charisma:</b> {{ hero.attributes.charisma }}</p>
            </div>

            <div class="absolute top-2 right-2 flex flex-col items-center space-y-2">
                <button @click="editHero(hero.id)" class="text-blue-500 hover:text-blue-700" title="Editar">
                    <i class="fas fa-edit text-2xl"></i>
                </button>
                <button @click="deleteHero(hero)" class="text-red-500 hover:text-red-700" title="Eliminar">
                    <i class="fas fa-trash-can text-2xl"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    hero: Object
})

const heroImage = computed(() => {
    return `${props.hero.picture}`
})

const router = useRouter()

const editHero = (heroId) => {
    router.push({ name: 'EditHero', params: { heroId } })
}

const deleteHero = (hero) => {
    console.log("Eliminando héroe:", hero);
}
</script>
