<template>
  <nav class="navbar navbar-expand-lg bg-dark sticky-top " data-bs-theme="dark">
    <div class="container">
      <div class="row w-100 align-items-center mx-auto">
        <div class="col-lg-4">
          <a class="navbar-brand" href="#"><i class="bi bi-book"></i> Books Catalogue</a>
        </div>
        <div class="col-lg-8 text-end">
          <div class="input-group my-1">
            <!-- Search Input -->
            <input type="text" name="search" placeholder="Search any book..." aria-label="Search" :value="searchQuery"
              class="form-control" @input="$emit('searchQuery', $event)" />

            <!-- Clear Filter Button -->
            <span v-if="hasFilters" class="input-group-text" title="Clear Filter">
              <button class="btn-close input-group-text" aria-label="Close" @click="$emit('clear-search')"></button>
            </span>

            <!-- Search Button -->
            <button type="button" :disabled="!searchQuery" class="btn btn-warning" @click="$emit('search')">
              <i class="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="bg-white border-bottom" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)">
    <div class="container">
      <div class="row  justify-content-between align-items-center" id="filter-form">
        <div class="col-lg-1 col-md-2 py-2">
          <!-- Left Panel Toggle Button -->
          <button class="btn btn-outline-primary btn-sm w-100" @click="$emit('open-filtres-modal')" data-bs-toggle="offcanvas"
            data-bs-target="#leftPanel" aria-controls="leftPanel">
            <i class="bi bi-filter"></i> Filters
          </button>
        </div>

        <div class="col-lg-2 col-md-3 py-2">
          <div class="input-group my-1">
            <span class="input-group-text"><i class="bi bi-sort-down"></i></span>
            <select name="sort" class="form-select form-select-sm form-select-dark"
              @change="$emit('changeSortBy', $event)">
              <option hidden value="">Sort By</option>
              <template v-for="(sortRow, index) in sortOptions" :key="index">
                <option :value="sortRow.value" :selected="sortRow.value === sortBy">
                  {{ sortRow.title }}
                </option>
              </template>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
    hasFilters: {
      type: Boolean,
      default: false,
    },
    sortBy: {
      type: String,
      default: 'popular',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    sortOptions: {
      type: Array,
      default: () => [
        { title: 'Popular', value: 'popular' },
        { title: 'Ascending', value: 'ascending' },
        { title: 'Descending', value: 'descending' },
      ],
    },
  },
  emits: ['searchQuery', 'search', 'clear-search', 'open-filtres-modal'],
})
</script>
