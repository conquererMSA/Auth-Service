import { z } from 'zod'
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant'

//request validation for create academic semister by zod
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    semisterData: z.object({
      title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
        required_error: 'Title is required!',
      }),
      year: z.string({
        required_error: 'Year is required!',
      }),
      code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
        required_error: 'Year is required!',
      }),
      startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
        required_error: 'Start month is required',
      }),
      endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
        required_error: 'End month is required',
      }),
    }),
  }),
})

//request validation for update academic semister by zod
// ensure 1 route-level:title dile code dite hobe, onothay zod error dibe
const updateAcademicSemisterZodSchema = z
  .object({
    body: z.object({
      semisterData: z.object({
        title: z
          .enum([...academicSemisterTitles] as [string, ...string[]], {
            required_error: 'Title is required!',
          })
          .optional(),
        year: z
          .string({
            required_error: 'Year is required!',
          })
          .optional(),
        code: z
          .enum([...academicSemisterCodes] as [string, ...string[]], {
            required_error: 'Year is required!',
          })
          .optional(),
        startMonth: z
          .enum([...academicSemisterMonths] as [string, ...string[]], {
            required_error: 'Start month is required',
          })
          .optional(),
        endMonth: z
          .enum([...academicSemisterMonths] as [string, ...string[]], {
            required_error: 'End month is required',
          })
          .optional(),
      }),
    }),
  })
  .refine(
    data =>
      (data.body.semisterData.title && data.body.semisterData.code) ||
      (!data.body.semisterData.title && !data.body.semisterData.code),
    {
      message:
        'You have to provide both title and code for updating one those field neither title nor code',
    },
  )
export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
}
