import { useNavigate } from "@tanstack/react-location"
import { Menu } from "antd"
import { MenuInfo } from "rc-menu/lib/interface"
import { memo } from "react"

type MenuType = {
    key: string
    label: string
}

const dataSource: MenuType[] = [
    { key: "/new", label: "Compose new Email" },
    { key: "/inbox", label: "Inbox" },
    { key: "/sent", label: "Sent" },
]

const SideMenu = () => {
    const navigate = useNavigate()

    const handleMenuCLick = ({ key }: MenuInfo) => navigate({ to: key, replace: true })

    return <Menu items={dataSource} mode="vertical" onClick={handleMenuCLick} />
}

export default memo(SideMenu)
