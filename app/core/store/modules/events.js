import { getAllEvents } from '../../api/events'

export default {
  namespaced: true,
  state: {
    events: {},
    loading: false,

    eventPanel: {
      visible: false,
      type: 'info',
      editableEvent: undefined
    }
  },
  getters: {
    myEventInstances (state) {
      return Object.values(state.events).map(e => e.instances)
    },
    eventPanelVisible (state) {
      return state.eventPanel.visible
    },
    eventPanelType (state) {
      return state.eventPanel.type
    },
    eventPanelEvent (state) {
      return state.eventPanel.editableEvent
    }
  },
  mutations: {
    setEvent (state, event) {
      Vue.set(state.events, event._id, event)
    },
    openEventPanel (state, { type = 'info', event = undefined } = {}) {
      Vue.set(state.eventPanel, 'visible', true)
      Vue.set(state.eventPanel, 'type', type)
      Vue.set(state.eventPanel, 'editableEvent', event)
    },
    closeEventPanel (state) {
      Vue.set(state.eventPanel, 'visible', false)
    }
  },
  actions: {
    async fetchAllEvents ({ commit }) {
      const events = await getAllEvents()
      for (const event of events) {
        commit('setEvent', event)
      }
    }
  }
}
