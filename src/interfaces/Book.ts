export interface Book {
  id: number
  title: string
  authors: { name: string; birth_year?: number; death_year?: number }[]
  languages?: string[]
  subjects?: string[]
  summaries?: string[]
  formats?: { [key: string]: string }
  bookshelves?: string[]
}
