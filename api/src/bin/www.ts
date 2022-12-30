import * as http from "http"

import { serverApp } from "../server"
import { dotEnvValidationService, shutdownService } from "../services"


import { extractErrorMessage, issueAlert } from "../utils/errorHandler"
import logger from "../utils/logger"

const startTime = Date.now()

/**
 * Load environment variables from .env file
 */
dotEnvValidationService.validateDotEnvFile()

// Updated handling of rejections in node v15
// In previous versions of Node.js, if there was an unhandled rejection, you would get a warning about the rejection and a deprecation warning.
// Now if not handled at all this would otherwise crash the server!
process.on("unhandledRejection", (reason, _promise) => {
    issueAlert(`Error: Encountered unhandledRejection! Reason: ${extractErrorMessage(reason)}`, "error")
})

/**
 * HTTP SERVER NODE
 */
const app = serverApp.getExpressApp()
// Only create on server nodes
const server = http.createServer(app)

const normalizePort = (val: number | string): number | string | boolean => {
    const normalizedPort = typeof val === "string" ? parseInt(val, 10) : val
    if (isNaN(normalizedPort)) {
        return val
    }

    if (normalizedPort >= 0) {
        return normalizedPort
    }

    return false
}

const port = normalizePort(process.env.PORT || 8000)
app.set("port", port)

const onError = (error: NodeJS.ErrnoException) => {
    if (error.syscall !== "listen") {
        throw error
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
        case "EACCES":
            logger.error(`[WWW] ${bind} requires elevated privileges`)
            shutdownService.execAllHandlers(error.code)
            process.exit(1)
            break
        case "EADDRINUSE":
            logger.error(`[WWW] ${bind} is already in use`)
            shutdownService.execAllHandlers(error.code)
            process.exit(1)
            break
        default:
            throw error
    }
}

const onListening = () => {
    const addr = server.address()
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`

    logger.debug(`[WWW] Server started in ${Date.now() - startTime} ms`)
    logger.debug(`[WWW] Listening on ${bind} with NODE_ENV ${app.get("env")}`)
    logger.info("[WWW] Press CTRL-C to stop")
}

serverApp
    .init()
    .then(() => {
        shutdownService.registerServer(server)
        server.listen(port)
        server.on("error", onError)
        server.on("listening", onListening)
    })
    .catch((error) => {
        // Fail-Fast
        logger.error(`[WWW] Start-up failed with: ${error}`)
        process.exit(1)
    })
