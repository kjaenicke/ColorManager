import config from '../api/config';
import * as types from '../constants/actionTypes';

function receiveConfig(config){
  return {
    type: types.RECEIVE_CONFIG,
    config: config
  };
}

export function getConfig(){
  return dispatch => {
    dispatch(receiveConfig(config.getConfig()));
  };
}

export function toggleIsEnabled(){
  return {
    type: types.TOGGLE_ISENABLED
  };
}
