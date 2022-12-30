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
        v-for="(column, index) in columns"
        :key="index"
        v-slot="props"
        :label="column.label"
      >
        {{ props.row[column.field] }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        custom-key="actions"
        label="Actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons no-wrap">
          <b-button
            tag="router-link"
            :to="`/policies/${props.row.id}/occurrences/create`"
            type="is-link"
            label="Create Occurrence"
            icon="account-edit"
            size="is-small"
          >
            Docs
          </b-button>
        </div>
      </b-table-column>
      <section
        v-if="!loading"
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalBox from '@/components/ModalBox.vue'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkedRows: [],
      isModalActive: false,
      trashObject: null,
      isLoading: false
    }
  },
  computed: {
    paginated () {
      return this.perPage < 0
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
}
</script>
