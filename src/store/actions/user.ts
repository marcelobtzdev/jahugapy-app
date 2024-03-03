import IAddUpdateUser from '../../interfaces/user/addUpdateUser';
import IUser from '../../interfaces/user/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import { RootState } from '..';
import IUserValidation from '../../interfaces/user/validation';
import * as Device from 'expo-device';
import ILogin from '../../interfaces/login';
import { Platform } from "react-native";

interface IAuthResponse {
    user: IUser
    accessToken: string
}

export const loginAction = createAsyncThunk(
    'user/login',
    async (login: ILogin, {rejectWithValue}) => {
        try {
            let {username, password} = login;
            username = username.trim();
            password = password.trim();

            const body = {
                username: username,
                password,
                device_name: Platform.OS === 'web' ? 'web' : Device.deviceName
            };

            const {data: userResponse}: AxiosResponse<IAuthResponse> = await axios.post('/login', body);

            return userResponse;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutAction = createAsyncThunk(
    'user/logout',
    async (params: undefined, {rejectWithValue}) => {
        try {
            const userResponse = await axios.get('/logout');

            return userResponse;   
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addUserAction = createAsyncThunk(
    'user/add',
    async (addData: IAddUpdateUser, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<IUser> = await axios.post('/register', addData);

            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const validateUserAction = createAsyncThunk(
    'user/validate',
    async (validateData: IUserValidation, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<IUser> = await axios.post(`/validate-user`, validateData);

            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const updateUserAction = createAsyncThunk(
    'user/update',
    async (updateData: IAddUpdateUser, {rejectWithValue, getState}) => {
        try {
            const { user: { user } } = getState() as RootState;
            const {data: response}: AxiosResponse<IUser> = await axios.put(`/users/${user?.id}`, updateData);

            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const resendValidationCodeAction = createAsyncThunk(
    'user/resendValidationCode',
    async (_, {rejectWithValue, getState}) => {
        try {
            const { user: { registeredUser } } = getState() as RootState;
            const {data: response}: AxiosResponse<IUser> = await axios.post(`/resend-validation-code/${registeredUser?.id}`);

            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);