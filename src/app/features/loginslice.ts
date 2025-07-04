import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { supabase } from "../../config/supabaseClient"
import { RootState } from "../store"
import cookieService from "../../services/cookieService";

interface LoginArgs {
    email: string;
    password: string;
}

interface SupabaseSession {
    access_token: string;
}

interface SupabaseUserData {
    session: SupabaseSession | null;
    user: {
        id: string;
        email: string;
    } | null;
}

interface LoginState {
    loading: boolean;
    data: SupabaseUserData | null;
    error: string | null;
}

const initialState: LoginState = {
    loading: false,
    data: null,
    error: null,
}

export const userLogin = createAsyncThunk<
    SupabaseUserData,
    LoginArgs,
    { rejectValue: string }
>(
    "login/userLogin",
    async ({ email, password }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        console.log("THUNK STARTED");
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            console.log("SUPABASE RESPONSE", data, error);
            if (error) {
                return rejectWithValue(error.message);
            }
            return data as SupabaseUserData;
        } catch (error : any) {
            console.log("THUNK ERROR", error);
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

const loginSlice = createSlice({
    initialState,
    name: "login",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log("FULFILLED ACTION", action);
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                if (action.payload.session && action.payload.session.access_token) {
                    const expiresDate = new Date();
                    expiresDate.setDate(expiresDate.getDate() + 7);
                    cookieService.set("accessToken", action.payload.session.access_token, { expires: expiresDate });
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log("REJECTED ACTION", action);
                state.loading = false;
                state.data = null;
                state.error = action.payload as string;
            });
    },
});

export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
