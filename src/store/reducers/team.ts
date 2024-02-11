import { createSlice } from '@reduxjs/toolkit'
import { MTeam } from '../../models/team/team';
import { deleteTeamAction, getTeamsAction } from '../actions/team';

interface ITeamState {
    teams: MTeam[]
    currentTeam: MTeam | undefined
}

const initialState: ITeamState = {
    teams: [],
    currentTeam: undefined
}

const slice = createSlice({
    initialState,
    name: 'team',
    reducers: {
        setCurrentTeam(state, action) {
            state.currentTeam = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getTeamsAction.fulfilled, (state, action) => {
            const teams = action.payload.map(team => new MTeam(team));
            state.teams = teams;
        })
        .addCase(deleteTeamAction.fulfilled, (state, action) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        });
    },
})

export const { setCurrentTeam } = slice.actions;

export default slice.reducer;