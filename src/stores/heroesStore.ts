import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_BASE_URL


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    'Content-Type': 'application/json',
  },
})

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
  }),

  actions: {
    async fetchHeroes() {
      try {
        const response = await api.get('/pentathlon/heroes')
        this.heroes = response.data
      } catch (error) {
        console.error('Error fetching heroes:', error)
      }
    },

    async createHero(newHero) {
      try {
        const response = await api.post('/pentathlon/heroes', newHero)
        console.log('Hero created:', response.data)
        await this.fetchHeroes()
      } catch (error) {
        console.error('Error creating hero:', error)
      }
    },

    async updateHero(updatedHero) {
      try {
        const response = await api.put(`/pentathlon/heroes/${updatedHero.id}`, updatedHero)
        console.log('Hero updated:', response.data)
        await this.fetchHeroes()
      } catch (error) {
        console.error('Error updating hero:', error)
      }
    },

    getHeroById(heroId) {
      return this.heroes.find(hero => hero.id === heroId)
    },
  },
})
