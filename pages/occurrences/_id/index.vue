<template>
  <div>
    <b-modal
      v-model="isFileCardModalActive"
      :width="640"
      scroll="keep"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
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
      <nuxt-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </nuxt-link>
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
            v-if="occurrence.endDate"
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
            type="is-info"
            :has-navigation="false"
          >
            <b-step-item icon="account-question-outline">
              Waiting Approval From Insurance
            </b-step-item>

            <b-step-item icon="check" />

            <b-step-item icon="account-question-outline">
              Waiting Approval From Repair Expert
            </b-step-item>

            <b-step-item icon="check-all" />
          </b-steps>
          <hr>
          <empty-section v-if="files.length == 0" />
          <span v-else>
            <img
              v-for="file in files"
              :key="file.path"
              class="image is-128x128 is-clickable"
              :src="file.path"
              :alt="file.name"
              @click="activeFileModal(file)"
            >
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

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    CardComponent,
    TitleBar,
    TilesBlock,
    EmptySection
  },
  data () {
    return {
      titleStack: ['Admin', 'Occurrence Details'],
      files: [],
      isFileCardModalActive: false,
      selectedFile: null,
      occurrence: null,
      stepIndex: 0
    }
  },
  created () {
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
        this.$buefy.snackbar.open({
          message: error.message,
          type: 'is-danger',
          queue: false
        })
      })
  },
  methods: {
    activeFileModal (file) {
      this.isFileCardModalActive = true
      this.selectedFile = file
    }
  }
})
</script>
