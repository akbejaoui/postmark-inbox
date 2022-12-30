import { Request } from "express"
import { IncomingHttpHeaders } from "http"

export interface HttpRequestInterface<BODY = {[key: string]: unknown}> {
    path: string
    method: string
    pathParams: unknown
    body: BODY
    headers: IncomingHttpHeaders
}

/**
 * handle http request
 * @param req
 * @returns HttpRequestInterface
 */
export default function handleHttpRequest(req: Request): HttpRequestInterface {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
    })
}
