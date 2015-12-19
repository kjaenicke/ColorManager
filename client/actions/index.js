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
    config.getConfig()
    .then(c => {
      dispatch(receiveConfig(c));
    })
    .catch(err => {
      throw new Error(err);
    })
  };
}

export function toggleIsEnabled(){
  return {
    type: types.TOGGLE_ISENABLED
  };
}

export function saveConfig(configToSave){
  return dispatch => {
    config.saveConfig(configToSave)
    .then(() => {
      dispatch(configSaveSuccessful(configToSave));
    })
    .catch((err) => {
      dispatch(configSaveFailed(err));
    });
  };
}

export function configSaveSuccessful(config){
  return {
    type: types.CONFIG_SAVED,
    config
  };
}

export function configSaveFailed(err){
  return {
    type: types.CONFIG_SAVE_FAILED,
    err
  };
}

export function dismissAlerts(){
  return { type: types.DISMISS_ALERTS };
}
