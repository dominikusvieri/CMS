export type Language = "id" | "en";
export type PostStatus = "draft" | "published";

export type Post = {
  id: number;
  title: string;
  content: string;
  language: "id" | "en";
  status: "draft" | "published";
  createdAt: string;
};

export type PostCreate = {
  title: string;
  content: string;
  language: "id" | "en";
  status: "draft" | "published";
};

export type PostUpdate = PostCreate;

export type PostQuery = {
  page?: number;
  limit?: number;
  search?: string;
  language?: Language;
  status?: PostStatus;
};
