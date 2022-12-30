import { Form, Input, Button, notification } from "antd"
import TextArea from "antd/es/input/TextArea"
import axios from "axios"
import React from "react"
import { API_URL } from "../../consts"

const EmailCompose = () => {
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();


    const handleEmailForm = async (values: Record<string, string>) => {
        //* usually i use an axios instance with an interceptor for all my communication with the api
        try {
            await axios.post(`${API_URL}/email`, values)
            form.resetFields();
            api.success({ message: "Success", description: "Email Success"})
        } catch (error) {
            console.log(error)
            api.error({ message: "Error", description: "Email failed"})
        }
    }

    return (
        <div>
           <>{contextHolder}</>
           <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" onFinish={handleEmailForm} className="px-10 py-10">
            <Form.Item label="from" name="from">
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label="to" name="to">
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label="Subject" name="subject">
                <Input type="text" required/>
            </Form.Item>
            <Form.Item label="Content" name="textContent">
                <TextArea rows={4} required/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-gray-500">Send</Button>
            </Form.Item>
        </Form>
        </div>
        
    )
}

export default EmailCompose
