<template>
  <card-component
    title="Register"
    icon="lock"
  >
    <form
      method="POST"
      @submit.prevent="create"
    >
      <b-field label="Name">
        <b-input
          v-model="form.name"
          name="name"
          placeholder="Manuel"
          type="text"
          required
        />
      </b-field>
      <b-field label="E-mail Address">
        <b-input
          v-model="form.email"
          name="email"
          type="email"
          placeholder="xyz@mail.pt"
          required
        />
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="form.password"
          type="password"
          name="password"
          password-reveal
          required
        />
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Register
          </b-button>
        </div>
        <div class="control">
          <router-link
            to="/auth/login"
            class="button is-outlined is-black"
          >
            Login
          </router-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  components: {
    CardComponent
  },
  layout: 'guest',
  auth: false,
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    create () {
      if (!this.verifyForm()) {
        return
      }

      this.isLoading = true
      this.$axios
        .$post('/api/auth/register', this.form)
        .then(() => {
          this.showSnackbar('Register successful', 'is-success')

          return this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password
            }
          })
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.showSnackbar(error.response.data.message, 'is-danger')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    showSnackbar (message, type) {
      this.$buefy.snackbar.open({
        message,
        type: type || 'is-danger',
        queue: false
      })
    },
    verifyForm () {
      if (
        this.form.name === '' ||
        this.form.email === '' ||
        this.form.password === ''
      ) {
        this.$buefy.toast.open({
          message: 'Please fill all the fields',
          type: 'is-danger'
        })
        return false
      }

      if (this.form.name.length > 50) {
        this.$buefy.toast.open({
          message: 'Name must have less than 50 characters',
          type: 'is-danger'
        })
        return false
      }

      if (/^[a-z A-Z]+$/.test(this.form.name) === false) {
        this.$buefy.toast.open({
          message: 'Name must have only letters',
          type: 'is-danger'
        })
        return false
      }

      if (this.form.email.length > 50) {
        this.$buefy.toast.open({
          message: 'Email must have less than 50 characters',
          type: 'is-danger'
        })
        return false
      }

      if (this.form.email.indexOf('@') === -1) {
        this.$buefy.toast.open({
          message: 'Email must have @',
          type: 'is-danger'
        })
        return false
      }

      if (this.form.email.indexOf('.') === -1) {
        this.$buefy.toast.open({
          message: 'Email must have .',
          type: 'is-danger'
        })
        return false
      }

      if (this.form.password.length < 8) {
        this.$buefy.toast.open({
          message: 'Password must have at least 8 characters',
          type: 'is-danger'
        })
        return false
      }

      return true
    },
    reset () {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
    }
  }
})
</script>
