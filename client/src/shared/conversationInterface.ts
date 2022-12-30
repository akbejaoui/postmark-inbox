import { DiscussionInterface } from "./discussionInterface"

export interface ConversationInterface {
    subject: string
    thread: DiscussionInterface[]
}