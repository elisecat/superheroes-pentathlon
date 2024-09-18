<template>
    <PageLayout sectionTitle="Pentathlon Simulator">
        <div class="rounded-lg p-4 flex text-justify">
            <p class="text-lg text-gray-700 ">
                Select exactly three heroes to participate in the Pentathlon.
                After selecting the heroes, execute the tests one by one by clicking the corresponding buttons.
                Each test will calculate the heroes' points based on their attributes.
                Once all the tests are completed, you will be able to see the podium with the final results.
            </p>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <BaseMultiSelect :options="heroes" v-model="selectedHeroes" :maxSelection="3"
                @update:modelValue="resetPruebas" />
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <BaseButton v-for="(prueba, index) in pruebas" :key="index" :disabled="!canExecuteTest(index)"
                @click="executeTest(prueba, index)"
                :class="['w-full sm:w-1/3', 'mb-4 sm:mr-2', colorVariants[index], { 'fade-out': prueba.executed }]"
                v-show="!prueba.executed">
                <template v-if="loadingPrueba === index">
                    <i class="fas fa-spinner fa-spin mr-2"></i> Running test...
                </template>
                <template v-else>
                    {{ prueba.name }}
                </template>
            </BaseButton>
        </div>

        <div v-if="selectedHeroesComputed.length === 3" class="bg-white shadow-lg rounded-lg p-6">
            <h3 class="text-xl text-center font-bold mb-4">{{ allPruebasExecuted ? 'Podium' : 'Live Points' }}</h3>

            <div class="hidden sm:flex justify-between items-center mb-4 font-bold text-lg">
                <div class="w-1/3 text-center">Points</div>
                <div class="w-1/3 text-center">Hero</div>
                <div class="w-1/3 text-center">Place</div>
            </div>

            <div v-for="(hero, index) in sortedHeroes" :key="index"
                class="flex flex-col sm:flex-row justify-between items-center mb-4 border-b pb-4">
                <div class="w-full sm:w-1/3 text-center mb-2 sm:mb-0">
                    <span class="bg-indigo-100 text-black rounded-full px-4 py-2">{{ hero.points || 0 }} points</span>
                </div>

                <div class="w-full sm:w-1/3 flex items-center justify-center sm:justify-start text-center mb-2 sm:mb-0">
                    <img :src="hero.picture" class="w-10 h-10 rounded-full mr-2" />
                    <span class="text-sm sm:text-lg">{{ hero.name }}</span>
                </div>

                <div class="w-full sm:w-1/3 text-center">
                    <div v-if="allPruebasExecuted">
                        <span v-if="index === 0" class="text-yellow-400">
                            <i class="fas fa-medal fa-2x"></i> 1st
                        </span>
                        <span v-if="index === 1" class="text-gray-400">
                            <i class="fas fa-medal fa-2x"></i> 2nd
                        </span>
                        <span v-if="index === 2" class="text-orange-500">
                            <i class="fas fa-medal fa-2x"></i> 3rd
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useHeroesStore } from '@/stores/heroesStore'
import type { Hero } from '@/types/Hero';
import PageLayout from '@/components/shared/PageLayout.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseMultiSelect from '@/components/shared/BaseMultiSelect.vue'

const heroesStore = useHeroesStore()

const heroes = ref<Hero[]>([])

const selectedHeroes = ref<Hero[]>([])

const pruebas = ref([
    { name: '1. Skyscraper Climb', executed: false, calculation: 'climbSkyscrapers' },
    { name: '2. Joke Telling', executed: false, calculation: 'tellJoke' },
    { name: '3. Villain Target Practice', executed: false, calculation: 'villainShot' },
    { name: '4. 200km Sprint', executed: false, calculation: 'km200' },
    { name: '5. Rescue a Hundred Kittens', executed: false, calculation: 'rescueCats' }
])

const colorVariants = ref([
    'bg-blue-500 hover:bg-blue-700 text-white',
    'bg-red-500 hover:bg-red-700 text-white',
    'bg-green-500 hover:bg-green-700 text-white',
    'bg-yellow-500 hover:bg-yellow-700 text-white',
    'bg-purple-500 hover:bg-purple-700 text-white'
])

