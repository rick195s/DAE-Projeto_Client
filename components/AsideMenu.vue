<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
  >
    <div class="aside-tools">
      <a
        class="navbar-item is-hidden-touch is-hidden-widescreen is-desktop-icon-only"
        @click="asideToggleDesktopOnly"
      >
        <b-icon icon="menu" />
      </a>
      <div class="aside-tools-label">
        <span><b>Admin</b> One</span>
      </div>
    </div>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in filteredMenus">
        <p
          v-if="typeof menuGroup === 'string'"
          :key="`label-${index}`"
          class="menu-label"
        >
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="`menu-${index}`"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import AsideMenuList from '@/components/AsideMenuList.vue'

export default defineComponent({
  name: 'AsideMenu',
  components: { AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      filteredMenus: []
    }
  },
  computed: {
    ...mapState(['isAsideVisible'])
  },
  created () {
    this.menu.forEach((group) => {
      if (!(group instanceof Array)) {
        this.filteredMenus.push(group)
        return
      }

      group = group.filter((item) => {
        if (item.roles.includes(this.$auth.user.role)) {
          return true
        }
        return false
      })

      this.filteredMenus.push(group)
    })
  },

  methods: {
    asideToggleDesktopOnly () {
      this.$store.dispatch('asideDesktopOnlyToggle')
    },
    menuClick (item) {
      //
    }
  }
})
</script>
