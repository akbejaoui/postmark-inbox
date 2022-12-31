import { Avatar, Card, List, Skeleton } from "antd"
import { useState } from "react"
import { ConversationInterface } from "../shared/conversationInterface"
import { DiscussionInterface } from "../shared/discussionInterface"

type EmailDetailsType = {
    isLoading: boolean
    subject: string
    thread: DiscussionInterface[]
}
const EmailDetails = ({ isLoading, subject, thread }: EmailDetailsType) => {
    const [isContentShowing, setShowContent] = useState(false)

    const getAvatar = (fromName: string, from: string) => {
        const getFirstChar = (text: string) => text.substring(0, 1)
        if (fromName) {
            const name = fromName.split(" ")
            return (getFirstChar(name[0]) + getFirstChar(name[1])).toUpperCase()
        }

        return getFirstChar(from).toUpperCase() ?? "-"
    }

    //* better use moment
    const formatDate = (textDate: string) => {
        const padTwoDigits = (value: number) => value.toString().padStart(2, "0")

        const date = new Date(textDate)
        return `${padTwoDigits(date.getDate())}/${padTwoDigits(date.getMonth() + 1)}/${date.getFullYear()} ${padTwoDigits(date.getHours())}:${padTwoDigits(
            date.getMinutes()
        )}`
    }

    return (
        <>
            <List.Item
                actions={[
                    <a key="list" onClick={() => setShowContent(!isContentShowing)}>
                        view
                    </a>,
                    <a key="delete">delete</a>,
                ]}
            >
                <Skeleton avatar title={false} loading={isLoading} active>
                    <List.Item.Meta
                        avatar={<Avatar>{getAvatar(thread[0]["fromName"], thread[0]["from"])}</Avatar>}
                        title={subject}
                        description={thread[0]["textContent"]}
                    />
                </Skeleton>
            </List.Item>

            {isContentShowing && (
                <List.Item className="flex flex-col items-center gap-y-4">
                    {thread.map((thread: DiscussionInterface, index: number) => (
                        <Card key={index} title={subject} className="w-full">
                            <div className="text-xs flex flex-col justify-center">
                                <span>from: {thread.from}</span>
                                <span>to: {thread.to}</span>
                            </div>
                            <p className="text-md py-10 border border-gray-300 px-2 my-2 rounded-lg">{thread.textContent}</p>
                            <span className="text-xs text-gray-500">sent: {formatDate(thread.date)}</span>
                        </Card>
                    ))}
                </List.Item>
            )}
        </>
    )
}

const EmailList = ({ isLoading, conversations }: { isLoading: boolean; conversations: ConversationInterface[] }) => {
    return (
        <List
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={conversations}
            renderItem={({ subject, thread }, index) => <EmailDetails key={index} isLoading={isLoading} subject={subject} thread={thread} />}
        />
    )
}

export default EmailList
