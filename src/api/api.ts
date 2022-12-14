import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { FormDataType } from "../screens/Login/Login";

// const BASE_URL = "https://memberberries-backend.herokuapp.com";
const BASE_URL = "http://192.168.100.6:5000";

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (req) => {
  const getData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        req.headers!.Authorization = `Bearer ${JSON.parse(userData).token}`;
      }
    } catch (e) {
      console.log(e);
    }
  };
  await getData();
  return req;
});

export type PostItem = {
  _id?: string;
  title: string;
  message: string;
  name?: string;
  author?: string;
  userId?: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt?: Date;
};

export const api = {
  getAllPosts(page: number) {
    return instance.get<PostsResponse>(`/posts?page=${page}`);
  },
  getPost(id: string) {
    return instance.get<PostsResponse>(`/posts/${id}`);
  },
  addPost(post: PostItem) {
    return instance.post("/posts", post);
  },
  updatePost(id: string, post: PostItem) {
    return instance.patch(`/posts/${id}`, post);
  },
  deletePost(id: string) {
    return instance.delete(`/posts/${id}`);
  },
  likePost(id: string) {
    return instance.patch(`/posts/${id}/like`);
  },
  searchPosts(search: string) {
    console.log(search);
    return instance.get<PostItem[]>(
      `/posts/search?searchQuery=${search || "none"}&tags=${"none"}`
    );
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

type PostsResponse = {
  data: PostItem[];
  currentPage: number;
  totalPagesCount: number;
};
