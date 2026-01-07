import { Table, Input, Tag, Row, Col, Select, Button, Space, message } from "antd";
import { useEffect, useState } from "react";
import { PostService } from "../services/post.service";
import type { Post } from "../types/post";
import { Link, useNavigate } from "react-router-dom";


export default function PostList() {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState<
        "id" | "en" | undefined
    >();
    const [status, setStatus] = useState<
        "draft" | "published" | undefined
    >();

    const handleDelete = async (id: number) => {
        await PostService.deletePost(id);
        setData((prev) => prev.filter((item) => item.id !== id));
        setTotal((prev) => prev - 1);
        message.success("Post deleted");
    };

    const navigate = useNavigate()
    useEffect(() => {
        let active = true;

        const fetchPosts = async () => {
            setLoading(true);

            const res = await PostService.getPosts({
                page,
                limit: pageSize,
                search,
                language,
                status,
            });

            if (!active) return;

            setData(res.data);
            setTotal(res.total);
            setLoading(false);
        };

        fetchPosts();

        return () => {
            active = false;
        };
    }, [page, pageSize, search, language, status]);


    return (
        <>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Input.Search
                        placeholder="Search title..."
                        allowClear
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        onSearch={(value) => {
                            setPage(1);
                            setSearch(value);
                        }}
                    />
                </Col>

                <Col span={4}>
                    <Select
                        placeholder="Language"
                        allowClear
                        style={{ width: "100%" }}
                        onChange={(value) => {
                            setPage(1);
                            setLanguage(value);
                        }}
                        options={[
                            { value: "id", label: "ID" },
                            { value: "en", label: "EN" },
                        ]}
                    />
                </Col>

                <Col span={4}>
                    <Select
                        placeholder="Status"
                        allowClear
                        style={{ width: "100%" }}
                        onChange={(value) => {
                            setPage(1);
                            setStatus(value);
                        }}
                        options={[
                            { value: "published", label: "Published" },
                            { value: "draft", label: "Draft" },
                        ]}
                    />
                </Col>
                <Button
                    onClick={() => {
                        setSearch("");
                        setLanguage(undefined);
                        setStatus(undefined);
                        setPage(1);
                    }}
                >
                    Reset Filter
                </Button>
                <Button
                    onClick={() => {
                        navigate("/post/create")
                    }}
                >
                    Create Post
                </Button>
            </Row>

            <Table
                rowKey="id"
                loading={loading}
                dataSource={data}
                pagination={{
                    current: page,
                    pageSize,
                    total,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                        render: (title: string, record: Post) => (
                            <Link to={`/post/${record.id}`}>
                                {title}
                            </Link>
                        ),
                    },
                    {
                        title: "Language",
                        dataIndex: "language",
                        render: (lang) => <Tag>{lang}</Tag>,
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        render: (status) => (
                            <Tag color={status === "published" ? "green" : "orange"}>
                                {status}
                            </Tag>
                        ),
                    },
                    {
                        title: "Action",
                        render: (_, record) => (
                            <Space>
                                <Button onClick={() => navigate(`/post/${record.id}/edit`)}>
                                    Edit
                                </Button>

                                <Button danger onClick={() => handleDelete(record.id)}>
                                    Delete
                                </Button>

                            </Space>
                        ),
                    }

                ]}
            />
        </>
    );
}
