<template>
  <card-component
    title="Change Password"
    icon="lock"
  >
    <form @submit.prevent="submit">
      <b-field
        horizontal
        label="Current password"
        message="Required. Your current password"
      >
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
        />
      </b-field>
      <hr>
      <b-field
        horizontal
        label="New password"
        message="Required. New password"
      >
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <b-field
        horizontal
        label="Confirm password"
        message="Required. New password one more time"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-info"
            :loading="isLoading"
          >
            Submit
          </b-button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import {defineComponent} from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data() {
    return {
      isLoading: false,
      form: {
        password_current: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    submit() {
      if (!this.validation()) {
        return;
      }

      this.loading = true
      this.$axios
        .$put('/api/auth/updatePassword', {
          oldPassword: this.form.password_current,
          newPassword: this.form.password,
          confirmNewPassword: this.form.password_confirmation
        })
        .then(() => {
          this.$buefy.toast.open({
            message: 'Password updated successfully',
            type: 'is-success'
          })
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
    validation() {
      if (this.form.password == null || this.form.password_confirmation == null || this.form.password_current == null) {
        this.$buefy.toast.open({
          message: 'Please fill all fields',
          type: 'is-danger'
        })
        return false;
      }

      if (this.form.newPassword.length < 8) {
        this.$buefy.toast.open({
          message: 'Password must be at least 8 characters',
          type: 'is-danger'
        })
        return false;
      }

      if (this.form.password !== this.form.password_confirmation) {
        this.$buefy.toast.open({
          message: 'Passwords do not match',
          type: 'is-danger'
        })
        return false;
      }

      return true;
    }
  }
})
</script>
