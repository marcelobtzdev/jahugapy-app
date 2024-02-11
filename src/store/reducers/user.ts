import { createSlice } from '@reduxjs/toolkit'
import { addUserAction, loginAction, logoutAction, updateUserAction, validateUserAction } from '../actions/user'
import { MUser } from '../../models/user';
import IUser from '../../interfaces/user/user';

interface IUserState {
    registeredUser: MUser | undefined
    user: MUser | null;
    accessToken: string | null
}

const initialState: IUserState = {
    registeredUser: undefined,
    user: null,
    accessToken: null
}

const slice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        clearUser(state) {
            state.user = null;
            state.accessToken = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.user = new MUser(action.payload.user as IUser);
            state.accessToken = action.payload.accessToken;
        })
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.user = null;
            state.accessToken = null;
        })
        builder.addCase(addUserAction.fulfilled, (state, action) => {
            const user = new MUser(action.payload);
            state.registeredUser = user;
        })
        builder.addCase(validateUserAction.fulfilled, (state, action) => {
            state.registeredUser = undefined;
        })
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
            const updatePayload = new MUser(action.payload);
            state.user = updatePayload;
        })
    },
})

export const { clearUser } = slice.actions

export default slice.reducer;