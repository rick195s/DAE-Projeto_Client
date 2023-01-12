<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import menu from '@/assets/js/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'AppComponent',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu
    }
  },
  mounted () {
    this.$store.dispatch('toggleFullPage', false)
    this.$store.dispatch('asideDesktopOnlyToggle', true)
  },
  created () {}
})
</script>
