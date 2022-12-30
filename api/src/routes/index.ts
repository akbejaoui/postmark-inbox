import * as express from "express"

import conversationRouter from "./conversation.router"
import webhookRouter from "./webhook.router"

const router = express.Router()

//TODO add here all routes
export default router.use([conversationRouter, webhookRouter])
