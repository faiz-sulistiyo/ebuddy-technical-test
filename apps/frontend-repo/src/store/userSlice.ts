import { Pagination, User } from "@ebuddy/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: User
    pagination: Pagination
}

export const initialState: UserState = {
    user: {
        name: "",
        email: "",
        totalAverageWeightRatings: 0,
        numberOfRents: 0,
        recentlyActive: 0
    },
    pagination: {
        page: 1,
        limit: 10,
        totalItem: 0
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Define payload type for setUser
        setUser: (state, action: PayloadAction<User>) => {
            state.user = { ...action.payload }; 
        },

        resetUser: (state) => {
            state.user = initialState.user;
        },

        // Define payload type for setPagination
        setPagination: (state, action: PayloadAction<Pagination>) => {
            state.pagination = { ...action.payload }; 
        },
    }
});

export const { setUser, resetUser, setPagination } = userSlice.actions;

export default userSlice.reducer;