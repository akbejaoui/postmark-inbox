import { Server } from "http"
import { HttpTerminator, createHttpTerminator } from "http-terminator"
import logger from "../utils/logger"

export class ShutdownService {
    private handlers: Array<(cause: string) => Promise<void>>
    private httpTerminator: HttpTerminator
    private dbHandler: (cause: string) => Promise<void>

    constructor() {
        this.handlers = []
        this._setupShutdownHandlers()
    }

    private _setupShutdownHandlers() {
        // SIGUSR2 signal for nodemon shutdown
        process.once("SIGUSR2", async () => {
            await this.execAllHandlers("SIGUSR2 (nodemon restart)")
            process.kill(process.pid, "SIGUSR2")
        })

        // SIGINT signal for regular app shutdown
        process.once("SIGINT", async () => {
            await this.execAllHandlers("SIGINT (app termination)")
            process.exit(0)
        })

        // SIGITERM signal for regular app shutdown via docker stop
        process.once("SIGTERM", async () => {
            await this.execAllHandlers("SIGTERM (app stopped by docker)")
            process.exit(0)
        })
    }

    /**
     * Closes server first and afterwards all other registered handlers
     */
    execAllHandlers = async (cause: string): Promise<void> => {
        // Close server -> graceful timeout to sockets with ongoing HTTP requests
        logger.info(`Shutdown initiated due to: ${cause}`)
        try {
            // optional because a WORKER node does not have a server
            if (this.httpTerminator) {
                await this.httpTerminator.terminate()
                logger.info(`Terminated HTTP server`)
            }
        } catch (error) {
            logger.error(`Failed to terminate server: ${error}`)
        }

        // Close all handlers (except for database this one comes last)
        for (const handler of this.handlers) {
            try {
                await handler(cause)
            } catch (error) {
                logger.error(`Failed to exec handler: ${error}`)
            }
        }

        // Exec DB handler last
        try {
            if (this.dbHandler) await this.dbHandler(cause)
        } catch (error) {
            logger.error(`Failed to exec handler: ${error}`)
        }

        logger.info(`Completed graceful shutdown <3`)
    }

    /**
     * Registers HTTP server for graceful shutdown
     */
    registerServer(server: Server) {
        if (this.httpTerminator) {
            throw new Error("Only one server can be registered!")
        }
        this.httpTerminator = createHttpTerminator({ server })
    }

    /**
     * Register callback to be executed on shutdown AFTER server has been closed
     */
    registerHandler(callback: (cause: string) => Promise<void>) {
        this.handlers.push(callback)
    }

    registerDbHandler(callback: (cause: string) => Promise<void>) {
        this.dbHandler = callback
    }
}

export default new ShutdownService()
