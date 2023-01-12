<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Profile
      <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles-block>
        <profile-update-form class="tile is-child" />
        <card-component
          title="Profile"
          icon="account"
          class="tile is-child"
        >
          <b-field label="Name">
            <b-input
              :value="userName"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input
              :value="userEmail"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles-block>
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import ProfileUpdateForm from '@/components/ProfileUpdateForm.vue'
import PasswordUpdateForm from '@/components/PasswordUpdateForm.vue'
import TilesBlock from '@/components/TilesBlock.vue'
export default defineComponent({
  name: 'ProfileView',
  components: {
    TilesBlock,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent
  },
  data () {
    return {
      titleStack: ['Admin', 'Profile']
    }
  },
  methods: {
    update () {
      if (!this.verifyForm()) {
        return
      }
      this.isLoading = true
      console.log('is loading : ' + this.isLoading)
      this.$axios.put('/api/users/' + this.$route.params.id, this.form).then(() => {
        this.$store.commit('user', this.form)
        this.$router.push('/users')
        this.isLoading = false
      })
      // this.isLoading não vai atualizar
      // this.isLoading = false
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

  },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ])
  }
})
</script>
