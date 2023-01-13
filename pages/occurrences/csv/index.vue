<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Create Occurrence with a CSV
      <router-link
        slot="right"
        to="/"
        class="button"
        v-if="this.$auth.user.role !== 'REPAIR_SHOP_EXPERT' && this.$auth.user.role !== 'INSURER_EXPERT'"
      >
        Dashboard
      </router-link>
      <router-link
        v-else
        slot="right"
        to="/occurrences"
        class="button"
      >
        Occurrences
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="New Occurrence"
        icon="ballot"
      >
        <form @submit.prevent="formAction">
          <section>
            <b-field>
              <b-upload
                v-model="dropFiles"
                multiple
                drag-drop
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon
                        icon="upload"
                        size="is-large"
                      />
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div class="tags">
              <span
                v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary"
              >
                {{ file.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                />
              </span>
            </div>
          </section>

          <form-buttons
            :loading="loading"
            @reset="formReset"
          />
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

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    CardComponent,
    TitleBar
  },
  data () {
    return {
      titleStack: [this.$auth.user.role === 'ADMINISTRATOR' ? 'Administrator' : (this.$auth.user.role === 'CLIENT' ? 'Client' : 'Expert'), 'New Occurrence'],
      departments: ['Business Development', 'Marketing', 'Sales'],
      form: {
        description: null
      },
      loading: false,
      dropFiles: []
    }
  },

  methods: {
    formAction () {
      this.createOccurrence()
    },
    createOccurrence () {
      this.loading = true

      const formData = new FormData()

      const file = this.dropFiles[0]

      formData.append('file', file)

      this.$axios
        .$post('/api/occurrences/csv', formData, {
          'Content-Type': 'multipart/form-data'
        })
        .then((response) => {
          console.log('occurrencia criada: ', response.data)
        })
        .then(() => {
          this.$router.push('/occurrences')
        })
        .catch((error) => {
          this.showError(error.response?.data.reason || 'Something went wrong')
        })
        .finally(() => {
          this.loading = false
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
      this.$refs.fileUploadComponent.resetFiles()
      this.form.description = null
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    }
  }
})
</script>
