<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TilesBlock',
  props: {
    maxPerRow: {
      type: Number,
      default: 5
    }
  },
  render (createElement) {
    console.log(this.$slots.default)
    const renderAncestor = (elements) =>
      createElement(
        'div',
        { attrs: { class: 'tile is-ancestor' } },
        elements.map((element) => {
          return createElement('div', { attrs: { class: 'tile is-parent' } }, [
            element
          ])
        })
      )

    if (this.$slots.default.length <= this.maxPerRow) {
      return renderAncestor(this.$slots.default)
    } else {
      return createElement('div', { attrs: { class: 'is-tiles-wrapper' } })
    }
  }
})
</script>
