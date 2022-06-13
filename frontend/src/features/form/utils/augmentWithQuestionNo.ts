import { FormFieldDto } from '~shared/types/field'

import { NON_RESPONSE_FIELD_SET } from '../constants'
import { FormFieldWithQuestionNo } from '../types'

type AugmentedFieldAccumulator = {
  fields: FormFieldWithQuestionNo[]
  nonResponseFieldsCount: number
}

export const augmentWithQuestionNo = (formFields: FormFieldDto[]) => {
  const { fields } = formFields.reduce<AugmentedFieldAccumulator>(
    (acc, field, index) => {
      if (NON_RESPONSE_FIELD_SET.has(field.fieldType)) {
        acc.nonResponseFieldsCount += 1
        acc.fields.push(field)
      } else {
        acc.fields.push({
          ...field,
          questionNumber: index + 1 - acc.nonResponseFieldsCount,
        })
      }
      return acc
    },
    { fields: [], nonResponseFieldsCount: 0 },
  )

  return fields
}
