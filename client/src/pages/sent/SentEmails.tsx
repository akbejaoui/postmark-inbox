import axios from 'axios'
import { useEffect, useState } from 'react'
import EmailList from '../../components/EmailList'
import { API_URL } from '../../consts'
import { ConversationInterface } from '../../shared/conversationInterface'
import { DiscussionInterface } from '../../shared/discussionInterface'

const SentEmails = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [conversations, setConversations] = useState<ConversationInterface[]>([])

    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true)
            const { data: { data } } = await axios.get(`${API_URL}/email`)

            const sentDiscussions: ConversationInterface[] = []

            data.forEach(({subject, thread}: { subject: string, thread: DiscussionInterface[]}) => {
                thread.filter(({ type }) => type === "abejaoui-workerbase")
                    .sort((newDiscussion, oldDiscussion) => new Date(newDiscussion.date).getTime() - new Date(oldDiscussion.date).getTime())
                    .map(((data: any) => sentDiscussions.push({ subject, thread: [data]})))
            });

            setConversations(sentDiscussions)
            setIsLoading(false)
        }

        fetchConversations()
    }, [])

    return (
        <EmailList isLoading={isLoading} conversations={conversations} />
    )
}

export default SentEmails