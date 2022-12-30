import { Avatar, List, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { API_URL } from "../../consts"
import axios from "axios"
import EmailList from "../../components/EmailList"
import { ConversationInterface } from "../../shared/conversationInterface"

const InboxList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [conversations, setConversations] = useState<ConversationInterface[]>([])

    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true)
            const { data: { data } } = await axios.get(`${API_URL}/email`)
            setConversations(data)
            setIsLoading(false)
        }

        fetchConversations()
    }, [])

    return (
        <EmailList isLoading={isLoading} conversations={conversations} />
    )
}

export default InboxList
