<template>
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
</template>
<script>
export default {
  props: {
    historic: {
      type: Array,
      default: () => []
    }
  },
  expose: ['declined', 'approved'],
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
          this.stepIndex = 2
        }
        if (historic.state === 'APROVADO_PELA_SEGURADORA') {
          this.stepIndex = 2
        }
      })
    }
  },
  methods: {
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
