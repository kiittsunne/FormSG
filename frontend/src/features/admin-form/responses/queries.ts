import { useQuery, UseQueryResult } from 'react-query'
import { useParams } from 'react-router-dom'

import { FormFeedbackMetaDto } from '~shared/types'
import {
  StorageModeSubmissionMetadataList,
  SubmissionCountQueryDto,
} from '~shared/types/submission'

import { adminFormKeys } from '../common/queries'

import { getFormFeedback } from './FeedbackPage/FeedbackService'
import {
  countFormSubmissions,
  getFormSubmissionsMetadata,
} from './AdminSubmissionsService'

export const adminFormResponsesKeys = {
  base: [...adminFormKeys.base, 'responses'] as const,
  id: (id: string) => [...adminFormResponsesKeys.base, id] as const,
  count: (id: string, dates: [startDate: string, endDate: string] | []) =>
    [...adminFormResponsesKeys.id(id), 'count', ...dates] as const,
}

export const adminFormFeedbackKeys = {
  base: [...adminFormKeys.base, 'feedback'] as const,
  id: (id: string) => [...adminFormFeedbackKeys.base, id] as const,
}

/**
 * @precondition Must be wrapped in a Router as `useParam` is used.
 */
export const useFormResponsesCount = (
  dates?: SubmissionCountQueryDto,
): UseQueryResult<number> => {
  const { formId } = useParams()
  if (!formId) throw new Error('No formId provided')

  let dateParams: [startDate: string, endDate: string] | [] = []

  if (dates?.startDate && dates.endDate) {
    dateParams = [dates.startDate, dates.endDate]
  }

  return useQuery(
    adminFormResponsesKeys.count(formId, dateParams),
    () => countFormSubmissions({ formId, dates }),
    { staleTime: 10 * 60 * 1000 },
  )
}

/**
 * @precondition Must be wrapped in a Router as `useParam` is used.
 */
export const useFormResponses =
  (): UseQueryResult<StorageModeSubmissionMetadataList> => {
    const { formId } = useParams()
    if (!formId) throw new Error('No formId provided')

    return useQuery(
      adminFormResponsesKeys.id(formId),
      () => getFormSubmissionsMetadata(formId),
      { staleTime: 10 * 60 * 1000 },
    )
  }

/**
 * @precondition Must be wrapped in a Router as `useParam` is used.
 */
export const useFormFeedback = (): UseQueryResult<FormFeedbackMetaDto> => {
  const { formId } = useParams()
  if (!formId) throw new Error('No formId provided')

  return useQuery(adminFormFeedbackKeys.id(formId), () =>
    getFormFeedback(formId),
  )
}
