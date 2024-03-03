import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import IEvent from '../../interfaces/event/event';
import { RootState } from '..';

export const getEventsAction = createAsyncThunk(
    'event/list',
    async (_, {rejectWithValue}) => {
        try {
            const {data: response}: AxiosResponse<IEvent[]> = await axios.get('/events');

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addEventTeamAction = createAsyncThunk(
    'eventTeam/add',
    async (teamdId: string, {rejectWithValue, getState}) => {
        try {
            const { event: { currentEvent } } = getState() as RootState;
            const {data: response}: AxiosResponse<IEvent> = await axios.post(`/events/${currentEvent?.id}/teams`, {
                team_id: teamdId
            });

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);