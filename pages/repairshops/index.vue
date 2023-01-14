<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Repair Shops
      <router-link
        slot="right"
        to="/repairshops/create"
        class="button"
      >
        Create Repair Shop
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
        <repairShops-table
          :data="repairShops"
          :loading="loading"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import RepairShopsTable from '@/components/repairshops/RepairShopsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    RepairShopsTable,
    NotificationBar
  },
  middleware: 'admin',
  data () {
    return {
      titleStack: ['Administrator', 'All Repair Shops'],
      loading: false,
      repairShops: []
    }
  },
  created () {
    this.loading = true
    this.$axios
      .$get('/api/repairshops/')
      .then((repairShops) => {
        this.repairShops = repairShops
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
