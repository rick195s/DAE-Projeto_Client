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
      occurrence: null
    }
  },
  created () {
    this.$axios
      .$get(`/api/occurrences/${this.$route.params.id}`)
      .then((response) => {
        console.log(response)
        this.occurrence = response
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
