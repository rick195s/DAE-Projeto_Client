import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = () => ({

  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false

})

export const mutations = {
  /* A fit-them-all commit */
  basic (state, payload) {
    state[payload.key] = payload.value
  },
  getRole () {
    return this.$store.state.userRole
  },

  /* Aside Mobile */
  asideMobileStateToggle (state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },

  /* Full Page mode */
  fullPage (state, payload) {
    state.isNavBarVisible = !payload
    state.isAsideVisible = !payload
    state.isFooterBarVisible = !payload
  }

}

export const actions = {
  // can only be called in mounted() hook or after
  asideDesktopOnlyToggle (store, payload = null) {
    let method

    switch (payload) {
      case true:
        method = 'add'
        break
      case false:
        method = 'remove'
        break
      default:
        method = 'toggle'
    }
    document.documentElement.classList[method]('has-aside-desktop-only-visible')
  },

  // can only be called in mounted() hook or after
  toggleFullPage ({ commit }, payload) {
    commit('fullPage', payload)

    document.documentElement.classList[!payload ? 'add' : 'remove']('has-aside-left', 'has-navbar-fixed-top')
  },

  fetch ({ commit }, payload) {
    axios
      .get(`data-sources/${payload}.json`)
      .then((r) => {
        if (r.data && r.data.data) {
          commit('basic', {
            key: payload,
            value: r.data.data
          })
        }
      })
      .catch(error => {
        alert(error.message)
      })
  }
}

export const getters = {
  container: state => state.container
}
