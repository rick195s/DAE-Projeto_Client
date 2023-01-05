<template>
  <b-field horizontal>
    <b-field grouped>
      <div class="control">
        <b-button
          native-type="submit"
          type="is-info"
          @click="submit"
        >
          Submit
        </b-button>
      </div>
      <div class="control">
        <b-button
          type="is-info"
          native-type="button"
          outlined
          @click="reset"
        >
          Reset
        </b-button>
      </div>
    </b-field>
  </b-field>
</template>
<script>
export default {
  name: 'FormButtons',
  methods: {
    submit () {
      this.$emit('submit')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
