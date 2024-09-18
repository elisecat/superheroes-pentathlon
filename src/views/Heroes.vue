<template>
    <PageLayout sectionTitle="Superheroes">

        <div class="bg-white shadow-lg p-6">
            <div class="flex justify-end mb-4">
                <BaseButton @click="navigateToCreate" variant="purple-blue" size="md" class="w-fit">
                    <i class="fas fa-plus"></i>&nbsp;
                    <span>Create Superhero</span>
                </BaseButton>
            </div>
            <div class="flex flex-wrap -m-4">
                <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" />
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useHeroesStore } from '@/stores/heroesStore'
import HeroCard from '@/components/shared/HeroCard.vue'
import PageLayout from '@/components/shared/PageLayout.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useRouter } from 'vue-router'
import type { Hero } from '@/types/Hero'
const router = useRouter()
const heroesStore = useHeroesStore()

const heroes = computed<Hero[]>(() => heroesStore.heroes)

onMounted(async () => {
    await heroesStore.fetchHeroes()
})

const navigateToCreate = () => {
    router.push('/heroes/create')
}
</script>
