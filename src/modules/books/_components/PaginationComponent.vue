<template>
  <div class="my-4 py-4 text-center " v-show="!loading">
    <div class="d-flex justify-content-center gap-3 mb-4 pb-4">
      <button
        type="button"
        @click="$emit('previous-page')"
        v-if="previousPageUrl"
        class="btn btn-secondary"
      >
      <i class="bi bi-arrow-left"></i>

        Previous Page
      </button>
      <button
        type="button"
        @click="$emit('next-page')"
        v-if="nextPageUrl"
        class="btn btn-primary"
      >

        Next Page
        <i class="bi bi-arrow-right"></i>

      </button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PaginationComponent',
  props: {
    previousPageUrl: {
      type: String,
      default: '',
    },
    nextPageUrl: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['next-page', 'previous-page'],
}
</script>
