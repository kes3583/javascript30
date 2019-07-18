$(function(){
	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	if(iOS) {$("body").addClass("ios");}

	$(window).scroll(function(){
		var now = $(window).scrollTop();
		if(now > 0){
			$("header").addClass("hover")
			$(".topHover").addClass("hover")
		}else{
			$("header").removeClass("hover")
			$(".topHover").removeClass("hover")
		}
	});

	touchEvt($(".backBtn"), true);
	touchEvt($(".rightBtn"), true);
	$(".backBtn").click(function(){
		if(location.href.indexOf("historyMonth") >= 0){
			location.href = "myscore_month.html?index=" + location.href.split("?")[1].split("=")[1]
		}else{
			location.href = "index.html"
		}
	});

	$("header .txt").click(function(){
		location.reload();
	});

	$(".popWrap").click(function(){
		$(".popWrap").addClass("close");
		setTimeout(function(){
			$(".popWrap").removeClass("close").removeClass("open");
		}, 300)
		$("body").removeClass("hidden")
		document.ontouchmove = function (e) {
		  return true;
		}
	});
	setTimeout(function(){
		$(window).resize(function(){
			window.location.reload()
		})
	}, 500);
});

function getGrade(score){ // 등급 클래스
	if(score < 0){
		return "ghost"
	}else if(score == 0){
		return "zero"
	}else if(score < 15){
		return "grade1";
	}else if(score < 30){
		return "grade2";
	}else if(score < 70){
		return "grade3"
	}else if(score < 85){
		return "grade4";
	}else {
		return "grade5"
	}
}

function getStatusTxt(score){ //등급 텍스트 
	var txt = ""
	if(score < 15){
		txt = "위험"
	}else if(score < 30){
		txt = "주의"
	}else if(score < 70){
		txt = "양호"
	}else if(score < 85){
		txt = "안전"
	}else if(score <= 100){
		txt = "모범"
	}

	return txt;
}

function getSolidColor(score){
	if(score < 15){
		return "#f65f5c";
	}else if(score < 30){
		return "#f78157";
	}else if(score < 70){
		return "#ebb535"
	}else if(score < 85){
		return "#99d91d";
	}else {
		return "#1dc89f"
	}
}

function getStatusColor(score){ //등급 그라데이션 컬러
	if(score == 0){
		return ["#d0d3db","#c5cad4"];
	}else if(score < 15){
		return ["#fb6d6a", "#e9514e"];
	}else if(score < 30){
		return ["#ff9642", "#f0740f"];
	}else if(score < 70){
		return ["#f8d325", "#e8ba02"];
	}else if(score < 85){
		return ["#b7e91f", "#85d21a"];
	}else if(score >= 85){
		return ["#3bd894", "#21c6a0"]
	}
}

function setCircle(target, val, color, thick){ //원형그래프 그리기
	var circle = target.circleProgress({
							size:target.width(),
							startAngle: Math.PI * 1.5,
						    value: val / 100,
						    fill: {gradient: color,gradientAngle: Math.PI / 4},
						    lineCap: 'round',
						    emptyFill: '#f2f2f2',
						    thickness :thick,
						    animation: thick != "auto"?{duration: 1200,easing: "circleProgressEasing"}:false
						}).on('circle-animation-progress', function(event, progress, stepValue) {							
							if($(".nonData").length == 0){
								var target = parseInt(String(stepValue.toFixed(2)).split(".")[1]);
								$(this).find('.num').text(target);
							}
						});
						return circle;
}

function touchEvt(obj, delay, evtCancel){ // 터치이벤트
	obj.on("touchstart", function(event){
		if(!evtCancel){
			event.stopPropagation()	
		}
		$(this).addClass("touch")
	});

	var touchEnd = function(){obj.removeClass("touch");}
	obj.on("touchend", function(event){
		if(!evtCancel){
			event.stopPropagation()	
		}

		if(delay){
			setTimeout(touchEnd, 150);
		}else{
			touchEnd();
		}
	});
}

