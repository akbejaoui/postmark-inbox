import * as HttpStatus from "http-status"

import { HttpRequestInterface } from "../helpers/httpRequestHandler"
import { EmailEventTypeEnum } from "../shared/emailEventTypeEnum"

import { makeHttpErrorResponse, makeHttpResponse } from "../helpers/httpResponseHandler"
import ConversationModel from "../models/conversation.model"
import Logger from "../utils/logger"

interface WebhookEmailReplyInterface {
    messageId: string
    type: EmailEventTypeEnum
    fromName: string
    from: string
    to: string
    subject: string
    textContent: string
    date: string
}

class WebhookController {
    private extractWebhookBody = (body: { [key: string]: string | EmailEventTypeEnum }): WebhookEmailReplyInterface => ({
        messageId: body.MessageID,
        fromName: body.FromName,
        from: body.From,
        type: body.MessageStream as EmailEventTypeEnum,
        to: body.To,
        subject: body.Subject,
        textContent: body.StrippedTextReply,
        date: new Date(body.Date).toISOString(),
    })

    private idempotencyCheckAndSaveReplyEvent = async (data: WebhookEmailReplyInterface) => {
        const { subject, ...rest } = data

        const conversationDocument = await ConversationModel.findOne({ subject: subject.replace("Re: ", "") }).exec()
        if (conversationDocument) {
            const exists = conversationDocument.thread.find(({ messageId }) => messageId === data.messageId)
            if (exists) {
                return
            }

            return await conversationDocument.addReply(rest)
        }

        await new ConversationModel({ subject: data.subject, thread: [rest] }).save()
    }

    handleInbound = async ({ body }: HttpRequestInterface) => {
        try {
            //* handle and map data
            const eventObjcet = this.extractWebhookBody(body as any)

            //* for idempotency we will check if message was already received and saved
            //* To avoid blocking the webhook endpoint we will execute our code in a non blocking way
            this.idempotencyCheckAndSaveReplyEvent(eventObjcet)

            return makeHttpResponse(HttpStatus.OK, {})
        } catch (error) {
            Logger.error(error.message)
            throw makeHttpErrorResponse(HttpStatus.BAD_REQUEST, { message: "[WEBHOOK] Request couldn't be fulfilled" })
        }
    }

    //todo handle tracking email (read status)
}

export default new WebhookController()
