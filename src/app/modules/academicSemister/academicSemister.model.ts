import { Schema, model } from 'mongoose'
import {
  IAcademicSemister,
  IAcademicSemisterModel,
} from './academicSemister.interface'
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  { timestamps: true },
)

//handle pre existance of same esmister on database
academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'This semister already exist on DB from academicSemister.model.ts',
    )
  }
  next()
})

const AcademicSemister = model<IAcademicSemister, IAcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema,
)

export default AcademicSemister
