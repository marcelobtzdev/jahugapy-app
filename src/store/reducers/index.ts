import { combineReducers } from 'redux';
import userReducer from '../reducers/user';
import teamReducer from '../reducers/team';
import eventReducer from '../reducers/event';

export default combineReducers({
    user: userReducer,
    team: teamReducer,
    event: eventReducer,
});

