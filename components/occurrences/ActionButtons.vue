<template>
  <b-field grouped>
    <div class="control">
      <b-button
        native-type="submit"
        type="is-info"
        outlined
        @click="approveOccurrence"
      >
        Approve
      </b-button>
    </div>
    <div class="control">
      <b-button
        type="is-info"
        native-type="button"
        outlined
        @click="declineOccurrence"
      >
        Decline
      </b-button>
    </div>
  </b-field>
</template>
<script>
export default {
  emits: ['approved', 'declined'],
  methods: {
    approveOccurrence () {
      this.$axios
        .$put(`/api/occurrences/${this.$route.params.id}/approved`)
        .then((response) => {
          this.$emit('approved')
        })
        .catch((error) => {
          this.showError(error.message)
        })
    },
    declineOccurrence () {
      this.$axios
        .$put(`/api/occurrences/${this.$route.params.id}/declined`)
        .then((response) => {
          this.$emit('declined')
        })
        .catch((error) => {
          this.showError(error.message)
        })
    }
  }
}
</script>
