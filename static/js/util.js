// var baseUrl = 'http://localhost:3000/'
var baseUrl = 'http://192.168.1.109:3000/'
module.exports = {
	get: function(path, data, callback) {
		var $defer = $.Deferred();
		$.ajax({
			url:baseUrl+path,
			type: 'GET',
			dataType: 'jsonp',
            jsonpCallback: 'cb',
			error: function(xhr, statue) {
				console.log(xhr,statue)
				typeof callback == 'function' && callback(statue)
				$defer.reject(statue)
			},
			success: function(data) {
				typeof callback == 'function' && callback(data)
				if( !data ) {
					$defer.reject()
				    return
				} else {
					$defer.resolve(data)
				}
			}
		});

		return $defer
	}
}