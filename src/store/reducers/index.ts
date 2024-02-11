import { combineReducers } from 'redux';
import userReducer from '../reducers/user';
import teamReducer from '../reducers/team';

export default combineReducers({
    user: userReducer,
    team: teamReducer,
});

