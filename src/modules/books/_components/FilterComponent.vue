<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="leftPanel" aria-labelledby="leftPanelLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="leftPanelLabel">Filter by Language</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="mb-3">
                <label for="languages" class="form-label">Select Languages</label>
                <select id="languages" class="form-select" multiple @change="$emit('filter-languages', $event)">

                    <template v-for="(language, index) in languagesList" :key="index">
                        <option :value="language.code" :selected="languages.some(l => l.code === language.code)">{{ language.title }}</option>
                    </template>
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <button @click="$emit('search')" data-bs-dismiss="offcanvas" class="btn btn-primary" >Apply Filter</button>
                <button @click="$emit('clear-languages')" data-bs-dismiss="offcanvas" class="btn btn-secondary">Clear Filter</button>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
export default {
  name: 'FilterComponent',
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
    languagesList: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['filter-languages', 'clear-languages', 'search'],
}
</script>
