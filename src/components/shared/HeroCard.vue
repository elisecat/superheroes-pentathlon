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

            <div class="absolute top-4 right-4 flex flex-col items-center space-y-2">
                <button @click="editHero(hero.id)" class="text-blue-500 hover:text-blue-700" title="Editar">
                    <i class="fas fa-edit text-2xl"></i>
                </button>
                <button @click="confirmDelete(hero.id)" class="text-red-500 hover:text-red-700" title="Eliminar">
                    <i class="fas fa-trash-can text-2xl"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHeroesStore } from '@/stores/heroesStore'
import Swal from 'sweetalert2'

const props = defineProps({
    hero: Object
})

const router = useRouter()
const heroesStore = useHeroesStore()

const heroImage = computed(() => {
    return `${props.hero.picture}`
})

const editHero = (heroId) => {
    router.push({ name: 'EditHero', params: { heroId } })
}

const confirmDelete = (heroId) => {
    Swal.fire({
        title: 'Are you sure you want to delete this record?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteHero(heroId)
        }
    })
}

const deleteHero = async (heroId) => {
    try {
        await heroesStore.deleteHero(heroId)
        Swal.fire(
            'Deleted',
            'The hero has been successfully deleted.',
            'success'
        )
        await heroesStore.fetchHeroes()
    } catch (error) {
        console.error('Error deleting the hero:', error)
        Swal.fire(
            'Error',
            'There was an error deleting the hero.',
            'error'
        )
    }
}
</script>