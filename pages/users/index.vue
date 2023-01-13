<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Users
      <router-link
        slot="right"
        to="/users/create"
        class="button"
      >
        Create User
      </router-link>
    </hero-bar>

    <section class="section is-main-section">
      <notification-bar class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification-bar>

      <card-component class="has-table has-mobile-sort-spaced">
        <users-table
          :data="users"
          :loading="loading"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import UsersTable from '@/components/users/UsersTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    UsersTable,
    NotificationBar
  },
  middleware: 'admin',
  data () {
    return {
      titleStack: ['Administrator', 'All Users'],
      loading: false,
      users: []
    }
  },
  created () {
    this.loading = true
    this.$axios
      .$get('/api/users/')
      .then((users) => {
        this.users = users
      })
      .catch((error) => {
        this.$buefy.snackbar.open({
          message: error.message,
          type: 'is-danger',
          queue: true
        })
      })
      .finally(() => {
        this.loading = false
      })
  }
})
</script>
