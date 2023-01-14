<template>
  <div>
    <b-loading
      v-model="isPageLoading"
      is-full-page
    />
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
      <span
        slot="right"
        style="display: inline-flex"
      >
        <div class="mr-3">
          <b-button @click="loadAll">
            <b-icon icon="reload" />
          </b-button>
        </div>
        <action-buttons
          v-if="['ADMINISTRATOR', 'INSURER_EXPERT'].includes($auth.user.role)"
          @approved="
            $refs.historySteps.approved()
            showRepairShops = true
          "
          @declined="
            $refs.historySteps.declined()
            showRepairShops = false
          "
        />
      </span>
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
        </card-component><card-component
          title="Historic & Files"
          icon="account"
          class="tile is-child"
        >
          <history-steps
            ref="historySteps"
            :historic="historic"
          />
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
      <tiles-block>
        <card-component
          title="Photos of repaired object"
          icon="account"
          class="tile is-child"
        >
          <span v-if="showRepairShops && ['CLIENT'].includes($auth.user.role)">
            <b-field
              horizontal
              label="Select a repair shop"
            >
              <b-select
                v-model="selectedRepairShopId"
                placeholder="Select a name"
                :loading="repairShopsLoading"
              >
                <option
                  v-for="option in repairShops"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
            <b-field
              label="or specify a new one"
              horizontal
            >
              <b-input
                v-model="form.name"
                placeholder="Name"
                maxlength="30"
              />
              <b-input
                v-model="form.email"
                placeholder="Email"
                type="email"
                value="john@"
                maxlength="30"
              />
              <b-input
                v-model="form.phone"
                placeholder="Phone"
                maxlength="9"
              />
            </b-field>
          </span>
          <!-- Everyone can see this because everyone can upload occurrence files (extra) -->
          <file-upload ref="fileUploadComponent" />
          <form-buttons
            :loading="loading"
            @submit="submit"
            @reset="resetForm"
          />
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
import FileUpload from '@/components/FileUpload.vue'
import FormButtons from '@/components/FormButtons.vue'
import ActionButtons from '@/components/occurrences/ActionButtons.vue'
import HistorySteps from '@/components/occurrences/HistorySteps.vue'

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    CardComponent,
    TitleBar,
    TilesBlock,
    EmptySection,
    FileCard,
    FileUpload,
    ActionButtons,
    FormButtons,
    HistorySteps
  },
  data () {
    return {
      titleStack: [
        this.$auth.user.role === 'ADMINISTRATOR'
          ? 'Administrator'
          : this.$auth.user.role === 'CLIENT'
            ? 'Client'
            : 'Expert',
        'Occurrence Details'
      ],
      files: [],
      isFileCardModalActive: false,
      selectedFile: null,
      occurrence: null,
      defaultImg: '~/assets/img/file.png',
      loading: false,
      isPageLoading: true,
      repairShops: [],
      repairShopsLoading: true,
      showRepairShops: false,
      selectedRepairShopId: null,
      form: {
        name: '',
        email: '',
        phone: ''
      },
      historic: []
    }
  },
  created () {
    this.loadAll()
  },
  methods: {
    loadAll () {
      this.isPageLoading = true
      this.getOccurrenceDetails()
      this.getOccurrenceFiles()
    },
    submit () {
      this.uploadFiles()
      if (this.selectedRepairShopId) {
        setTimeout((_) => {
          this.loading = true
        }, 1)
        this.$axios
          .$patch(
            `api/occurrences/${this.$route.params.id}/repair-shop/${this.selectedRepairShopId}`
          )
          .then((response) => {
            this.showSnackbar('Success selecting repair shop', 'is-success')
          })
          .catch((error) => {
            this.showSnackbar(error.response?.data.reason || error.message)
          })
          .finally(() => {
            this.loading = false
          })
      } else if (this.form.name && this.form.email && this.form.phone) {
        setTimeout((_) => {
          this.loading = true
        }, 1)
        this.$axios
          .$post(
            `api/occurrences/${this.$route.params.id}/repair-shop`,
            this.form
          )
          .then((response) => {
            this.showSnackbar('Success selecting repair shop', 'is-success')
          })
          .catch((error) => {
            this.showSnackbar(error.response?.data.reason || error.message)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    resetForm () {
      this.form = {
        name: '',
        email: '',
        phone: ''
      }
      this.selectedRepairShopId = null
      this.$refs.fileUploadComponent.resetFiles()
    },
    uploadFiles () {
      this.loading = true
      this.$refs.fileUploadComponent
        .uploadFiles(this.$route.params.id)
        .then((filesUploaded) => {
          if (filesUploaded !== 0) {
            this.getOccurrenceFiles()
            this.$refs.fileUploadComponent.resetFiles()
            this.showSnackbar('Success uploading files', 'is-success')
          }
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },

    onImgError (file) {
      file.default = true
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
            name: fileToDownload.name,
            default: false
          })
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || error.message)
        })
    },
    getRepairShops () {
      this.repairShopsLoading = true
      this.repairShops = []
      this.$axios
        .$get(`/api/insurers/${this.occurrence?.insurerId}/repair-shops`)
        .then((response) => {
          response.forEach((repairShop) => {
            this.repairShops.push(repairShop)
          })
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || error.message)
        })
        .finally(() => {
          this.repairShopsLoading = false
        })
    },
    getOccurrenceFiles () {
      this.files = []
      this.$axios
        .$get(`/api/occurrences/${this.$route.params.id}/files`)
        .then((response) => {
          response.forEach((file) => {
            this.download(file)
          })
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || error.message)
        })
    },
    getOccurrenceDetails () {
      this.$axios
        .$get(`/api/occurrences/${this.$route.params.id}`)
        .then((response) => {
          if (response.approvalType === 'APPROVED') {
            this.showRepairShops = true
          }
          this.occurrence = response
          this.historic = response.historic
        })
        .then(() => {
          this.getRepairShops()
        })
        .catch((error) => {
          this.showSnackbar(error.response?.data.reason || error.message)
        })
        .finally(() => {
          this.isPageLoading = false
        })
    },
    showSnackbar (message, type) {
      this.$buefy.snackbar.open({
        message,
        type: type || 'is-danger',
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
