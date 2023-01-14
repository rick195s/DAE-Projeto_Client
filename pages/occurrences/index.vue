<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Occurrences
      <router-link
        v-if="this.$auth.user.role !== 'ADMINISTRATOR' && this.$auth.user.role !== 'REPAIR_SHOP_EXPERT' && this.$auth.user.role !== 'INSURER_EXPERT'"
        slot="right"
        to="/occurrences/csv"
        class="button"
      >
        Create Ocurrence by CSV
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced">
        <occurrences-table
          :data="occurrences"
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
    OccurrencesTable
  },
  data () {
    return {
      titleStack: [
        this.$auth.user.role === 'ADMINISTRATOR'
          ? 'Administrator'
          : this.$auth.user.role === 'CLIENT'
            ? 'Client'
            : 'Expert',
        'My Occurrences'
      ],
      loading: false,
      occurrences: [],
      total: 0,
      perPage: 5
    }
  },
  created () {
    this.loadOccurrences()
  },
  methods: {
    loadOccurrences (url) {
      this.loading = true
      this.$axios
        .$get(url || '/api/occurrences')
        .then((occurrences) => {
          this.total = occurrences.metadata.totalCount
          this.occurrences = occurrences.data
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
      this.loadOccurrences(
        '/api/occurrences?offset=' +
          (page - 1) * this.perPage +
          '&limit=' +
          this.perPage
      )
    }
  }
})
</script>
