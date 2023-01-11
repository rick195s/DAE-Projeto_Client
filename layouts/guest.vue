<template>
  <div id="app">
    <section class="section hero is-fullheight is-error-section">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-two-fifths">
              <nuxt />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot has-text-centered">
        <div class="logo" />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import menu from '@/assets/js/menu.js'

export default defineComponent({
  name: 'AppComponent',
  data () {
    return {
      menu
    }
  },
  mounted () {
    this.$store.dispatch('toggleFullPage', true)
    this.$store.dispatch('asideDesktopOnlyToggle', false)
  },
  created () {}
})
</script>
