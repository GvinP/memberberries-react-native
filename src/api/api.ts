import axios from "axios";

const BASE_URL = "https://memberberries-backend.herokuapp.com";
// const BASE_URL = "http://localhost:5000";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export type PostItem = {
    _id: string;
    title: string;
    message: string;
    name: string;
    author: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    comments: string[];
    createdAt: Date;
};

export const api = {
  getAllPosts(page: number) {
    return instance.get<{ data: PostItem[] }>(`/posts?page=${page}`).then(res=>res.data);
  },
  getCurrentPost(id: string) {
    return instance.get<any>(`/posts/${id}`)
  }
};
