import { DiscussionInterface } from './../models/discussion.model';
import { EmailEventTypeEnum } from '../shared/emailEventTypeEnum';
import ConversationModel from '../models/conversation.model';
import { ObjectType } from '../helpers/httpResponseHandler';

class ConversationService {

    saveEmail = async (data: ObjectType<string>, mailMeta: ObjectType<any>) => {
        const emailObject: DiscussionInterface = {
            messageId: mailMeta.MessageID,
            type: EmailEventTypeEnum.BROADCAST,
            from: data.from,
            to: data.to,
            textContent: data.textContent,
            date: mailMeta.SubmittedAt
        }

        //! if the same subject exist i will use this as a continuaton to the thread
        const existingThread = await ConversationModel.findOne({ subject: data.subject}).exec()
        if (existingThread) {
            const responseDocument = await existingThread.addReply(emailObject)
            return responseDocument
        }

        //* create a new conversation
        const conversationDocument = await new ConversationModel({ subject: data.subject, thread: [emailObject]}).save()
        return conversationDocument
    }
}

export default new ConversationService()