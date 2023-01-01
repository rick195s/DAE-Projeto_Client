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
          <div>
            <div>
              <b-field
                label="Name"
                horizontal
              >
                <b-input
                  v-model="name"
                  type="text"
                  placeholder="Manuel"
                  required/>
                </b-field>
            </div>
            <div>
              <b-field
                label="Email"
                horizontal
              >
                <b-input
                  v-model="email"
                  type="email"
                  placeholder="Manuel@gmail.com"
                  required/>
              </b-field>
            </div>
            <div>
              <b-field
                label="Phone Number"
                horizontal
              >
                <b-input
                  v-model="phone"
                  type="number"
                  placeholder="912345678"
                  required/>
              </b-field>
            </div>
          </div>
          <div>
            <hr>
            <b-field horizontal>
            <b-button type="is-info" native-type="submit">Create</b-button>
            </b-field>
          </div>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {mapState} from 'vuex'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  components: {
    HeroBar,
    CardComponent
  },
  data() {
    return {
      loading: false,
      name: '',
      email: '',
      phone: ''
    }
  },
  computed: {
    ...mapState({
      repairShops: state => state.repairShops
    })
  },
  methods: {
    create() {
      this.$axios.$post('/api/repairshops', {
        name: this.name,
        email: this.email,
        phone: this.phone
      })
        .then(() => {
          this.$router.push('/repairshops')
        })
    }
  }
})
</script>
