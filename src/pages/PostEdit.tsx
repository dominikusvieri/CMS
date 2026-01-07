import { Button, Card, Form, Input, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { postApi } from "../services/post.api";
import type {  PostUpdate } from "../types/post";

export default function PostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (!id) return;

        postApi.getPost(Number(id)).then((res) => {
            form.setFieldsValue(res.data);
        });
    }, [form, id]);

    const onFinish = async (values: PostUpdate) => {
        await postApi.updatePost(Number(id), values);
        message.success("Post updated");
        navigate("/post");
    };

    return (
        <Card title="Edit Post">
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="content" label="Content">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item name="language" label="Language">
                    <Select
                        options={[
                            { value: "en", label: "EN" },
                            { value: "id", label: "ID" },
                        ]}
                    />
                </Form.Item>

                <Form.Item name="status" label="Status">
                    <Select
                        options={[
                            { value: "draft", label: "Draft" },
                            { value: "published", label: "Published" },
                        ]}
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Form>
        </Card>
    );
}
