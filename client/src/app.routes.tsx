import { Navigate, Route } from "@tanstack/react-location"
import HomeLayout from "./layout/HomeLayout"
import InboxList from "./pages/inbox/InboxList"
import EmailCompose from "./pages/email/EmailCompose"
import SentEmails from "./pages/sent/SentEmails"

export const routes: Route[] = [
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: "/inbox",
                element: <InboxList />,
            },
            {
                path: "/new",
                element: <EmailCompose />,
            },
            {
                path: "sent",
                element: <SentEmails />,
            },
            {
                path: "*",
                element: <InboxList />,
            }
        ]
    }
]
