const $ = require('jquery');

class Config {
  static get(){
    let $def = $.Deferred();

    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url: '/config',
      success: function(data){
        $def.resolve(data);
      }
    })

    return $def;
  }

  static update(config){
    let $def = $.Deferred();

    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(config),
      dataType: 'json',
      url: '/config',
      complete: function(xhr){
        $def.resolve(xhr.status === 200);
      }
    })

    return $def;
  }
}

module.exports = Config;