const sortedHeroes = ref<Hero[]>([])
const selectedHeroesComputed = computed(() => selectedHeroes.value)
const allPruebasExecuted = ref(false)
const loadingPrueba = ref<number | null>(null)

onMounted(async () => {
    await heroesStore.fetchHeroes()
    heroes.value = heroesStore.heroes as Hero[]
})

const canExecuteTest = (index: number) => {
    if (index === 0 && selectedHeroesComputed.value.length === 3) {
        return true
    }
    if (index > 0 && index < pruebas.value.length) {
        return pruebas.value[index - 1]?.executed
    }
    return false
}


const resetPruebas = () => {
    pruebas.value.forEach(prueba => prueba.executed = false)
    selectedHeroes.value.forEach(hero => {
        hero.points = 0
    })
    sortedHeroes.value = [...selectedHeroes.value]
    allPruebasExecuted.value = false
    loadingPrueba.value = null
}

const executeTest = (prueba: { name: string; executed: boolean; calculation: string }, index: number) => {
    if (!prueba.executed) {
        loadingPrueba.value = index
        updateHeroStats()

        setTimeout(() => {
            calculatePoints(prueba.calculation)
            prueba.executed = true

            sortedHeroes.value = [...selectedHeroes.value].sort((a, b) => b.points - a.points)
            updateVictories()

            loadingPrueba.value = null

            if (pruebas.value.every(p => p.executed)) {
                allPruebasExecuted.value = true
            }
        }, 800)
    }
}

const updateHeroStats = () => {
    sortedHeroes.value = [...selectedHeroes.value].sort((a, b) => b.points - a.points)

    selectedHeroes.value.forEach((hero, index) => {
        hero.isLast = (index === sortedHeroes.value.length - 1)
        hero.wasFirst = (index === 0)
        hero.wonAtLeastTwo = hero.wonAtLeastTwo || (hero.victories ?? 0) >= 2
    })

    if (sortedHeroes.value.length > 0) {
        sortedHeroes.value[0].points += 5
    }
    if (sortedHeroes.value.length > 1) {
        sortedHeroes.value[1].points += 3
    }
    if (sortedHeroes.value.length > 2) {
        sortedHeroes.value[2].points += 1
    }
}

const updateVictories = () => {
    if (sortedHeroes.value.length > 0) {
        sortedHeroes.value[0].victories = (sortedHeroes.value[0].victories ?? 0) + 1
    }
}

const calculatePoints = (testType: string) => {
    selectedHeroes.value.forEach(hero => {
        let puntos = 0
        switch (testType) {
            case 'climbSkyscrapers':
                puntos = (hero.attributes.strength * 4) - (hero.attributes.weight * 2)
                break
            case 'tellJoke':
                const charismaSum = selectedHeroes.value.reduce((sum, h) => sum + h.attributes.charisma, 0)
                puntos = Math.pow(hero.attributes.charisma, 2) - charismaSum
                break
            case 'villainShot':
                puntos = hero.attributes.agility + hero.attributes.strength + (hero.isLast ? 5 : 0)
                break
            case 'km200':
                puntos = (hero.attributes.agility * 4) + (hero.attributes.endurance * 2) + (hero.wasFirst ? 10 : -1)
                break
            case 'rescueCats':
                puntos = (hero.attributes.agility * 2) + (hero.wonAtLeastTwo ? 5 : 0)
                break
        }
        hero.points = Math.max((hero.points || 0) + puntos, 0)
    })
}

watch(selectedHeroes, (newVal: Hero[]) => {
    sortedHeroes.value = [...newVal].map(hero => {
        if (!hero.points) {
            hero.points = 0
        }
        return hero
    }).sort((a, b) => b.points - a.points)
})
</script>
<style scoped>
.fade {
    transition: opacity 0.5s ease;
    opacity: 1;
}

.fade-out {
    opacity: 0;
}
</style>