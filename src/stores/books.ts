import { defineStore } from 'pinia'
import type { Book } from '@/interfaces/Book'
import type { Query } from '@/interfaces/Query'

const booksURL = 'https://gutendex.com/books/'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [] as Book[],
    loadingBooks: false,
    nextPage: '',
    previousPage: '',
    booksCount: 0,
  }),
  actions: {
    setBooks(payload: Book[]) {
      this.books = payload
    },
    setLoadingBooks(isLoading: boolean) {
      this.loadingBooks = isLoading
    },
    setNextPage(url: string) {
      this.nextPage = url
    },
    setPreviousPage(url: string) {
      this.previousPage = url
    },
    setBooksCount(count: number) {
      this.booksCount = count
    },
    async searchBooks(query: Query) {
      const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([, value]) => value !== undefined),
      ) as Record<string, string>

      let queryString = new URLSearchParams(filteredQuery).toString()
      queryString = queryString.replace('%2C', ',')
      const url = `${booksURL}?${queryString}`
      this.fetchBooks(url)
    },
    async gotoNextPage() {
      const url = this.nextPage.replace('%2C', ',')
      await this.fetchBooks(url)
    },
    async gotoPreviousPage() {
      const url = this.previousPage.replace('%2C', ',')
      await this.fetchBooks(url)
    },

    async fetchBooks(url: string) {
      this.setLoadingBooks(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        this.setBooks(data.results)
        this.setNextPage(data.next || '')
        this.setPreviousPage(data.previous || '')
        this.setBooksCount(data.count || 0)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        this.setLoadingBooks(false)
      }
    },
  },
})
