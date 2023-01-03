<template>
  <div>
    <hero-bar>
      Create a Policy Object
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
        title="New Policy Object"
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
              placeholder="Name"
              required
            />
          </b-field>

          <b-field
            label="File Path"
            horizontal
          >
            <b-input
              v-model="form.filePath"
              type="text"
              placeholder="file path"
              required
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
        filePath: ''
      },
      isLoading: false
    }
  },
  methods: {
    create () {
      this.isLoading = true
      console.log('is loading : ' + this.isLoading)
      this.$axios
        .$post('/api/policy_objects', this.form)
        .then(() => {
          this.$router.push('/policyobjects')
        })
        .catch((error) => {
          alert(error.response.data.reason)
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
