import type { Post, PostCreate, PostQuery, PostUpdate } from "../types/post";
import { postApi } from "./post.api";


export const PostService = {
  getPosts: async (
    query: PostQuery
  ): Promise<{ data: Post[]; total: number }> => {
    const res = await postApi.getPosts(query);

    return {
      data: res.data,
      total: Number(res.headers["x-total-count"]),
    };
  },

  getPost: (id: number) => postApi.getPost(id),

  createPost: (payload: PostCreate) =>
    postApi.createPost(payload),

  updatePost: (id: number, payload: PostUpdate) =>
    postApi.updatePost(id, payload),
  
  deletePost: (id: number) =>
    postApi.deletePost(id),
};
