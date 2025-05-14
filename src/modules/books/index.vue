<template>
  <div>
    <BooksHeader
      :loading="booksStore.loadingBooks"
      :hasFilters="hasFilters"
      :searchQuery="searchQuery"
      :books-count="booksStore.booksCount"
      :sortBy="sortBy"
      :sortOptions="sortOptions"
      @change-sort-by="changeSortBy($event)"
      @open-filtres-modal="filtresModal = true"
      @search-query="handleSearchQueryChange($event.target.value)"
      @clear-search="clearSearch"
      @search="search"
    />
    <BooksFilter
      :languagesList="languagesList"
      :languages="languages"
      @filter-languages="filterLanguages($event)"
      @search="search"
      @clear-languages="clearLanguages"
    />
    <Books
     :books-count="booksStore.booksCount"
      :loading="booksStore.loadingBooks"
      :languagesList="languagesList"
      :books="booksStore.books"
    />
    <BooksPagination
      :loading="booksStore.loadingBooks"
      :previousPageUrl="booksStore.previousPage"
      :nextPageUrl="booksStore.nextPage"
      @next-page="booksStore.gotoNextPage()"
      @previous-page="booksStore.gotoPreviousPage()"
    />
    <BooksFooter />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { useBooksStore } from '@/stores/books'
import { debounce } from 'lodash'
import type {Query} from '@/interfaces/Query';
import type { DebouncedFunc } from 'lodash';


export default {
  name: 'BooksModule',
  components: {
    Books: defineAsyncComponent(() => import('./_components/BooksComponent.vue')),
    BooksHeader: defineAsyncComponent(() => import('./_components/HeaderComponent.vue')),
    BooksFilter: defineAsyncComponent(() => import('./_components/FilterComponent.vue')),
    BooksPagination: defineAsyncComponent(() => import('./_components/PaginationComponent.vue')),
    BooksFooter: defineAsyncComponent(() => import('./_components/FooterComponent.vue')),
  },
  setup() {
    const booksStore = useBooksStore()
    return { booksStore }
  },
  data() {
    return {
      searchQuery: '',
      languages:[] as string[],
      filtresModal: false,
      sortBy: '',
      sortOptions: [
        { title: 'Popular', value: 'popular' },
        { title: 'Ascending', value: 'ascending' },
        { title: 'Descending', value: 'descending' },
      ],
      languagesList: [
        { code: 'en', title: 'English' },
        { code: 'fr', title: 'French' },
        { code: 'es', title: 'Spanish' },
        { code: 'de', title: 'German' },
        { code: 'it', title: 'Italian' },
        { code: 'pt', title: 'Portuguese' },
        { code: 'ru', title: 'Russian' },
        { code: 'zh', title: 'Chinese' },
        { code: 'ja', title: 'Japanese' },
        { code: 'ko', title: 'Korean' },
        { code: 'ar', title: 'Arabic' },
        { code: 'hi', title: 'Hindi' },
        { code: 'bn', title: 'Bengali' },
        { code: 'tr', title: 'Turkish' },
        { code: 'vi', title: 'Vietnamese' },
        { code: 'pl', title: 'Polish' },
        { code: 'nl', title: 'Dutch' },
        { code: 'sv', title: 'Swedish' },
        { code: 'no', title: 'Norwegian' },
        { code: 'da', title: 'Danish' },
      ],
      debounceSearch: {} as DebouncedFunc<() => void>,
    }
  },
  beforeMount() {
    this.search()
  },
  created() {
    this.debounceSearch = debounce(this.search, 1000)
  },
  computed: {
    hasFilters() {
      return this.searchQuery !== '' || this.languages.length > 0
    },
  },
  methods: {
    handleSearchQueryChange(query: string) {
      this.searchQuery = query
      if (this.searchQuery.length > 2) {
        this.debounceSearch()
      }
    },
    clearSearch() {
      this.searchQuery = ''
      this.search()
    },
    changeSortBy(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.sortBy = target.value;
      this.search();
    },
    filterLanguages(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.languages = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
      this.search();
    },
    clearLanguages() {
      this.languages = []
      this.search()
    },
    search() {
    let query: Query = {
        sort: this.sortBy,
      };

      if (this.searchQuery) {
        query = {
          ...query,
          search: this.searchQuery,
        }
      }
      if (this.languages.length > 0) {
        query = {
          ...query,
          languages: this.languages.join(','),
        }
      }

      this.booksStore.searchBooks(query)
    },
  },
}
</script>
