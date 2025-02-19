import { FormStartPage } from '../../../../shared/types'
import {
  IAgencyDocument,
  IForm,
  IFormFeedbackSchema,
  IFormStatisticsTotalModel,
} from '../../../types'

export type QueryDataMap = {
  generalQueryModel: IFormStatisticsTotalModel
  lookUpMiddleware: Record<string, unknown>[]
  groupByMiddleware: Record<string, unknown>[]
  singleSearchPipeline: (formId: string) => Record<string, unknown>[]
}

export type QueryExecResult = {
  _id: string
  count: number
  lastSubmission: Date | null
  title: IForm['title']
  form_fields: IForm['form_fields']
  logo: IAgencyDocument['logo']
  agency: IAgencyDocument['shortName']
  colorTheme: FormStartPage['colorTheme']
  avgFeedback: number | null
}

export type RetrieveSubmissionsExecResult =
  | [
      {
        _id: string
        count: number
        lastSubmission: Date
        formFeedbackInfo: IFormFeedbackSchema[]
        avgFeedback: number | null
      },
    ]
  | undefined
  | []

export type QueryExecResultWithTotal = {
  pageResults: QueryExecResult[]
  totalCount: {
    count: number
  }[]
}[]

export type FormattedQueryExecResult = QueryExecResult & {
  timeText: string
}

export type QueryPageResult = {
  forms: FormattedQueryExecResult[]
}

export type QueryPageResultWithTotal = {
  forms: FormattedQueryExecResult[]
  totalNumResults: number
}

export type ExamplesQueryParams = {
  pageNo: number
  agency?: string
  searchTerm?: string
  shouldGetTotalNumResults?: boolean
}

export type FormInfo = QueryExecResult & {
  timeText: string
}

export type SingleFormResult = {
  form: FormInfo
}

export type SingleFormInfoQueryResult = [FormInfo] | undefined | []
