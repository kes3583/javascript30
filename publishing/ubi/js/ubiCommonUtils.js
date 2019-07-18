;
/**
 * 
 * ubiCommonUtils.js
 * 
 * ubiCommonUtils
 * 
 * @version 1.0
 * @author Lim Kyungtae
 * @since 2016.03.17
 */
/*** Util ***********************************************/

/* null 체크 num return */
function checkNullReturnNum(value, defaultvalue){
	if(value == null || value == "") return defaultvalue;
	// TODO isNaN 체크하여 parseInt까지 여기에
	return value;
}
	
/* sec -> **시 **분 return */
function returnHourMin(sec) {
	var h = 0;
	var m = 0;
	
	if(sec > 3600){
		h = parseInt(sec/3600);
		sec %= 3600;
	}
	if(sec > 60){
		m=parseInt(sec/60);
		sec %= 60;
	}
	
	return h+'시간 ' + m+'분'
}

/* 오늘 날짜를 yyyyMM형의 문자열로 변환 */
function nowDate() {	
	var date = new Date()
	
    var sYear = date.getFullYear();
    var sMonth = date.getMonth(new Date()) + 1;

    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    return sYear + sMonth;
}


/**
 * 기준일로부터 이전달 또는 다음달 생성
 * 
 * @param prevNext	이전, 다음달 구분
 * @param referenceVal	기준일
 * @returns YYYYmm
 */
function getPrevNextMonth(prevNext, referenceVal){
	var dVal = referenceVal;
	var sYear = dVal.substring(0,4);
	var sMonth = dVal.substring(4,6);
	var iYear = parseInt(sYear);
	var iMonth = parseInt(sMonth);
	
	if(prevNext == 'NEXT') iMonth = iMonth+1;
	else iMonth = iMonth -1;
	
	if(iMonth < 1){
		iYear--;
		iMonth = 12;
	}else if(iMonth > 12){
		iYear++;
		iMonth = 1;
	}
	
	sYear=''+iYear;
	if(iMonth < 10) sMonth = '0' + iMonth;
	else sMonth = '' + iMonth;
	
	return sYear + sMonth;
}


function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}
/********************************************************/
