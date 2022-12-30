import * as express from "express"

import conversationRouter from "./conversation.router"

const router = express.Router()

//TODO add here all routes
export default router.use([conversationRouter])
