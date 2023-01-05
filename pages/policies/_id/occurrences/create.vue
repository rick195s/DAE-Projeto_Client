<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Create Occurrence for Policy #{{ $route.params.id }}
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
        title="New Occurrence"
        icon="ballot"
      >
        <form @submit.prevent="formAction">
          <b-field
            label="Description"
            message="Your description. Max 255 characters"
            horizontal
          >
            <b-input
              v-model="form.description"
              type="textarea"
              placeholder="Explain how the problem"
              maxlength="255"
              minlength="10"
              required
            />
          </b-field>
          <file-upload ref="fileUploadComponent" />
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
                  @click="formReset"
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
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import HeroBar from '@/components/HeroBar.vue'
import FileUpload from '@/components/FileUpload.vue'

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    CardComponent,
    TitleBar,
    FileUpload
  },
  data () {
    return {
      titleStack: ['Admin', 'New Occurrence'],
      departments: ['Business Development', 'Marketing', 'Sales'],
      form: {
        description: null
      },
      isLoading: false
    }
  },

  methods: {
    formAction () {
      this.createOccurrence()
    },
    createOccurrence () {
      this.isLoading = true

      this.$axios
        .$post('/api/occurrences', {
          policyId: this.$route.params.id,
          repairShopId: 1,
          clientId: 1,
          description: this.form.description
        })
        .then((response) =>
          this.$refs.fileUploadComponent.uploadFiles(response.id)
        )
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.showError(error.response?.data.reason || 'Something went wrong')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    showError (message) {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        queue: false
      })
    },
    formReset () {
      this.form.description = null
    }
  }
})
</script>
