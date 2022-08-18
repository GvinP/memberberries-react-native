import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, PostItem } from "../src/api/api";


export const getAllPosts = createAsyncThunk<PostItem[] | undefined, number>('posts/getAllPosts', async (page: number, apiThunk) => {
    try {
        const res = await api.getAllPosts(page)
        return res.data
    } catch (error) {
        
    }
})

export const addPost = createAsyncThunk<PostItem[] | undefined, number>('posts/addPost', async (page: number, apiThunk) => {
    try {
        const res = await api.getAllPosts(page)
        return res.data
    } catch (error) {
        
    }
})


const postsSlice = createSlice({
    name: 'postsReducer',
    initialState: {
        allPosts: [] as PostItem[]
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(getAllPosts.fulfilled, (state, action)=>{
            state.allPosts = state.allPosts.concat(action.payload? action.payload : [])
        })
    },
})

export const posts = postsSlice.reducer