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
      <card-component class="has-table has-mobile-sort-spaced">
        <users-table
          :data="users"
          :loading="loading"
          :total="total"
          :per-page="perPage"
          @page-change="pageChange"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
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
    UsersTable
  },
  middleware: 'admin',
  data () {
    return {
      titleStack: ['Administrator', 'All Users'],
      loading: false,
      users: [],
      total: 0,
      perPage: 10
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    loadUsers (url) {
      this.loading = true
      this.$axios
        .$get(url || '/api/users/')
        .then((users) => {
          console.log(users)
          this.total = users.metadata.totalCount
          this.users = users.data
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
    },
    pageChange (page) {
      this.loadUsers(
        '/api/users?offset=' +
          (page - 1) * this.perPage +
          '&limit=' +
          this.perPage
      )
    }
  }
})
</script>
