import * as HttpStatus from "http-status";
import ConversationModel from '../models/conversation.model';

import { ConversationService, EmailService } from '../services';
import Logger from "../utils/logger";
import { HttpRequestInterface } from './../helpers/httpRequestHandler';
import { ObjectType, makeHttpErrorResponse, makeHttpResponse } from "./../helpers/httpResponseHandler";

class ConversationController {
    private extractRequestBody = (body: ObjectType<any>): ObjectType<string> => ({
        subject: body.subject,
        from: body.from,
        to: body.to,
        textContent: body.textContent,
    })

    //TODO add send email code here
    sendEmail = async ({ body }: HttpRequestInterface) => {
        try {
            //* extract and map data
            const data = this.extractRequestBody(body)

            //* Send an email:
            const mailMeta = await EmailService.sendEmail(data)

            //* save email in covnersation model
            const conversationDocument = await ConversationService.saveEmail(data, mailMeta)

            return makeHttpResponse(HttpStatus.OK, { data: conversationDocument })
        } catch (error) {
            Logger.error(error.message)
            throw makeHttpErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, { message: "Request couldn't be fulfilled, failed to send email" })
        }
    }

    getAllEmails = async () => {
        try {
            const conversationDocumentList = await ConversationModel.find().sort({ 'thread.date': -1}).exec()

            return makeHttpResponse(HttpStatus.OK, { data: conversationDocumentList })
        } catch (error) {
            Logger.error(error)
            throw makeHttpErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, { message: "Request couldn't be fulfilled, Cannot fetch conversation list." })
        }
    }
}

export default new ConversationController()
