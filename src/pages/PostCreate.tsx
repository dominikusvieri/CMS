import { Button, Card, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/post.api";
import type { Post } from "../types/post";


export default function PostCreate() {
  const navigate = useNavigate();

  const onFinish = async (values: Post) => {
    await postApi.createPost(values);
    message.success("Post created");
    navigate("/post");
  };

  return (
    <Card title="Create Post">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="language" label="Language" initialValue="en">
          <Select
            options={[
              { value: "en", label: "EN" },
              { value: "id", label: "ID" },
            ]}
          />
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue="draft">
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <Button onClick={() => navigate(-1)}>
          Back
        </Button>
      </Form>
    </Card>
  );
}
