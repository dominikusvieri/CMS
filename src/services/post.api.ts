import axios from "axios";
import type { Post, PostCreate, PostQuery, PostUpdate } from "../types/post";



const api = axios.create({
  baseURL: "/", 
});

export const postApi = {
  getPosts: (query: PostQuery) =>
    api.get<Post[]>("/posts", {
      params: {
        _page: query.page,
        _limit: query.limit,
        q: query.search,
        status: query.status,
        language: query.language,
        _sort: "createdAt",
        _order: "desc",
      },
    }),

  getPost: (id: number) =>
    api.get<Post>(`/posts/${id}`),

  createPost: (payload: PostCreate) =>
    api.post<Post>("/posts", payload),

  updatePost: (id: number, payload: PostUpdate) =>
    api.put<Post>(`/posts/${id}`, payload),

  deletePost: (id: number) =>
    api.delete(`/posts/${id}`),
};
