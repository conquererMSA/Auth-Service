import { z } from 'zod'
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant'

//zod request validation for academic semister
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    semisterData: z.object({
      title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
        required_error: 'Title is required!',
      }),
      year: z.number({
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
export const AcademicSemisterValidation = { createAcademicSemisterZodSchema }
