<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles-block>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="512"
          label="Clients"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </tiles-block>
      <card-component
        title="Policies"
        class="has-table has-mobile-sort-spaced"
      >
        <policies-table
          :data="policies"
          :columns="columns"
          :loading="loading"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import TilesBlock from '@/components/TilesBlock.vue'
import CardWidget from '@/components/CardWidget.vue'
import CardComponent from '@/components/CardComponent.vue'
import PoliciesTable from '@/components/policies/PoliciesTable.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PoliciesTable,
    CardComponent,
    CardWidget,
    TilesBlock,
    HeroBar,
    TitleBar
  },
  middleware: 'policies',
  data () {
    return {
      titleStack: [
        this.$auth.user.role === 'ADMINISTRATOR'
          ? 'Administrator'
          : this.$auth.user.role === 'CLIENT'
            ? 'Client'
            : 'Expert',
        'Dashboard'
      ],
      chartData: null,
      policies: [],
      loading: false,
      columns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true
        },
        {
          field: 'insurerId',
          label: 'Insurer ID'
        },
        {
          field: 'state',
          label: 'State',
          sortable: true
        },
        {
          field: 'startDate',
          label: 'Start Date',
          centered: true
        },
        {
          field: 'endDate',
          label: 'End Date',
          centered: true
        }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            display: false
          },
          x: {
            display: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  mounted () {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  created () {
    this.loading = true
    this.$axios
      .$get('/api/policies/')
      .then((policies) => {
        this.policies = policies
      })
      .catch((error) => {
        this.$buefy.snackbar.open({
          message: error.message,
          type: 'is-danger',
          queue: false
        })
      })
      .finally(() => {
        this.loading = false
      })
  }
})
</script>
