import { Response } from "express"

export type ObjectType<T> = {
    [key: string]: T
}

/**
 * Http response interface
 */
export interface HttpResponseInterface {
    statusCode: number
    data?: ObjectType<unknown>
    error?: ObjectType<string>
}

export interface HttpFileResponseInterface {
    statusCode: number
}

/**
 * http success response helper
 * @param statusCode int
 * @param body
 */
export function makeHttpResponse(statusCode: number, data: ObjectType<unknown>): HttpResponseInterface {
    return {
        statusCode,
        data,
    }
}

export const makeHttpErrorResponse = (statusCode: number, error: ObjectType<string>): HttpResponseInterface => ({
    statusCode,
    error,
})

export const sendHttpErrorResponse = (res: Response, statusCode: number, error: string) => res.status(statusCode).send({ error })
