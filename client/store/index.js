import {createStore, applyMiddleware, combineReducers} from "redux";
import thunks from "redux-thunk";
import TYPES from "./types";
import userReducer from './userReducer';
import gameReducer from './gameReducer';
import searchReducer from './searchReducer';

const masterReducer = combineReducers({
    games: gameReducer,
    users: userReducer,
})

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;