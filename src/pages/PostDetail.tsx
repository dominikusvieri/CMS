import { Card, Tag, Button, Space, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostService } from "../services/post.service";
import type { Post } from "../types/post";

export default function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        PostService.getPost(Number(id))
            .then((res) => setData(res.data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Spin />;
    }

    if (!data) {
        return <div>Post not found</div>;
    }

    return (
        <Card
        >
            <h2>{data.title}</h2>

            <Space style={{ marginBottom: 16 }}>
                <Tag>{data.language}</Tag>
                <Tag color={data.status === "published" ? "green" : "orange"}>
                    {data.status}
                </Tag>
            </Space>

            <p>{data.content}</p>
            <Button
                type="primary" htmlType="submit"
                onClick={() => navigate(`/post/${data.id}/edit`)}
            >
                Edit
            </Button>
            <Button
                onClick={() => navigate(-1)}>
                Back
            </Button>
        </Card>
    );
}
