import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

import { createLoggerWithLabel } from '../../../../config/logger'
import { createReqMeta } from '../../../utils/request'

import {
  createPresignedPostForImages,
  getDashboardForms,
} from './admin-form.service'
import { mapRouteError } from './admin-form.utils'

const logger = createLoggerWithLabel(module)

/**
 * Handler for GET /adminform endpoint.
 * @security session
 *
 * @returns 200 with list of forms user can access when list is retrieved successfully
 * @returns 422 when user of given id cannnot be found in the database
 * @returns 500 when database errors occur
 */
export const handleListDashboardForms: RequestHandler = async (req, res) => {
  const authedUserId = (req.session as Express.AuthedSession).user._id
  const dashboardResult = await getDashboardForms(authedUserId)

  if (dashboardResult.isErr()) {
    const { error } = dashboardResult
    logger.error({
      message: 'Error listing dashboard forms',
      meta: {
        action: 'handleListDashboardForms',
        userId: authedUserId,
      },
      error,
    })
    const { errorMessage, statusCode } = mapRouteError(error)
    return res.status(statusCode).json({ message: errorMessage })
  }

  // Success.
  return res.json(dashboardResult.value)
}

/**
 * Handler for POST /:formId([a-fA-F0-9]{24})/adminform/images.
 * @security session
 *
 * @returns 200 with presigned POST object
 * @returns 400 when error occurs whilst creating presigned POST object
 */
export const handleCreatePresignedPostForImages: RequestHandler<
  ParamsDictionary,
  unknown,
  {
    fileId: string
    fileMd5Hash: string
    fileType: string
  }
> = async (req, res) => {
  const { fileId, fileMd5Hash, fileType } = req.body

  return createPresignedPostForImages({ fileId, fileMd5Hash, fileType })
    .map((presignedPost) => res.json(presignedPost))
    .mapErr((error) => {
      logger.error({
        message: 'Presigning post data encountered an error',
        meta: {
          action: 'handleCreatePresignedPostForImages',
          ...createReqMeta(req),
        },
        error,
      })

      const { statusCode, errorMessage } = mapRouteError(error)
      return res.status(statusCode).json({ message: errorMessage })
    })
}
