<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar> Policie #{{ $route.params.id }} </hero-bar>
    <section class="section is-main-section">
      <tiles-block>
        <card-component
          title="Details"
          icon="account"
          class="tile is-child"
        >
          <b-field label="State">
            <b-input
              :value="policie?.state ?? 'State'"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <hr>
          <b-field label="Client ID">
            <b-input
              :value="policie?.clientId ?? 'ClientId'"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <hr>
          <b-field label="Insurer ID">
            <b-input
              :value="policie?.insurerId ?? 'InsurerId'"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <hr>
          <b-field label="Started at">
            <b-input
              :value="policie?.startDate ?? 'Start'"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field
            v-if="policie?.endDate"
            label="Ended at"
          >
            <b-input
              :value="policie.endDate"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component><card-component
          v-if="policie?.policyTypeDetails"
          title="Details about the Type"
          icon="account"
          class="tile is-child"
        >
          <b-field label="Type">
            <b-input
              :value="policie?.policyTypeDetails?.type ?? 'Type'"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <hr>

          <b-field label="Object Type">
            <b-input
              :value="policie?.policyTypeDetails?.objectType ?? 'objectType'"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <hr>

          <b-field label="Description">
            <b-input
              :value="policie?.policyTypeDetails?.description ?? 'Description'"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles-block>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent
  },
  data () {
    return {
      titleStack: ['Policies'],
      loading: false,
      policie: {}
    }
  },
  created () {
    this.loading = true
    this.$axios
      .$get(`/api/policies/${this.$route.params.id}`)
      .then((policie) => {
        this.policie = policie
        console.log(policie)
      })
      .catch((error) => {
        this.$buefy.snackbar.open({
          message: error.message,
          type: 'is-danger',
          queue: true
        })
      })
      .finally(() => {
        this.loading = false
      })
  }
})
</script>
