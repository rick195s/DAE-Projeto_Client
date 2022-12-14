<template>
  <div>
    <b-table striped over :items="occurrences" :fields="fields">
      <template #cell(actions)="row">
        <nuxt-link class="btn btn-link" >
          Details
        </nuxt-link>
        <span class="btn btn-link">
          Delete
        </span>
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
      fields: ['id', 'clientId', 'description', 'startDate', 'approvalType'],
      occurrences: []
    }
  },
  created () {
    this.$axios.$get('/api/occurrences/').then((occurrences) => {
      this.occurrences = occurrences
    })
  },

}
</script>
<style></style>
