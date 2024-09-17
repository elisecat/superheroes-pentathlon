<template>
    <PageLayout sectionTitle="Superheroes">
        <div class="bg-white shadow-lg p-6">
            <div class="flex flex-wrap -m-4">
                <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" />
            </div>
        </div>
    </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHeroesStore } from '@/stores/heroesStore'
import HeroCard from '@/components/shared/HeroCard.vue'
import PageLayout from '@/components/shared/PageLayout.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const heroesStore = useHeroesStore()
const heroes = computed(() => heroesStore.heroes)

onMounted(async () => {
    await heroesStore.fetchHeroes()
    heroes.value = heroesStore.heroes
})

const navigateToCreate = () => {
    router.push('/create-hero')
}
</script>