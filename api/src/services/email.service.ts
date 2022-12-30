import { EmailEventTypeEnum } from "../shared/emailEventTypeEnum"
import { POSTMARK_TOKEN } from "../shared/env.utils"
import Logger from "../utils/logger"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const postmark = require("postmark")

const client = new postmark.ServerClient(POSTMARK_TOKEN)

const EmailService = {
    sendEmail: async (data: any) => {
        try {
            const response = await client.sendEmail({
                From: data.from,
                To: data.to,
                ReplyTo: "9d622729324d1bebebd40c4f2ef880ab@inbound.postmarkapp.com",
                Subject: data.subject,
                TextBody: data.textContent,
                MessageStream: EmailEventTypeEnum.OUTBOUND,
            })
    
            return response
        } catch (error) {
            Logger.error(`Failed to deliver email with error: ${JSON.stringify(error)}`)
            throw new Error("Failed to deliver email")
        }
    }
}

export default EmailService