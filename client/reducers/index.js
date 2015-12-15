import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {
  predefinedColors : [],
  isEnabled : true,
  isUsingSchedule: false,
  currentColor : "FFFFFF"
};

function config(state = initialState, action){
  switch(action.type){
    case types.RECEIVE_CONFIG:
    return _.extend({}, state, action.config);

    case types.CONFIG_SAVED:
    return _.extend({}, state, action.config);

    default:
      return state;
  }
}

export default combineReducers({
  config
})