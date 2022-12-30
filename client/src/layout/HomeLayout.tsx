import { Outlet } from "@tanstack/react-location"
import { Col, Layout, Row, notification } from "antd"
import SideMenu from "../pages/Home/SideMenu"

const DashboardLayout = () => {
    return (
        <div className="h-screen py-10">
            <Row gutter={[20, 20]} >
                <Col xs={24} md={4}>
                    <SideMenu />
                </Col>
                <Col xs={24} md={20}>
                    <Layout>
                        <Outlet />
                    </Layout>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardLayout
