import { createSlice } from '@reduxjs/toolkit'
import MEvent from '../../models/event/event';
import { getEventsAction, addEventScoreAction, updateEventScoreAction } from '../actions/event';
import MEventScore from '../../models/event/eventScore';

interface IEventState {
    events: MEvent[]
    currentEvent: MEvent | undefined
    currentScore: MEventScore | undefined
}

const initialState: IEventState = {
    events: [],
    currentEvent: undefined,
    currentScore: undefined
}

const slice = createSlice({
    initialState,
    name: 'event',
    reducers: {
        setCurrentEvent(state, action) {
            state.currentEvent = action.payload;
        },
        setCurrentScore(state, action) {
            state.currentScore = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getEventsAction.fulfilled, (state, action) => {
            const events = action.payload.map(event => new MEvent(event));
            state.events = events;
        })
        .addCase(addEventScoreAction.fulfilled, (state, action) => {
            const event = new MEvent(action.payload);
            state.currentEvent = event;
        })
        .addCase(updateEventScoreAction.fulfilled, (state, action) => {
            const event = new MEvent(action.payload);
            state.currentEvent = event;
        })
    },
})

export const { setCurrentEvent, setCurrentScore } = slice.actions;

export default slice.reducer;