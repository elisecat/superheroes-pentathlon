<template>
    <PageLayout :sectionTitle="isEdit ? 'Update superhero' : 'Create superhero'" :showBackButton="true">
        <div class="bg-white shadow-lg p-6 rounded-lg">
            <form @submit.prevent="handleSubmit" class="space-y-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <p class="text-sm text-gray-500">Allowed values for numeric fields: 0 to 10</p>
                    <BaseInput v-model="hero.name" label="* Name" name="name" placeholder="Enter hero name"
                        :rules="nameRules" />

                    <BaseImageInput v-model="hero.picture" label="Picture" name="picture" />

                    <BaseInput v-model="hero.attributes.agility" label="* Agility" name="agility" type="number"
                        placeholder="Enter agility" :rules="agilityRules" :isNumber="true"
                        @input="validateNumber('agility')" />

                    <BaseInput v-model="hero.attributes.strength" label="* Strength" name="strength" type="number"
                        placeholder="Enter strength" :rules="strengthRules" :isNumber="true"
                        @input="validateNumber('strength')" />

                    <BaseInput v-model="hero.attributes.weight" label="* Weight" name="weight" type="number"
                        placeholder="Enter weight" :rules="weightRules" :isNumber="true"
                        @input="validateNumber('weight')" />

                    <BaseInput v-model="hero.attributes.endurance" label="* Endurance" name="endurance" type="number"
                        placeholder="Enter endurance" :rules="enduranceRules" :isNumber="true"
                        @input="validateNumber('endurance')" />

                    <BaseInput v-model="hero.attributes.charisma" label="* Charisma" name="charisma" type="number"
                        placeholder="Enter charisma" :rules="charismaRules" :isNumber="true"
                        @input="validateNumber('charisma')" />
                </div>

                <div class="flex justify-center mt-10">
                    <BaseButton :disabled="!isFormValid" @click="handleSubmit" variant="purple-blue" size="md"
                        class="w-full sm:w-2/4">
                        {{ isEdit ? 'Update superhero' : 'Create superhero' }}
                    </BaseButton>
                </div>
            </form>
        </div>
    </PageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeroesStore } from '@/stores/heroesStore'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import PageLayout from '@/components/shared/PageLayout.vue'
import BaseImageInput from '@/components/shared/BaseImageInput.vue'
import Swal from 'sweetalert2'
import type { Hero } from '@/types/Hero'

export default defineComponent({
    components: {
        BaseImageInput,
        PageLayout,
        BaseInput,
        BaseButton,
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const heroesStore = useHeroesStore()

        const hero = ref<Hero>({
            id: '',
            name: '',
            picture: '',
            points: 0,
            attributes: {
                agility: 0,
                strength: 0,
                weight: 0,
                endurance: 0,
                charisma: 0,
            },
        })

        const isEdit = ref(false)

        onMounted(async () => {
            const heroId = route.params.heroId as string

            let selectedHero = heroesStore.getHeroById(heroId)

            if (!selectedHero) {
                await heroesStore.fetchHeroes()
                selectedHero = heroesStore.getHeroById(heroId)
            }

            if (selectedHero) {
                hero.value = JSON.parse(JSON.stringify(selectedHero))
                isEdit.value = true
            }
        })

        const handleSubmit = async () => {
            if (isEdit.value) {
                await heroesStore.updateHero(hero.value)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Hero updated successfully!',
                    timer: 1500,
                })
            } else {
                await heroesStore.createHero(hero.value)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Hero created successfully!',
                    timer: 1500,
                })
            }
            router.push('/heroes')
        }

        const validateNumber = (attribute: keyof Hero['attributes']) => {
            const value = hero.value.attributes[attribute]
            const regex = /^(10|[1-9])$/

            if (!regex.test(value.toString())) {
                hero.value.attributes[attribute] = 0
            }
        }

        const nameRules = [
            (value: string) => !!value || 'Name is required',
            (value: string) => value.length >= 3 || 'Name must be at least 3 characters'
        ]
        const attributeRules = [
            (value: number) => !!value || 'This field is required',
            (value: number) => value >= 0 || 'Value must be greater than or equal to 0',
            (value: number) => value <= 10 || 'Value must be less than or equal to 10'
        ]

        const isFormValid = computed(() => {
            const { name, attributes } = hero.value
            const isNameValid = name && name.length >= 3
            const areAttributesValid = Object.values(attributes).every(attr => attr >= 0 && attr <= 10)

            return isNameValid && areAttributesValid
        })

        return {
            hero,
            isEdit,
            handleSubmit,
            validateNumber,
            isFormValid,
            nameRules,
            agilityRules: attributeRules,
            strengthRules: attributeRules,
            weightRules: attributeRules,
            enduranceRules: attributeRules,
            charismaRules: attributeRules,
        }
    },
})
</script>

<style scoped>
.hide-arrows::-webkit-outer-spin-button,
.hide-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.hide-arrows {
    -moz-appearance: textfield;
}
</style>
