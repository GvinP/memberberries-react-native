import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { api, PostItem } from "../src/api/api";

export const getFirstPagePosts = createAsyncThunk<PostItem[] | undefined>(
  "posts/getFirstPagePosts",
  async (_, apiThunk) => {
    try {
      const res = await api.getAllPosts(1);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk<PostItem[] | undefined, number>(
  "posts/getAllPosts",
  async (page, apiThunk) => {
    try {
      const res = await api.getAllPosts(page);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPost = createAsyncThunk<void, PostItem>(
  "posts/addPost",
  async (post, apiThunk) => {
    try {
      await api.addPost(post);
      apiThunk.dispatch(getFirstPagePosts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk<
  void,
  { id: string; post: PostItem }
>("posts/updatePost", async ({ id, post }, apiThunk) => {
  try {
    await api.updatePost(id, post);
    apiThunk.dispatch(getFirstPagePosts());
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk<void, string>(
  "posts/deletePost",
  async (id, apiThunk) => {
    try {
      await api.deletePost(id);
      apiThunk.dispatch(getFirstPagePosts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const likePost = createAsyncThunk<void, string>(
  "posts/likePost",
  async (id, apiThunk) => {
    try {
      await api.likePost(id);
      apiThunk.dispatch(getFirstPagePosts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchPost = createAsyncThunk<PostItem[] | undefined, string>(
  "posts/searchPost",
  async (search, apiThunk) => {
    try {
      const res = await api.searchPosts(search);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "postsReducer",
  initialState: {
    allPosts: [] as PostItem[],
    noPosts: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFirstPagePosts.fulfilled, (state, action) => {
        state.allPosts = action.payload!;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.concat(action.payload!);
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.allPosts = action.payload!;
      });
  },
});

export const posts = postsSlice.reducer;
