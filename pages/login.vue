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
          <router-link
            to="/"
            class="button is-outlined is-black"
          >
            Dashboard
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
  name: 'LoginView',
  components: { CardComponent },
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
  created () {
    console.log(this.$store.state.rememberMe)
    if (this.$store.state.rememberMe) {
      this.$router.push('/')
    } else {
      this.$store.commit('logout')
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$router.push('/')
      }, 750)
    },
    loginClick () {
      console.log(this.form.remember)
      this.$axios
        .$post('/api/auth/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then((tokenAux) => {
          this.$buefy.snackbar.open({
            message: 'Login successful',
            type: 'is-success',
            queue: true
          })
          console.log(tokenAux)
          this.$store.commit('token', tokenAux)
          this.$store.commit('rememberMe', this.form.remember)
          const config = {
            headers: { Authorization: `Bearer ${tokenAux}` }
          }
          this.$store.commit('user', this.form)
          this.$axios
            .get('/api/auth/user', config)
            .then((user) => {
              console.log(user.data)
              this.$store.commit('user', user.data)

              window.location.pathname = '/'
            })
            .catch((error) => {
              this.$buefy.snackbar.open({
                message: error.message,
                type: 'is-danger',
                queue: true
              })
            })
        })
        .catch((error) => {
          this.$buefy.snackbar.open({
            message: error.message,
            type: 'is-danger',
            queue: true
          })
        })
    }
  }
})
</script>
