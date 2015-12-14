import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {
    predefinedColors : [],
    isEnabled : true,
    currentColor : "FFFFFF"
};

function config(state = initialState, action){
  switch(action.type){
    case types.RECEIVE_CONFIG:
    return action.config;

    case types.TOGGLE_ISENABLED:
    return _.extend({}, state, { isEnabled: !state.isEnabled });

    default:
      return state;
  }
}

export default combineReducers({
  config
})
