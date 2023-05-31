import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),

  getters: {
    double: (state) => {
      return state.count * 2
    }
  },

  actions: {
    setCount(newValue: number) {
      this.count = newValue
    }
  }
})

export default useCounterStore
