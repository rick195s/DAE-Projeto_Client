<template>
    <div>
      <b-table striped over :items="policies" :fields="fields">
        <template #cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/occurrences/create/`">
            Create Occurrence
        </nuxt-link>

      </template>
      </b-table>
      <nuxt-link to="/">
        Back
      </nuxt-link>

    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        fields: ['id', 'clientId', 'startDate', 'endDate', 'state', 'actions'],
        policies: []
      }
    },
    created () {
      this.$axios.$get('/api/policies/').then((policies) => {
        this.policies = policies
      })
    },

  }
  </script>
  <style></style>
