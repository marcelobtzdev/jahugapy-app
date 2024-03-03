import { createSlice } from '@reduxjs/toolkit'
import MEvent from '../../models/event/event';
import { getEventsAction } from '../actions/event';

interface IEventState {
    events: MEvent[]
    currentEvent: MEvent | undefined
}

const initialState: IEventState = {
    events: [],
    currentEvent: undefined
}

const slice = createSlice({
    initialState,
    name: 'event',
    reducers: {
        setCurrentEvent(state, action) {
            state.currentEvent = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getEventsAction.fulfilled, (state, action) => {
            const events = action.payload.map(event => new MEvent(event));
            state.events = events;
        })
    },
})

export const { setCurrentEvent } = slice.actions;

export default slice.reducer;