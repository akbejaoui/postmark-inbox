import { HttpRequestInterface } from './../helpers/httpRequestHandler';
import { Request, Response } from "express"
import { validationResult } from "express-validator"
import * as HttpStatus from "http-status"

import handleHttpRequest from "../helpers/httpRequestHandler"
import { HttpResponseInterface } from "../helpers/httpResponseHandler"
import { extractErrorMessage } from "../utils/errorHandler"
import logger from "../utils/logger"

const nonCriticalErrors = [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN, HttpStatus.BAD_REQUEST, HttpStatus.UNPROCESSABLE_ENTITY]

/**
 * Handle all http requests/responses of product routes
 * @param {*} controllerFunction
 */
const routerHandler = (controllerFunction: (httpRequest: HttpRequestInterface, res?: Response) => Promise<unknown>) => (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            logger.warn(`Validation failed with errors: ${JSON.stringify(errors.array())}`)
            return res.status(HttpStatus.BAD_REQUEST).send({ errors: errors.array() })
        }

        const httpRequestParams = handleHttpRequest(req)

        controllerFunction(httpRequestParams, res)
            .then((httpResponse: HttpResponseInterface) => {
                console.log(httpResponse);
                
                const { statusCode, data } = httpResponse as HttpResponseInterface
                res.setHeader("Content-Type", "application/json")
                res.status(statusCode).send(data)
            })
            .catch((err) => {
                const error = (err && err.error) || "Internal Server Error"
                const errMsg = extractErrorMessage(err)

                if (nonCriticalErrors.includes(err?.statusCode)) {
                    logger.warn(`Router handler is sending back non-critical error: ${errMsg}`)
                } else {
                    logger.error(`Router handler is sending back critical error: ${errMsg}`)
                }

                res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({ error, errorCode: err.errorCode })
            })
    } catch (err) {
        logger.error(`Internal Error Occurred: ${extractErrorMessage(err)}`)
        if (err.stack) {
            logger.error(`Stack trace: ${err.stack}`)
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" })
    }
}

export default routerHandler
