<template>
    <div>
      <title-bar :title-stack="titleStack" />
      <hero-bar>
        Create Occurrence with a CSV
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
            <section>
        <b-field>
            <b-upload v-model="dropFiles"
                multiple
                drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon
                                icon="upload"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                    </div>
                </section>
            </b-upload>
        </b-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
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

        var formData = new FormData();

        var file = this.dropFiles[0];

        formData.append("file", file);

        this.$axios
          .$post('/api/occurrences/csv', formData,{
                'Content-Type': 'multipart/form-data'
          })
          .then((response) => {
            console.log('occurrencia criada: ', response)
          })
          .then(() => {
            this.$router.push('/')
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
      deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
    }
  })
  </script>
  