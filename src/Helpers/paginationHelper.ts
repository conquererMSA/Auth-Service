import { SortOrder } from 'mongoose'

type IPageOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
type IPaginationResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
const calculatePagination = (options: IPageOptions): IPaginationResult => {
  const page = Number(options.page) || 1
  const limit = Number(options.limit) || 10
  const skip = (page - 1) * limit
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'
  return {
    skip,
    page,
    limit,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = { calculatePagination }
