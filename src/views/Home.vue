<template>
    <div class="flex justify-center">
        <img src="../assets/superhero-banner.svg" alt="Superhero Banner" class="w-full max-w-4xl h-auto object-cover" />
    </div>
    <PageLayout sectionTitle="Welcome to superheroes pentathlon">
        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <p class="text-lg mb-4">Start by creating your superheroes or simulate their participation in the
                pentathlon!</p>
            <div v-if="hasSuperheroes && heroesStore.heroes.length >= 3" class="flex justify-center space-x-4 mt-6">
                <BaseButton @click="navigateToHeroes" variant="purple-blue" size="lg">Manage Superheroes</BaseButton>
                <BaseButton @click="navigateToPentathlon" variant="purple-blue" size="lg">Start Pentathlon</BaseButton>
            </div>
            <div v-else class="text-center mt-6">
                <p v-if="heroesStore.heroes.length < 3" class="text-xl text-gray-500 mb-4">
                    You need at least 3 superheroes to participate in the pentathlon.
                </p>
                <BaseButton @click="navigateToCreate" variant="purple-blue" size="md" class="w-full sm:w-2/4">Create
                    your superhero
                </BaseButton>
            </div>
        </div>
    </PageLayout>
</template>

<script>
import { useRouter } from 'vue-router'
import PageLayout from '@/components/shared/PageLayout.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useHeroesStore } from '@/stores/heroesStore'
import { computed } from 'vue'

export default {
    components: { PageLayout, BaseButton },
    setup() {
        const router = useRouter()
        const heroesStore = useHeroesStore()

        const hasSuperheroes = computed(() => heroesStore.heroes.length > 0)

        const navigateToHeroes = () => {
            router.push('/heroes')
        }

        const navigateToCreate = () => {
            router.push('/heroes/create')
        }

        const navigateToPentathlon = () => {
            if (heroesStore.heroes.length >= 3) {
                router.push('/pentathlon')
            } else {
                alert('You need at least 3 superheroes to participate in the pentathlon!')
            }
        }

        return { navigateToHeroes, navigateToCreate, navigateToPentathlon, hasSuperheroes, heroesStore }
    }
}
</script>