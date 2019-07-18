/**
 * 
 * TmapWebView.js
 * 
 * 모바일 App 함수 호출용
 * 
 * @version 1.0
 * @author sh.yu
 * @since 2016.03.07
 */
var TmapApp = TmapApp || {
	urlSchemeByProxy : function(cmd) {
		if (!TmapWebView.isInApp) {
			console.log('TmapApp.', cmd);
			alert(cmd);
			if (cmd.indexOf('onBackKeyPressed') > -1) {
				history.back();
			}
			return;
		}
		var url = "tmapjs://" + cmd;
		var iframe = document.createElement('IFRAME');
		iframe.setAttribute('src', url);
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	},
	
	openBrowser : function(url/* String */) {
		this.urlSchemeByProxy('openBrowser?url=' + url);
	},

	/**
	 * makeToast
	 * 
	 * @param message {String}
	 */
	makeToast : function(msg) {
		this.urlSchemeByProxy('makeToast?msg=' + msg);
	},

	onBackKeyPressed : function(errorCode/* int */, errorMsg/* String */) {
		this.urlSchemeByProxy("onBackKeyPressed?errorCode=" + errorCode
				+ '&errorMsg=' + errorMsg);
	},
	
	finishWithRefresh : function(errorCode/* int */, errorMsg/* String */) {
		this.urlSchemeByProxy("finishWithRefresh?errorCode=" + errorCode
				+ '&errorMsg=' + errorMsg);
	},
	

	/**
	 * makeDialogPopup
	 * 
	 * @param title {String} Dialog에서 사용될 title
	 * @param msg {String} Dialog 에서 사용될 message
	 * @param cancel {String} Dialog에서 취소버튼 문구
	 * @param confirm {String} Dialog에서 확인버튼 문구
	 * @param callJS {String} callback event
	 */
	makeDialogPopup : function(title, msg, cancel, confirm, callJS) {
		this.urlSchemeByProxy("makeDialogPopup?title=" + title
				+ '&msg=' + msg+ '&cancel=' + cancel+ '&confirm=' + confirm+ '&callJS=' + callJS);
	},

	updateAccessKey : function(key/* String */) {
		this.urlSchemeByProxy("updateAccessKey?key=" + key);
	}
};
var TmapWebView = {
	appName : 'Tmap',
	userAgent : navigator.userAgent.toLowerCase(),
	isInApp : false,
	isIOS : false,
	isAndroid : false,
	
	callback : function(event, data) {
		if (typeof (event) == 'function') {
			event(data);
		} else if (typeof (event) == 'string') {
			this.callbackComplete(event, data);
		}
	},
	callbackComplete : function(event, data){
		// function to be customized by each page
	},
	closeWebView : function() {
		TmapApp.finishWithRefresh();
		TmapApp.onBackKeyPressed('','');
	}
};
if (TmapWebView.userAgent.indexOf(TmapWebView.appName.toLowerCase()) > -1) {
	//console.log('TmapWebView.userAgent', TmapWebView.userAgent);
	TmapWebView.isInApp = true;
	if (TmapWebView.userAgent.indexOf('ios') > -1) {
		TmapWebView.isIOS = true;
	} else {
		TmapWebView.isAndroid = true;
	}
}
// EOF
