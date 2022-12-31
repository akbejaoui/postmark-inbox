import mongoose, { Document, Model, Schema } from "mongoose"
import { DiscussionInterface, DiscussionSchema } from "./discussion.model"


export interface ConversationInterface {
    subject: string
    thread: DiscussionInterface[]
}

interface ConversationDocument extends ConversationInterface, Document {
    addReply: (reply: DiscussionInterface) => void // add a reply to thread
}

export interface ConversationModelInterface extends Model<ConversationDocument> {
    findByMessageId: (subject: string, messageId: string) => Promise<ConversationDocument>  // can be used to fetch by message id to have an idempotent webhook
}


const ConversationSchema: Schema<ConversationDocument> = new Schema(
    {
        subject: { type: String, required: true, unique: true },
        thread: [{ type: DiscussionSchema }],
    },
    { timestamps: true }
)

ConversationSchema.methods.addReply = async function (reply: DiscussionInterface) {
    this.thread.push(reply)
    return await this.save()
}

ConversationSchema.index({ subject: 1, "thread.messageId": 1 })

export default mongoose.model<ConversationDocument, ConversationModelInterface>("Conversation", ConversationSchema)
