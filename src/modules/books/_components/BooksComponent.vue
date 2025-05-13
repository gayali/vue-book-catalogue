<template>
  <div class="container mt-4">

          <div v-show="!loading && booksCount > 0" class="mb-4">
            <small> showing results over {{ booksCount }} books </small>
            <small v-if="searchQuery" class="text-muted">for <strong>{{ searchQuery }}</strong></small>
          </div>


    <!-- Loading Spinner -->
    <div
      v-if="loading"
      class="d-flex justify-content-center align-items-center"
      style="height: 200px"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="books.length < 1" class="text-center mt-5">
      <p class="text-muted fs-1">
        <i class="bi bi-emoji-frown" style="font-size: 4rem"></i>
      </p>
      <h3 class="text-muted">Oops! No books found</h3>
      <p class="text-muted">Try adjusting your filters or search for something else.</p>
    </div>

    <!-- Books Grid -->
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      <div v-for="book in books" :key="book.id" class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">{{ book.title }}</h5>
            <p class="card-text">
              <strong>Author:</strong> {{ book.authors?.[0]?.name || 'Unknown Author' }} ({{
                book.authors?.[0]?.birth_year || 'N/A'
              }}
              - {{ book.authors?.[0]?.death_year || 'N/A' }})
            </p>
            <p class="card-text">
              <strong>Language:</strong>
              <span v-if="book.languages && book.languages.length">
                {{
                  book.languages
                    .map((lang) => {
                      const language = languagesList.find((item) => item.code === lang)
                      return language
                        ? language.title
                        : lang.charAt(0).toUpperCase() + lang.slice(1)
                    })
                    .join(', ')
                }}
              </span>
              <span v-else>Unknown</span>
            </p>
            <p class="card-text">
              <strong>Subjects:</strong>
              <span
                v-for="(subject, index) in book.subjects || []"
                :key="index"
                class="badge bg-secondary my-1"
                style="white-space: normal"
              >
                {{ subject }}
              </span>
            </p>
            <p v-if="book.summaries?.[0]" class="card-text">
              <strong>Summary:</strong> {{ book.summaries[0].slice(0, 100) }}...
            </p>
          </div>
          <div class="card-footer text-end">
            <button
              type="button"
              class="btn btn-info"
              data-bs-toggle="modal"
              :data-bs-target="'#bookModal' + book.id"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div
      v-for="book in books"
      :key="'modal-' + book.id"
      class="modal fade"
      :id="'bookModal' + book.id"
      tabindex="-1"
      :aria-labelledby="'bookModalLabel' + book.id"
      aria-hidden="true"
      data-bs-focus="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="'bookModalLabel' + book.id">{{ book.title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="book.formats?.['image/jpeg']"
              class="img-fluid mb-3"
              :alt="book.title"
            />
            <p>
              <strong>Author:</strong> {{ book.authors?.[0]?.name || 'Unknown Author' }} ({{
                book.authors?.[0]?.birth_year || 'N/A'
              }}
              - {{ book.authors?.[0]?.death_year || 'N/A' }})
            </p>
            <p>
              <strong>Language:</strong>
              <span v-if="book.languages && book.languages.length">
                {{
                  book.languages
                    .map((lang) => {
                      const language = languagesList.find((item) => item.code === lang)
                      return language
                        ? language.title
                        : lang.charAt(0).toUpperCase() + lang.slice(1)
                    })
                    .join(', ')
                }}
              </span>
              <span v-else>Unknown</span>
            </p>
            <p>
              <strong>Subjects:</strong>
              <span
                v-for="(subject, index) in book.subjects || []"
                :key="index"
                class="badge bg-secondary"
              >
                {{ subject }}
              </span>
            </p>
            <p>
              <strong>Bookshelves:</strong>
              <span
                v-for="(bookshelf, index) in book.bookshelves || []"
                :key="index"
                class="badge bg-info text-dark"
              >
                {{ bookshelf }}
              </span>
            </p>
            <p><strong>Summary:</strong> {{ book.summaries?.[0] || 'No summary available.' }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BooksComponent',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    books: {
      type: Array,
      default: () => [],
    },
    languageNames: {
      type: Object,
      default: () => ({}),
    },
    booksCount:{
      type: Number,
      default: 0,
    },
    languagesList: {
      type: Array,
      default: () => [
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
      ],
    },
  },
}
</script>
