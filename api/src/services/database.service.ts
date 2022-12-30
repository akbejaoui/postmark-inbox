import mongoose, { ConnectOptions, connect } from "mongoose"

import { maskUrl, mongoConnectTimeOut, mongoDbUri } from "../shared/env.utils"
import logger from "../utils/logger"

import shutdownService from "./shutdown.service"

// Model registration methods

export const databaseOptions: ConnectOptions = {
    maxPoolSize: 500,
    autoIndex: true,
    // this option determines how fast app/server startup fails
    // if mongodb cannot be connected
    serverSelectionTimeoutMS: mongoConnectTimeOut ?? 30000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 20000,
}

class DatabaseService {
    private connectionPromise: Promise<typeof mongoose>
    private connection: mongoose.Connection

    constructor(uri: string, databaseOptions: ConnectOptions) {
        logger.debug(`[DatabaseService] Creating with URI: ${maskUrl(uri)}`)

        this.connectionPromise = connect(uri, databaseOptions)

        logger.debug(`[DatabaseService] Created connection`)

        this._setupShutdownHandler()
    }

    private _hookIntoConnectionMonitorEvents = () => {
        this.connection.on("error", (err: any) => {
            logger.warn(`[DatabaseService] MongoDB connection error: ${err}`)
        })
        this.connection.on("connecting", () => {
            logger.info("[DatabaseService] MongoDB connecting...")
        })
        this.connection.on("connected", () => {
            logger.info("[DatabaseService] MongoDB connected")
        })
        this.connection.on("disconnected", () => {
            logger.warn("[DatabaseService] MongoDB disconnected")
        })
    }

    private _setupShutdownHandler = () => {
        shutdownService.registerDbHandler(async (cause: string) => {
            await this.connection.close()
            logger.debug(`[DatabaseService] MongoDB connection closed through ${cause}`)
        })
    }

    init = async () => {
        logger.debug("[DatabaseService] Initializing...")

        this.connection = (await this.connectionPromise).connection
        this._hookIntoConnectionMonitorEvents()

        logger.debug("[DatabaseService] Initialized :)")
    }

    // getConnection = () => this.connection
    getConnection = async () => this.connectionPromise
}

export default new DatabaseService(mongoDbUri, databaseOptions)
