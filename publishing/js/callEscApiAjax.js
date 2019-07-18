/**
 * 
 * callEscApiAjax.js
 * 
 * ESC API Ajax 호출용
 * 
 * @version 1.0
 * @author Lim Kyungtae
 * @since 2016.03.17
 */
function callEscAjax(_url, _data, _succ){
	
	// shift arguments if data argument was omitted
	if (jQuery.isFunction(_data)) {
		_succ = _data;
		_data = undefined;
	}
	
	$.ajax({
	    url : _url,
	    dataType : "json",
	    type : "get",
	    data : _data,
	    success: _succ,
	    complete:function(xhr){
	    	
	    	var ak = getCookie('AK'); 
	    	var json =$.parseJSON(xhr.responseText);
	    	
	    	//TODO 성공여부에 관계없이 accesskey 업뎃????
	    	
	    	if(json.accessKey != null && json.accessKey != ""){
	    		
	    		setCookie('AK', json.accessKey);
	    		
	    		if(ak != json.accessKey && ak!=null && ak != ""){
	    			TmapApp.updateAccessKey(json.accessKey);
	    		}
	    	}
	    	
	    	if(json.errorCode != '000000' && json.errorCode != '230401'){
	    		TmapApp.onBackKeyPressed(json.errorCode, json.errorMessage);
	    	}
	    },
	    error:function(request,status,error){
    		TmapApp.onBackKeyPressed(status, error);
	    }
	}); 
}
