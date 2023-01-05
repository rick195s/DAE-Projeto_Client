<template>
  <b-field
    label="File"
    horizontal
  >
    <b-upload
      v-model="dropFiles"
      type="is-info"
      multiple
      drag-drop
    >
      <section class="section">
        <div class="content has-text-centered">
          <p>
            <b-icon
              icon="upload"
              size="is-large"
            />
          </p>
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </b-upload>
    <div
      horizontal
      class="tags"
    >
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-info"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        />
      </span>
    </div>
  </b-field>
</template>
<script>
export default {
  data () {
    return {
      dropFiles: [],
      isLoading: false
    }
  },
  expose: ['uploadFiles'],
  methods: {
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    uploadFiles (occurrenceId) {
      if (this.dropFiles.length === 0) {
        return
      }

      const formData = new FormData()

      this.dropFiles.forEach((file) => {
        formData.append('file', file)
      })

      return this.$axios.$post(
        `/api/occurrences/${occurrenceId}/files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    }
  }
}
</script>
