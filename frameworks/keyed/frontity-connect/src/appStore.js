import { createStore } from './connect'
import randomSentence from './randomSentence'
import { startMeasure, stopMeasure } from './logPerf'

let idCounter = 1

const appStore = createStore({
  state: {
    rows: [],
    selectedRow: undefined
  },
  actions: {
    deselectAll: ({ state }) => {
      if (state.selectedRow) {
        state.selectedRow.selected = false
        state.selectedRow = undefined
      }
    },
    buildRows: ({ state, actions }) => numOfRows => {
      for (let i = 0; i < numOfRows; i++) {
        state.rows.push({ id: idCounter++, label: randomSentence() })
      }
      actions.deselectAll()
    },
    run: ({ state, actions }) => {
      state.rows = []
      actions.buildRows(1000)
    },
    add: ({ state, actions }) => {
      actions.buildRows(1000)
    },
    update: ({ state }) => {
      for (let i = 0; i < state.rows.length; i += 10) {
        state.rows[i].label += ' !!!'
      }
    },
    select: ({ state, actions }) => row => {
      actions.deselectAll()
      state.selectedRow = row
      row.selected = true
    },
    delete: ({ state }) => row => {
      state.rows.splice(state.rows.indexOf(row), 1)
    },
    runLots: ({ state, actions }) => {
      state.rows = []
      actions.buildRows(10000)
    },
    clear: ({ state }) => {
      state.rows = []
    },
    swapRows: ({ state }) => {
      if (state.rows.length > 998) {
        [state.rows[1], state.rows[998]] = [state.rows[998], state.rows[1]];
      }
    }
  }
})

export default appStore
