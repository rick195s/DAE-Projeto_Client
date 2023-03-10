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
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="$emit('page-change', $event)"
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
        label="Policy Id"
        field="policyId"
      >
        {{ props.row.policyId }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Description"
        field="description"
        cell-class="word_break"
      >
        {{ props.row.description }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Start Date"
      >
        <small class="has-text-grey is-abbr-like">
          {{ props.row.startDate }}
        </small>
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <nuxt-link
            :to="`/occurrences/${props.row.id}`"
            class="button is-small is-info"
          >
            <b-icon
              icon="arrow-expand-all"
              size="is-small"
            />
          </nuxt-link>
        </div>
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
import ModalBox from '@/components/ModalBox.vue'
import EmptySection from '@/components/EmptySection.vue'

export default defineComponent({
  name: 'OccurrencesTable',
  components: { ModalBox, EmptySection },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 20
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
  emits: ['page-change'],
  data () {
    return {
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
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
