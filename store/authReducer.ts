import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, PostItem } from "../src/api/api";
import { FormDataType } from "../src/screens/Login/Login";

export type UserType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string
}

export type AuthDataType = {
    UserData: UserType
    token: string
}

export const login = createAsyncThunk<AuthDataType, FormDataType>('auth/login', async (formData: FormDataType, apiThunk) => {
    try {
        const res = await authApi.login(formData)
        return res.data
    } catch (error) {
        
    }
})

export const registration = createAsyncThunk<AuthDataType, FormDataType>('auth/registration', async (formData: FormDataType, apiThunk) => {
    try {
        const res = await authApi.registration(formData)
        return res.data
    } catch (error) {
        
    }
})

// export const clearCurrentPokemon = createAction('root/clearCurrentPokemon')

const authSlice = createSlice({
    name: 'autnReducer',
    initialState: {
        UserData: {} as UserType,
        token: ''
        // allPokemons: [] as PokemonItem[],
        // currentPokemon: {} as Pokemon
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled, (state, action)=>{
            state.UserData = action.payload.UserData
        })
        .addCase(registration.fulfilled, (state, action)=>{
            state.UserData = action.payload.UserData
        })
        // .addCase(clearCurrentPokemon, (state, action)=>{
        //     state.currentPokemon = {} as Pokemon
        // })
    },
})

export const auth = authSlice.reducer