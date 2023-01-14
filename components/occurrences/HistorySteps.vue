<template>
  <b-steps
    v-model="stepIndex"
    :type="stepType"
    :has-navigation="false"
  >
    <b-step-item
      :clickable="false"
      :icon="iconStep0"
    >
      Waiting Approval From Insurance
    </b-step-item>
    <b-step-item
      :clickable="false"
      icon="check"
    />
    <b-step-item
      :clickable="false"
      icon="account-question-outline"
    >
      Waiting Repair From Repair Expert
    </b-step-item>
    <b-step-item
      :clickable="false"
      icon="check-all"
    />
  </b-steps>
</template>
<script>
export default {
  props: {
    historic: {
      type: Array,
      default: () => []
    }
  },
  expose: ['declined', 'approved', 'concluded'],
  data () {
    return {
      stepIndex: 0,
      iconStep0: 'account-question-outline',
      stepType: 'is-info'
    }
  },
  watch: {
    historic (val) {
      if (val.length === 0) {
        this.stepIndex = 0
      }

      val.forEach((historic) => {
        if (historic.state === 'A_AGUARDAR_APROVACAO_PELO_EXPERT') {
          this.approved()
        }
        if (historic.state === 'APROVADO_PELA_SEGURADORA') {
          this.approved()
        }
        if (historic.state === 'NAO_APROVADO_PELA_SEGURADORA') {
          this.declined()
        }
        if (historic.state === 'APROVADO_PELO_EXPERT') {
          this.concluded()
        }
      })
    }
  },
  methods: {
    concluded () {
      this.stepIndex = 3
      this.stepType = 'is-success'
    },
    declined () {
      this.stepIndex = 0
      this.stepType = 'is-danger'
      this.iconStep0 = 'close-circle-outline'
    },
    approved () {
      this.stepIndex = 2
      this.stepType = 'is-info'
      this.iconStep0 = 'account-question-outline'
    }
  }
}
</script>
