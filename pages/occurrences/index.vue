<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Occurrences
      <router-link
        slot="right"
        to="/occurrences/csv"
        class="button"
      >
        Create Ocurrence by CSV
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
        <occurrences-table
          :data="occurrences"
          :loading="loading"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import OccurrencesTable from '@/components/occurrences/OccurrencesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    OccurrencesTable,
    NotificationBar
  },
  data () {
    return {
      titleStack: ['Admin', 'My Occurrences'],
      loading: false,
      occurrences: []
    }
  },
  created () {
    this.loading = true
    this.$axios
      .$get('/api/occurrences/')
      .then((occurrences) => {
        this.occurrences = occurrences
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