function setGradiunt(){ //차트 그라데이션 셋팅
	var mainGradient_ghost = svgDefs.append('linearGradient').attr('id', 'mainGradient_ghost').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_grade5 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade5').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_grade4 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade4').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_grade3 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade3').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_grade2 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade2').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_grade1 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade1').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
	var mainGradient_gray = svgDefs.append('linearGradient').attr('id', 'mainGradient_gray').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");

	mainGradient_ghost.append('stop')
        .attr('class', 'stop-left-ghost')
        .attr('offset', '0');

    mainGradient_ghost.append('stop')
        .attr('class', 'stop-right-ghost')
        .attr('offset', '1');

	mainGradient_grade5.append('stop')
        .attr('class', 'stop-left-grade5')
        .attr('offset', '0');

    mainGradient_grade5.append('stop')
        .attr('class', 'stop-right-grade5')
        .attr('offset', '1');

    mainGradient_grade4.append('stop')
        .attr('class', 'stop-left-grade4')
        .attr('offset', '0');

    mainGradient_grade4.append('stop')
        .attr('class', 'stop-right-grade4')
        .attr('offset', '1');

    mainGradient_grade3.append('stop')
        .attr('class', 'stop-left-grade3')
        .attr('offset', '0');

    mainGradient_grade3.append('stop')
        .attr('class', 'stop-right-grade3')
        .attr('offset', '1');

    mainGradient_grade2.append('stop')
        .attr('class', 'stop-left-grade2')
        .attr('offset', '0');

    mainGradient_grade2.append('stop')
        .attr('class', 'stop-right-grade2')
        .attr('offset', '1');

    mainGradient_grade1.append('stop')
        .attr('class', 'stop-left-grade1')
        .attr('offset', '0');

    mainGradient_grade1.append('stop')
        .attr('class', 'stop-right-grade1')
        .attr('offset', '1');

    mainGradient_gray.append('stop')
        .attr('class', 'stop-left-gray')
        .attr('offset', '0');

    mainGradient_gray.append('stop')
        .attr('class', 'stop-right-gray')
        .attr('offset', '1');	
}

function setDropshadow(){
	var pathShadow = svgDefs.append('filter').attr('id', 'dropShadow').attr("x", "0").attr("y", "0").attr("height", "150%")

	pathShadow.append("feOffset").attr("result", "offOut").attr("in", "SourceAlpha").attr("dx", "").attr("dy", "+7");
	pathShadow.append("feColorMatrix").attr("result", "matrixOut").attr("in", "offOut").attr("type","matrix").attr("values","0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0")
	pathShadow.append("feGaussianBlur").attr("result", "blurOut").attr("in", "matrixOut").attr("stdDeviation", "4")
	pathShadow.append("feBlend").attr("in", "SourceGraphic").attr("in2", "blurOut").attr("mode", "normal")
}

function setBoxshadow(){
	var tempShadow = svgDefs.append('filter').attr('id', 'grade').attr("x", "0%").attr("y", "0%").attr("height", "150%").attr("width", "100%");

		tempShadow.append("feOffset").attr("result", "offOut").attr("in", "SourceGraphic").attr("dx", "0").attr("dy", "0");
		tempShadow.append("feGaussianBlur").attr("result", "blurOut").attr("in", "offOut").attr("stdDeviation", "5")
		tempShadow.append("feBlend").attr("in", "SourceGraphic").attr("in2", "blurOut").attr("mode", "normal")
	
}

function scrollLock(flag){
	document.ontouchmove = function (e) {
		if(flag){
			e.preventDefault();		
		}else{
			return true;
		}
	}
}

function getCookie(cookieName){
	var cookie = document.cookie;
	if(cookie.split(cookieName + "=")[1] != undefined){
		return cookie.split(cookieName + "=")[1].split(";")[0]	
	}else{
		return -1;
	}
}
function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (2147483647 *24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}