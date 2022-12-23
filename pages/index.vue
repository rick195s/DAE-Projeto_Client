<script>
export default {
  data() {
    return {
      fields: ['id', 'name', 'polices'],/*, 'policies', 'insurer_experts', 'repairShops'],*/
      insurers: []
    }
  },
  created() {
    this.$axios.$get('http://localhost:8080/project/api/insurers')
      .then((insurers) => {
        this.insurers = insurers
      })
  }
}
</script>

<template>
  <b-container>
    <h1>Welcome to Academics Management</h1>
    <b-table striped over :items="insurers" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link
          class="btn btn-link"
          :to="`/insurers/${row.item.id}`">Details</nuxt-link>
      </template>
    </b-table>
    <nuxt-link to="/">Back</nuxt-link>
  </b-container>
</template>

<style></style>
