<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :data="data"
      :loading="loading"
    >
      <b-table-column
        v-slot="props"
        label="Id"
        field="id"
      >
        {{ props.row.id }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="name"
        field="name"
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="File Path"
        field="filePath"
      >
        {{ props.row.filePath }}
      </b-table-column>
      <empty-section
        v-if="!loading"
        slot="empty"
      />
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import ModalBox from '@/components/ModalBox.vue'
import EmptySection from '@/components/EmptySection.vue'

export default defineComponent({
  name: 'ClientsTableSample',
  components: { ModalBox, EmptySection },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },
  computed: {
    paginated () {
      return this.clients.length > this.perPage
    },
    ...mapState(['clients'])
  },
  methods: {
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false

      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
})
</script>
