import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "userProfile",
    initialState: {
        value: null,
    },
    reducers: {
        getProfile: (state)=>{
            state.value = state.value;
        }
    }
})
export const {getProfile} = profileSlice.actions;
export default profileSlice.reducer;
