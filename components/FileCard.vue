<template>
  <div
    class="box is-clickable"
    @click="clickedFile(file)"
  >
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img
            class="image is-64x64"
            :src="file.default ?? file.path"
            :alt="file.name"
            @error="onImgError(file)"
          >
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <br>
            {{ file.name }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  emits: ['img-error', 'clicked-file'],
  methods: {
    onImgError (file) {
      this.$emit('img-error', file)
    },
    clickedFile (file) {
      this.$emit('clicked-file', file)
    }
  }
}
</script>
