import { createStore } from './connect'
import randomSentence from './randomSentence'
import { startMeasure, stopMeasure } from './logPerf'

let idCounter = 1

const appStore = createStore({
  state: {
    rows: []
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
      startMeasure('run')
      state.rows = []
      actions.buildRows(1000)
      stopMeasure('run')
    },
    add: ({ state, actions }) => {
      startMeasure('add')
      actions.buildRows(1000)
      stopMeasure('add')
    },
    update: ({ state }) => {
      startMeasure('update')
      for (let i = 0; i < state.rows.length; i += 10) {
        state.rows[i].label += ' !!!'
      }
      stopMeasure('update')
    },
    select: ({ state, actions }) => row => {
      startMeasure('select')
      actions.deselectAll()
      state.selectedRow = row
      row.selected = true
      stopMeasure('select')
    },
    delete: ({ state }) => row => {
      startMeasure('delete')
      state.rows.splice(state.rows.indexOf(row), 1)
      stopMeasure('delete')
    },
    runLots: ({ state, actions }) => {
      startMeasure('runLots')
      state.rows = []
      actions.buildRows(10000)
      stopMeasure('runLots')
    },
    clear: ({ state }) => {
      startMeasure('clear')
      state.rows = []
      startMeasure('clear')
    },
    swapRows: ({ state }) => {
      startMeasure('swapRows')
      if (state.rows.length > 998) {
        const temp = state.rows[1]
        state.rows[1] = state.rows[998]
        state.rows[998] = temp
      }
      stopMeasure('swapRows')
    }
  }
})

export default appStore
