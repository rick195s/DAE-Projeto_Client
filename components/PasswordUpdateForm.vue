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
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data () {
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
    submit () {
      if (!this.validation()){
        return;
      }

      this.isLoading = true
      this.$store.dispatch('auth/updatePassword', this.form)
        .then(() => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Password updated',
            type: 'is-success'
          })
        })
        .catch(() => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Password update failed',
            type: 'is-danger'
          })
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
