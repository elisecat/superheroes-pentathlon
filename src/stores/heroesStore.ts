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
        await this.fetchHeroes()
      } catch (error) {
        console.error('Error creating hero:', error)
      }
    },

    async updateHero(updatedHero) {
      try {
        const response = await api.put(`/pentathlon/heroes/${updatedHero.id}`, updatedHero)
        await this.fetchHeroes()
      } catch (error) {
        console.error('Error updating hero:', error)
      }
    },

    async deleteHero(heroId) {
      try {
        const response = await api.delete(`/pentathlon/heroes/${heroId}`)
        await this.fetchHeroes()
      } catch (error) {
        console.error('Error deleting hero:', error)
        throw new Error('Error eliminando el héroe')
      }
    },

    getHeroById(heroId) {
      return this.heroes.find(hero => hero.id === heroId)
    },
  },
})
