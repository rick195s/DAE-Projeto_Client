<script>
export default {
  data() {
    return {
      id: null,
      name: null,
      policies: [],
      insurer_experts: [],
      repairShops: [],
      policyId
    }
  },
  created() {
    this.$axios.$get('/api/policies/all')
      .then(policies => {p
        this.policies = policies
      })
    this.$axios.$get('/api/insurer_experts/all')
      .then(insurer_experts => {ie
        this.insurer_experts = insurer_experts
      })
    this.$axios.$get('/api/repairShops/all')
      .then(repairShops => {rs
        this.repairShops = repairShops
      })
  },
  methods: {
    create() {
      this.$axios.$post('/api/insurers', {
        id: this.id,
        name: this.name,
        policyId: this.policyId
      })
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<template>
  <form @submit.prevent="create">
    <div>
      id: <input v-model="id" type="number">
    </div>
    <div>
      name: <input v-model="name" type="text">
    </div>
    <div>
      Policy id:
      <select v-model="policyId">
        <template v-for="polcy in policies">
          <option :key="polcy.id" :value="polcy.id">
            {{ polcy.id }}
          </option>
        </template>
      </select>
    </div>
    <!--<div>
      course code:
      <select v-model="courseCode">
        <template v-for="course in courses">
          <option :key="course.code" :value="course.code">
            {{ course.name }}
          </option>
        </template>
      </select>
    </div>
    <div>
      course code:
      <select v-model="courseCode">
        <template v-for="course in courses">
          <option :key="course.code" :value="course.code">
            {{ course.name }}
          </option>
        </template>
      </select>
    </div>-->
    <nuxt-link to="/">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
</template>


<style></style>
