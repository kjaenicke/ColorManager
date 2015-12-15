require('es6-promise').polyfill();
require('isomorphic-fetch');

export default {
  getConfig(){
    return new Promise((resolve, reject) => {
      fetch('/config', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((parsed) => {
        resolve(parsed);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },

  saveConfig(config){
    return new Promise((resolve, reject) => {
      if(!config){ reject(); }

      fetch('/config', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}
