<template>
  <card-component
    title="Login"
    icon="lock"
  >
    <router-link
      slot="button"
      to="/"
      class="button is-small"
    >
      Dashboard
    </router-link>

    <form
      method="POST"
      @submit.prevent="loginClick"
    >
      <b-field label="E-mail Address">
        <b-input
          v-model="form.email"
          name="email"
          type="email"
          required
        />
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="form.password"
          type="password"
          name="password"
          required
        />
      </b-field>

      <b-field>
        <b-checkbox
          v-model="form.remember"
          type="is-black"
          class="is-thin"
        >
          Remember me
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Login
          </b-button>
        </div>
        <div class="control">
          <nuxt-link
            to="/register"
            class="button is-outlined is-black"
          >
            Register
          </nuxt-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'LoginView',
  components: { CardComponent },
  layout: 'guest',
  data () {
    return {
      isLoading: false,
      user: [],
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    loginClick () {
      this.isLoading = true
      this.$axios
        .$post('/api/auth/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then((tokenAux) => {
          this.showSnackbar('Login successful', 'is-success')

          this.$store.commit('token', tokenAux)
          const config = {
            headers: { Authorization: `Bearer ${tokenAux}` }
          }
          this.$store.commit('user', this.form)
          return this.$axios.get('/api/auth/user', config)
        })
        .then((user) => {
          console.log(user.data)
          this.$store.commit('user', user.data)
          this.$router.push('/')
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || 'Login Failed')
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
    }
  }
})
</script>
