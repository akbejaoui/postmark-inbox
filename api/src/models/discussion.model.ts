import { Schema } from "mongoose"
import { EmailEventTypeEnum } from "../shared/emailEventTypeEnum"

export interface DiscussionInterface {
    messageId: string
    fromName?: string
    from: string
    to: string
    textContent: string
    type: EmailEventTypeEnum,
    date: string
}

export const DiscussionSchema = new Schema(
    {
        messageId: { type: String, required: true},
        fromName: { type: String, required: false },
        from: { type: String, required: true },
        to: { type: String, required: true },
        textContent: { type: String, required: true },
        type: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { _id: false, timestamps: false }
)