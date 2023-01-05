<template>
  <div>
    <b-modal
      v-model="isFileCardModalActive"
      :width="640"
      scroll="keep"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img
              :src="selectedFile?.path"
              :alt="selectedFile?.name"
            >
          </figure>
        </div>
      </div>
    </b-modal>

    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Occurrence #{{ $route.params.id }}
      <action-buttons
        slot="right"
        @approved="stepIndex = 2"
        @declined="declined"
      />
    </hero-bar>
    <section class="section is-main-section">
      <tiles-block>
        <card-component
          title="Details"
          icon="account"
          class="tile is-child"
        >
          <b-field label="Description">
            <b-input
              :value="occurrence?.description ?? 'Description'"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
          <b-field label="Started at">
            <b-input
              :value="occurrence?.startDate ?? 'Start'"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field
            v-if="occurrence?.endDate"
            label="Ended at"
          >
            <b-input
              :value="occurrence.endDate"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Status">
            <b-input
              :value="occurrence?.approvalType ?? 'Status'"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component><card-component
          title="Historic & Files"
          icon="account"
          class="tile is-child"
        >
          <b-steps
            v-model="stepIndex"
            :type="stepType"
            :has-navigation="false"
          >
            <b-step-item :icon="iconStep0">
              Waiting Approval From Insurance
            </b-step-item>
            <b-step-item icon="check" />
            <b-step-item icon="account-question-outline">
              Waiting Repair From Repair Expert
            </b-step-item>
            <b-step-item icon="check-all" />
          </b-steps>
          <hr>
          <empty-section v-if="files.length == 0" />
          <span v-else>
            <file-card
              v-for="file in files"
              :key="file.path"
              :file="file"
              @img-error="onImgError(file)"
              @clicked-file="clickedFile(file)"
            />
          </span>
        </card-component>
      </tiles-block>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import HeroBar from '@/components/HeroBar.vue'
import TilesBlock from '@/components/TilesBlock.vue'
import EmptySection from '@/components/EmptySection.vue'
import FileCard from '@/components/FileCard.vue'
import ActionButtons from '@/components/occurrences/ActionButtons.vue'

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    CardComponent,
    TitleBar,
    TilesBlock,
    EmptySection,
    FileCard,
    ActionButtons
  },
  data () {
    return {
      titleStack: ['Admin', 'Occurrence Details'],
      files: [],
      isFileCardModalActive: false,
      selectedFile: null,
      occurrence: null,
      stepIndex: 0,
      defaultImg: '~/assets/img/file.png',
      iconStep0: 'account-question-outline',
      stepType: 'is-info'
    }
  },
  created () {
    this.getOccurrenceDetails()
    this.getOccurrenceFiles()
  },
  methods: {
    declined () {
      this.stepIndex = 0
      this.stepType = 'is-danger'
      this.iconStep0 = 'close-circle-outline'
    },
    onImgError (file) {
      file.default = this.defaultImg
    },
    download (fileToDownload) {
      this.$axios
        .$get(
          `/api/occurrences/${this.$route.params.id}/files/download/${fileToDownload.id}`,
          { responseType: 'arraybuffer' }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))

          this.files.push({
            path: url,
            name: fileToDownload.name
          })
        })
        .catch((error) => {
          this.showError(error.message)
        })
    },
    getOccurrenceFiles () {
      this.$axios
        .$get(`/api/occurrences/${this.$route.params.id}/files`)
        .then((response) => {
          response.forEach((file) => {
            this.download(file)
          })
        })
        .catch((error) => {
          this.showError(error.message)
        })
    },
    getOccurrenceDetails () {
      this.$axios
        .$get(`/api/occurrences/${this.$route.params.id}`)
        .then((response) => {
          console.log(response)
          this.occurrence = response
          response.historic.forEach((historic) => {
            if (historic.state === 'A_AGUARDAR_APROVACAO_PELO_EXPERT') {
              this.stepIndex = 2
            }
          })
        })
        .catch((error) => {
          this.showError(error.message)
        })
    },
    showError (message) {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        queue: false
      })
    },
    clickedFile (file) {
      if (!file.default) {
        this.activeFileModal(file)
      }

      const link = document.createElement('a')
      link.href = file.path
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    activeFileModal (file) {
      this.isFileCardModalActive = true
      this.selectedFile = file
    }
  }
})
</script>
