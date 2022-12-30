import * as bodyParser from "body-parser"
import * as express from "express"
import * as cors from "cors"

import routes from "./routes"
import { databaseService } from "./services"
import Logger from "./utils/logger"

class Server {
    private express: express.Express

    constructor() {
        this.express = express()
        this.initMiddleware()
        this.setRoutes()
    }

    init = async () => {
        Logger.debug("[Server] Initializing...")
        // always needed
        await databaseService.init()

        Logger.debug("[Server] Initialized :)")
    }

    getExpressApp = () => this.express

    private initMiddleware(): void {
        this.express.use(bodyParser.json({ limit: "10mb" }))
        this.express.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
        this.express.use(cors())

        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            Logger.info(`Incoming method: [${req.method}] - endpoint: [${req.url}]`)
            res.on("finish", () => {
                Logger.info(`Status: [${res.statusCode}]`)
            })

            next()
        })
    }

    private setRoutes() {
        this.express.use("/api", routes)

        //* error handling
        this.express.use((_req: express.Request, res: express.Response) => {
            const error = new Error("Not found")
            Logger.error(error)
            return res.status(404).json({ message: error.message })
        })
    }
}

export const serverApp = new Server()
