var API_BASE = '//localhost:3000/'
var CURRENT_URL = location.href;



var request = function(options) {
    var deferred = $.Deferred();
    var defaultOptions = {
        url: '',
        type: 'GET',
        dataType: 'json',
        data: {}
    }
    var options = $.extend({}, defaultOptions, options);
    var url = API_BASE + options.url;
    $.ajax({
        url: url,
        type: options.type,
        data: options.data,
        dataType: options.dataType,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(res) {
            deferred.resolve(false, res);
            options.callback && options.callback(false, res);
        },
        error: function(res) {
            deferred.reject(res);
            options.callback && options.callback(true, res);
        }
    });
    return deferred.promise();
}

var ajaxApi = {
    get: function(url, callback) {
        return request({
            url: url,
            type: 'GET',
            callback: callback
        });
    },
    post: function(url, data, callback) {
        return request({
            url: url,
            type: 'POST',
            data: data,
            callback: callback
        });
    },
    params: function() {
        return {
            uid: UID,
            token: TOKEN
        }
    }
}

module.exports = ajaxApi;
