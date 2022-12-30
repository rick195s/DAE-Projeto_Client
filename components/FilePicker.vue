<template>
  <b-field class="file">
    <b-upload
      :value="file"
      :accept="accept"
      @input="upload"
    >
      <a
        class="button"
        :class="type"
      >
        <b-icon
          icon="upload"
          custom-size="default"
        />
        <span>{{ buttonLabel }}</span>
      </a>
    </b-upload>
    <span
      v-if="file"
      class="file-name"
    >{{ file.name }}</span>
  </b-field>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'is-primary'
    },
    file: {
      type: Object,
      default: null
    }
  },
  emits: ['input'],
  computed: {
    buttonLabel () {
      return this.$props.file ? 'Pick another file' : 'Pick a file'
    }
  },
  methods: {
    upload (file) {
      this.$emit('input', file)

      // Use this as an example for handling file uploads
      // let formData = new FormData()
      // formData.append('file', file.value)

      // const mediaStoreRoute = `/your-route/`

      // axios
      //   .post(mediaStoreRoute, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     },
      //     onUploadProgress: progressEvent
      //   })
      //   .then(r => {
      //
      //   })
      //   .catch(err => {
      //
      //   })
    }
    // progressEvent (progressEvent) {
    //   this.uploadPercent = Math.round(
    //     (progressEvent.loaded * 100) / progressEvent.total
    //   )
    // }
  }
})
</script>
