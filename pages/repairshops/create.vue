<template>
  <div>
    <hero-bar>
      Create a Repair Shop
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
        title="New Repair Shop"
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
              placeholder="PCDIGA"
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
            label="Phone Number"
            horizontal
          >
            <b-input
              v-model="form.phone"
              type="tel"
              required
              placeholder="912345678"
            />
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
        phone: ''
      },
      isLoading: false
    }
  },
  methods: {
    create () {
      this.isLoading = true
      console.log('is loading : ' + this.isLoading)
      this.$axios
        .$post('/api/repairshops', this.form)
        .then(() => {
          this.$router.push('/repairshops')
        })
        .finally(() => {
          this.isLoading = false
        })
      // this.isLoading não vai atualizar
      // this.isLoading = false
    },
    reset () {
      this.form.name = ''
      this.form.email = ''
      this.form.phone = ''
    }
  }
})
</script>
