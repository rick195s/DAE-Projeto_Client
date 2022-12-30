<template>
  <div>
    <h1>Create a new Occurrence</h1>
    <form
      :disabled="!isFormValid"
      @submit.prevent="create"
    >
      <b-form-group
        id="description"
        description="The description is required"
        label="Enter occurrence description"
        label-for="description"
        :invalid-feedback="invalidDescriptionFeedback"
        :state="isDescriptionValid"
      >
        <b-input
          id="description"
          v-model.trim="description"
          :state="isDescriptionValid"
          trim
        />
      </b-form-group>

      <p
        v-show="errorMsg"
        class="text-danger"
      >
        {{ errorMsg }}
      </p>
      <nuxt-link to="/policies">
        Return
      </nuxt-link>
      <button
        type="reset"
        @click="reset"
      >
        RESET
      </button>
      <button
        :disabled="!isFormValid"
        @click.prevent="create"
      >
        CREATE
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      description: null,
      errorMsg: false
    }
  },
  computed: {
    invalidDescriptionFeedback () {
      if (!this.description) {
        return null
      }
      const descriptionLen = this.description.length
      if (descriptionLen < 3 || descriptionLen > 15) {
        return 'The description must be between [3, 15] characters.'
      }
      return ''
    },
    isDescriptionValid () {
      if (this.invalidDescriptionFeedback === null) {
        return null
      }
      return this.invalidDescriptionFeedback === ''
    },

    isFormValid () {
      if (!this.isDescriptionValid) {
        return false
      }

      return true
    }
  },

  methods: {
    create () {
      this.$axios
        .$post('/api/occurrences', {
          id: 4,
          policyId: this.$route.params.id,
          repairShopId: 1,
          clientId: 1,
          description: this.description
        })
        .then((response) => {
          this.$router.push('/policies/')
        })
        .catch((error) => {
          this.errorMsg = error.response.data.message
        })
    },
    reset () {
      this.errorMsg = false
    }
  }
}
</script>
