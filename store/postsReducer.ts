import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, PostItem } from "../src/api/api";


export const getAllPosts = createAsyncThunk<PostItem[] | undefined, number>('posts/getAllPosts', async (page: number, apiThunk) => {
    try {
        const res = await api.getAllPosts(page)
        return res.data
    } catch (error) {
        
    }
})

// export const getCurrentPokemon = createAsyncThunk<Pokemon | undefined, string>('root/getCurrentPokemon', async (url: string) => {
//     try {
//         const res = await api.getCurrentPokemon(url)
//         return res.data
//     } catch (error) {
        
//     }
// })

// export const clearCurrentPokemon = createAction('root/clearCurrentPokemon')

const postsSlice = createSlice({
    name: 'postsReducer',
    initialState: {
        allPosts: [] as PostItem[]
        // allPokemons: [] as PokemonItem[],
        // currentPokemon: {} as Pokemon
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(getAllPosts.fulfilled, (state, action)=>{
            state.allPosts = state.allPosts.concat(action.payload? action.payload : [])
        })
        // .addCase(getCurrentPokemon.fulfilled, (state, action)=>{
        //     state.currentPokemon = action.payload? action.payload : {} as Pokemon
        // })
        // .addCase(clearCurrentPokemon, (state, action)=>{
        //     state.currentPokemon = {} as Pokemon
        // })
    },
})

export const posts = postsSlice.reducer