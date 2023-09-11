import {
  IAcademicSemisterCodes,
  IAcademicSemisterMonths,
  IAcademicSemisterTitles,
} from './academicSemister.interface'

export const academicSemisterMonths: IAcademicSemisterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemisterTitles: IAcademicSemisterTitles[] = [
  'Autumn',
  'Fall',
  'Summer',
]

export const academicSemisterCodes: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
]

export const academicSemisterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
