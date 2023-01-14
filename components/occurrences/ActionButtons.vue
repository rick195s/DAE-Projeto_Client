<template>
  <b-field
    v-if="
      ['ADMINISTRATOR', 'INSURER_EXPERT', 'REPAIR_SHOP_EXPERT'].includes(
        $auth.user.role
      )
    "
    grouped
  >
    <div
      v-if="enabled"
      class="control"
    >
      <b-button
        native-type="submit"
        type="is-info"
        outlined
        :loading="approveLoading"
        @click="approveOccurrence"
      >
        Approve
      </b-button>
    </div>
    <div
      v-if="enabled"
      class="control"
    >
      <b-button
        type="is-info"
        native-type="button"
        outlined
        :loading="declineLoading"
        @click="declineOccurrence"
      >
        Decline
      </b-button>
    </div>
    <div
      v-if="
        concludeEnabled &&
          ['ADMINISTRATOR', 'REPAIR_SHOP_EXPERT'].includes($auth.user.role)
      "
      class="control"
    >
      <b-button
        type="is-info"
        native-type="button"
        outlined
        :loading="concludeLoading"
        @click="concludeOccurrence"
      >
        Conclude
      </b-button>
    </div>
  </b-field>
</template>
<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    concludeEnabled: {
      type: Boolean,
      default: true
    }
  },
  emits: ['approved', 'declined', 'concluded'],
  data () {
    return {
      approveLoading: false,
      declineLoading: false,
      concludeLoading: false
    }
  },
  methods: {
    showError (message) {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        queue: false
      })
    },
    concludeOccurrence () {
      this.concludeLoading = true
      this.$axios
        .$patch(`/api/occurrences/${this.$route.params.id}/concluded`)
        .then((response) => {
          this.$emit('concluded')
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.concludeLoading = false
        })
    },
    approveOccurrence () {
      this.approveLoading = true
      this.$axios
        .$patch(`/api/occurrences/${this.$route.params.id}/approved`)
        .then((response) => {
          this.$emit('approved')
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.approveLoading = false
        })
    },
    declineOccurrence () {
      this.declineLoading = true
      this.$axios
        .$patch(`/api/occurrences/${this.$route.params.id}/declined`)
        .then((response) => {
          this.$emit('declined')
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.declineLoading = false
        })
    }
  }
}
</script>
