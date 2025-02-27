import axios from 'axios'

import {
  EmailModeSubmissionContentDto,
  PublicFormViewDto,
  StorageModeSubmissionContentDto,
  SubmissionResponseDto,
} from '../../../shared/types'
import { createEmailSubmissionFormData } from '../utils/submission'

const PUBLIC_FORMS_ENDPOINT = '/api/v3/forms'

/**
 * Submits an email mode form submission.
 * @param formId id of form to submit submission for
 * @param content content of submission
 * @param attachments any attachments included in submission
 * @param captchaResponse string if captcha to be included, defaults to null
 *
 * @returns SubmissionResponseDto if successful, else SubmissionErrorDto on error
 */
export const submitEmailModeForm = async ({
  formId,
  content,
  attachments,
  captchaResponse = null,
}: {
  formId: string
  content: EmailModeSubmissionContentDto
  attachments?: Record<string, File>
  captchaResponse?: string | null
}): Promise<SubmissionResponseDto> => {
  const formData = createEmailSubmissionFormData({
    content,
    attachments,
  })

  return axios
    .post<SubmissionResponseDto>(
      `${PUBLIC_FORMS_ENDPOINT}/${formId}/submissions/email`,
      formData,
      {
        params: {
          captchaResponse: String(captchaResponse),
        },
      },
    )
    .then(({ data }) => data)
}

/**
 * Submits a storage mode form's submission.
 * @param formId id of form to submit submission for
 * @param content the storage mode submission object to submit
 * @param captchaResponse string if captcha to be included, defaults to null
 *
 * @returns SubmissionResponseDto if successful, else SubmissionErrorDto on error
 */
export const submitStorageModeForm = async ({
  formId,
  content,
  captchaResponse = null,
}: {
  formId: string
  content: StorageModeSubmissionContentDto
  captchaResponse?: string | null
}): Promise<SubmissionResponseDto> => {
  return axios
    .post<SubmissionResponseDto>(
      `${PUBLIC_FORMS_ENDPOINT}/${formId}/submissions/encrypt`,
      content,
      {
        params: {
          captchaResponse: String(captchaResponse),
        },
      },
    )
    .then(({ data }) => data)
}

/**
 * Gets public view of form, along with any
 * identify information obtained from Singpass/Corppass/MyInfo.
 * @param formId FormId of form in question
 * @returns Public view of form, with additional identify information
 */
export const getPublicFormView = async (
  formId: string,
): Promise<PublicFormViewDto> => {
  return axios
    .get<PublicFormViewDto>(`${PUBLIC_FORMS_ENDPOINT}/${formId}`)
    .then(({ data }) => data)
}

// TODO #4279: Remove after React rollout is complete
/**
 * Gets public view of the react to angular bug report feedback form
 * @returns Public view of form, with additional identify information
 */
export const getReactToAngularFeedbackFormView =
  async (): Promise<PublicFormViewDto> => {
    return axios
      .get<PublicFormViewDto>(`${PUBLIC_FORMS_ENDPOINT}/switchenvfeedback`)
      .then(({ data }) => data)
  }

/**
 * Submits the bug report feedback form for React to Angular switch
 * @param content content of submission
 * @param attachments any attachments included in submission
 * @param captchaResponse string if captcha to be included, defaults to null
 *
 * @returns SubmissionResponseDto if successful, else SubmissionErrorDto on error
 */
export const submitSwitchEnvFeedbackForm = async ({
  content,
  attachments,
  captchaResponse = null,
}: {
  content: EmailModeSubmissionContentDto
  attachments?: Record<string, File>
  captchaResponse?: string | null
}): Promise<SubmissionResponseDto> => {
  const formData = createEmailSubmissionFormData({
    content,
    attachments,
  })

  return axios
    .post<SubmissionResponseDto>(
      `${PUBLIC_FORMS_ENDPOINT}/submissions/email/switchenvfeedback`,
      formData,
      {
        params: {
          captchaResponse: String(captchaResponse),
        },
      },
    )
    .then(({ data }) => data)
}
