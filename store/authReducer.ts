import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, PostItem } from "../src/api/api";
import { FormDataType } from "../src/screens/Login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

export type AuthDataType = {
  result: UserType;
  token: string;
};

export const login = createAsyncThunk<AuthDataType, FormDataType>(
  "auth/login",
  async (formData: FormDataType, apiThunk) => {
    try {
      const res = await authApi.login(formData);
      await AsyncStorage.setItem("userData", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
);

export const registration = createAsyncThunk<AuthDataType, FormDataType>(
  "auth/registration",
  async (formData: FormDataType, apiThunk) => {
    try {
      const res = await authApi.registration(formData);
      return res.data;
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: "autnReducer",
  initialState: {
    UserData: {} as UserType,
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.UserData = action.payload.result;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.UserData = action.payload.result;
      });
  },
});

export const auth = authSlice.reducer;
