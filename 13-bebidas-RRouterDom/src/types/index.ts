
import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, SearchFilterSchema } from '../utils/recipes-schema'

// Inferir los types de los schemas

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>