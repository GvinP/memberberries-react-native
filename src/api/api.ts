import axios from "axios";
import { FormDataType } from "../screens/Login/Login";

const BASE_URL = "https://memberberries-backend.herokuapp.com";
// const BASE_URL = "http://192.168.100.6:5000";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export type PostItem = {
  _id?: string;
  title: string;
  message: string;
  name?: string;
  author?: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt?: Date;
};

export const api = {
  getAllPosts(page: number) {
    return instance
      .get<{ data: PostItem[] }>(`/posts?page=${page}`)
      .then((res) => res.data);
  },
  getPost(id: string) {
    return instance.get(`posts/${id}`);
  },
  addPost(post: PostItem) {
    return instance.post("posts", post);
  },
  updatePost(id: string, post: PostItem) {
    return instance.patch(`posts/${id}`, post);
  },
  deletePost(id: string) {
    return instance.delete(`posts/${id}`);
  },
  likePost(id: string) {
    return instance.patch(`posts/${id}/like`);
  },
};

export const authApi = {
  registration(formData: FormDataType) {
    return instance.post("/user/registration", formData);
  },
  login(formData: FormDataType) {
    return instance.post("/user/login", formData);
  },
};
