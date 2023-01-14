<template>
  <div>
    <b-table
      :data="data"
      :loading="loading"
      paginated
      :total="data.length"
      :per-page="5"
    >
      <b-table-column
        v-for="(column, index) in columns"
        :key="index"
        v-slot="props"
        :label="column.label"
        :centered="column.centered"
      >
        {{ props.row[column.field] }}
      </b-table-column>

      <b-table-column
        v-if="$auth.user.role === 'CLIENT'"
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
      <b-table-column
        v-slot="props"
        custom-key="actions"
        label="Details"
        cell-class="is-actions-cell"
      >
        <div class="buttons no-wrap">
          <b-button
            tag="router-link"
            :to="`/policies/${props.row.id}`"
            type="is-link"
            label="Details Policies"
            icon="account-edit"
            size="is-small"
          >
            Docs
          </b-button>
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
import EmptySection from '@/components/EmptySection.vue'

export default {
  name: 'TableComponent',
  components: { EmptySection },
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
    }
  }
}
</script>
