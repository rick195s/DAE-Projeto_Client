<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Policy Objects
      <router-link
        slot="right"
        to="/policyobjects/create"
        class="button"
      >
        Create Policy Object
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
        <policyObjects-table
          :data="policyObjects"
          :loading="loading"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import PolicyObjectsTable from '@/components/policyobjects/PolicyObjectsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    PolicyObjectsTable,
    NotificationBar
  },
  data () {
    return {
      titleStack: ['Admin', 'Policy Objects'],
      loading: false,
      policyObjects: []
    }
  },
  created () {
    this.loading = true
    this.$axios
      .$get('/api/policy_objects')
      .then((policyObjects) => {
        this.policyObjects = policyObjects
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
