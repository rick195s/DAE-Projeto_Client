<template>
  <div>
    <hero-bar>
      Create a User
      <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="New User"
        icon="ballot"
      >
        <form @submit.prevent="create">
          <b-field
            label="Name"
            horizontal
          >
            <b-input
              v-model="form.name"
              type="text"
              maxlength="50"
              placeholder="Manuel"
              required
            />
          </b-field>

          <b-field
            label="Email"
            horizontal
          >
            <b-input
              v-model="form.email"
              type="email"
              placeholder="xyz@mail.pt"
              required
            />
          </b-field>

          <b-field
            label="Password"
            horizontal
          >
            <b-input
              v-model="form.password"
              type="password"
              password-reveal
              required
            />
          </b-field>
          <b-field
            horizontal
            label="Role"
          >
            <b-select v-model="form.role" placeholder="Select a role">
              <option value="CLIENT">Client</option>
              <option value="INSURER_EXPERT">Insurer Expert</option>
              <option value="REPAIR_SHOP_EXPERT">Repair Shop Expert</option>
            </b-select>
          </b-field>

          <hr>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  type="is-info"
                  :loading="isLoading"
                >
                  Submit
                </b-button>
              </div>
              <div class="control">
                <b-button
                  type="is-info"
                  native-type="button"
                  outlined
                  @click="reset"
                >
                  Reset
                </b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  components: {
    HeroBar,
    CardComponent
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role: ''
      },
      isLoading: false
    }
  },
  methods: {
    create () {
      if (!this.verifyForm()){
        return
      }

      this.isLoading = true
      console.log('is loading : ' + this.isLoading)
      this.$axios.$post('/api/users', this.form).then(() => {
        this.$router.push('/users')
        this.isLoading = false
      })
      // this.isLoading não vai atualizar
      // this.isLoading = false
    },
    verifyForm () {
      if (this.form.name === '' || this.form.email === '' || this.form.password === '' || this.form.role === '') {
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

      if (/^[a-zA-Z]+$/.test(this.form.name) === false) {
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