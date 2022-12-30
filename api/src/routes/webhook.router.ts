import * as express from "express"

import webhookController from "../controllers/webhook.controller"

import routerHandler from "./routerHandler"

const router = express.Router()

router.post("/email/inbound",  routerHandler(webhookController.handleInbound))

export default router
