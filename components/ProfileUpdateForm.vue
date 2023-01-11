<template>
  <card-component
    title="Edit Profile"
    icon="account-circle"
  >
    <form @submit.prevent="submit">
      <b-field
        horizontal
        label="Name"
        message="Required. Your name"
      >
        <b-input
          v-model="form.name"
          name="name"
          required
        />
      </b-field>
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
        </b-field>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'ProfileUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      form: {
        name: ''
      },
      isLoading: false
    }
  },
  computed: {
    userName: {
      get: function () {
        return this.$store.state.userName
      },
      set: function (name) {
        this.$store.commit('user', { name })
      }
    },
    userEmail: {
      get: function () {
        return this.$store.state.userEmail
      },
      set: function (email) {
        this.$store.commit('user', { email })
      }
    }
  },
  methods: {
    submit () {
      if (!this.verifyForm()) {
        return
      }
      this.isLoading = true
      let id = 0
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }
      this.$axios.get('/api/auth/user', config)
        .then((user) => {
          console.log(user.data)
          id = user.data.id

          console.log('is loading : ' + this.isLoading)
          this.$axios.put('/api/users/'+ id, this.form).then(() => {
            this.$store.commit('user', this.form)
            this.$router.push('/profile')
            this.isLoading = false
          })
        })
    },
    verifyForm () {
      if (this.form.name === '') {
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

      if (/^[a-zA-Z .]+$/.test(this.form.name) === false) {
        this.$buefy.toast.open({
          message: 'Name must have only letters',
          type: 'is-danger'
        })
        return false
      }
      return true
    }
  }
})
</script>
