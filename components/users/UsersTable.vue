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
        label="Name"
        field="name"
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Email"
        field="email"
      >
        {{ props.row.email }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Role"
        field="role"
      >
        {{ props.row.role }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="edit"
      >
        <router-link
          v-if="props.row.role !== 'ADMINISTRATOR'"
          :to="'/users/' + props.row.id + '/edit'"
        >
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </router-link>
        <router-link
          v-if="props.row.role === 'ADMINISTRATOR' && props.row.email === email"
          :to="'/profile'"
        >
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </router-link>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="Softdelete"
      >
        <b-button
          v-if="props.row.role !== 'ADMINISTRATOR'"
          @click="deleteUser(props.row.id)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </b-button>
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
  name: 'UserTable',
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
      email: this.$auth.user.email,
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
    },
    deleteUser (id) {
      this.isLoading = true
      this.$axios.put(`/api/users/${id}/delete`).then(() => {
        this.$store.commit('user', this.form)
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'User ' + id + ' deleted',
          type: 'is-success',
          queue: false
        })
      })
    }
  }
})
</script>
