import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import ITeam from '../../interfaces/team/team';
import IAddUpdateTeam from '../../interfaces/team/addUpdateTeam';
import { RootState } from '..';

export const getTeamsAction = createAsyncThunk(
    'team/list',
    async (_, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<ITeam[]> = await axios.get('/teams');

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const addTeamAction = createAsyncThunk(
    'team/add',
    async (addData: IAddUpdateTeam, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<ITeam> = await axios.post('/teams', addData);

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const updateTeamAction = createAsyncThunk(
    'team/update',
    async (updateData: IAddUpdateTeam, {rejectWithValue, getState}) => {
        try {
            const { team: { currentTeam } } = getState() as RootState;
            const {data: response}: AxiosResponse<ITeam> = await axios.put(`/teams/${currentTeam?.id}`, updateData);

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteTeamAction = createAsyncThunk(
    'team/delete',
    async (teamId: number, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<number> = await axios.delete(`/teams/${teamId}`);

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);