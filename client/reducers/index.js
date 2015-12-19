import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {
  predefinedColors: [],
  isEnabled: true,
  isUsingSchedule: false,
  currentColor: "FFFFFF"
};

const initialAlertState = {
  showSuccessAlert: false,
  showFailureAlert: false
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

function alertStatus(state = initialAlertState, action){
  switch(action.type){
    case types.INIT_CONFIG_SAVE:
    return _.extend({}, state, { showSuccessAlert: false, showFailureAlert: false });

    case types.CONFIG_SAVED:
    return _.extend({}, state, { showSuccessAlert: true });

    case types.CONFIG_SAVE_FAILED:
    return _.extend({}, state, { showFailureAlert: true });

    case types.DISMISS_ALERTS:
    return _.extend({}, state, { showSuccessAlert: false, showFailureAlert: false });

    default:
      return state;
    }
}

export default combineReducers({
  config,
  alertStatus
})
