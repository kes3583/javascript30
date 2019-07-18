var score = 54;
var distance = 900;

$(function(){	
	testCode(); // 테스트코드 삭제요망


	var barColor = "#F44336";
	var bgColor = "#e6e6e6";

	var notiWord = "갱신";
	var calcDistance = "다음 " + notiWord + "까지 남은 거리<br><span>(점수는 500km 마다" + notiWord + ")</span><span class='remain'>" + remainDistance + "km</span>";
	
	if(distance < 500){
		$(".circle").addClass("zero");
		barColor = bgColor;
		score = 1;
		$(".scoreComment").html("안전운전 점수 산정까지<br>" + remainDistance + "km 남았습니다.")
		notiWord = "산출"
	}else if(score < 61){
		$(".scoreComment").html("힘내세요! 안전운전할인특약<br>대상까지 " + (61 - score) + "점 남았습니다.")
		barColor = getSolidColor(score);
	}else{
		$(".scoreComment").html("축하드려요! 할인 기준을 충족하여<br>자동차보험 할인 대상입니다.")
		barColor = getSolidColor(score);
	}
	
	$(".distanceComment").html(calcDistance);
	if(lastDay.setMonth(lastDay.getMonth()+6) < new Date().getTime()){
		$(".scoreComment").html("최근 6개월 내 생성된 점수가 없어<br><span class='light'>자동차보험 할인 대상이 아닙니다.</span>")
	}

	if(score == 0){
		score = 1;
		barColor = bgColor;
	}
	$(".circle canvas").attr("width", $(".circle").css("width")).attr("height", $(".circle").css("height"))
	$(".circle canvas").gauge(score,{color: barColor, bgcolor: bgColor, lineWidth : 6});

	var scrollTarget = $(".score").offset().top - $("header").height()
	$(window).scroll(function(){
		var now = $(window).scrollTop();
		if(now >= scrollTarget && !$(".fixedBtn").hasClass("up")){
			$(".fixedBtn").stop().animate({
				bottom:0
			}, {duration: 300,
			    specialEasing: {
			      height: "easeInQuart"
			    }}).addClass("up")
		}else if(now < scrollTarget&& $(".fixedBtn").hasClass("up")){
			$(".fixedBtn").stop().animate({
				bottom: "-56px"
			}, {duration: 300,
			    specialEasing: {
			      height: "easeInQuart"
			    }}).removeClass("up")
		}
		if(now > 0){
    		$("header").addClass("hover")
    	}else{
    		$("header").removeClass("hover")
    	}
	});

	$(".score a").click(function(){
		$(this).toggleClass("open");
		$(".scorePopup").toggle();
	});

	$(".scorePopup").click(function(){
		$(this).hide();
		$(".score a").removeClass("open")
	});

		
	var myswiper = new Swiper('.swiper-container',{
		loop: true,
		allowTouchMove:false,
		speed:800,
		autoplay: {
	        delay: 3500,
	        disableOnInteraction: false,
	      },
	      on:{
      		slideNextTransitionStart:function(){
      			var obj = $(this.slides[this.activeIndex]).prev()
		      	obj.animate({
		      		opacity:0.1
		      	}, 400, function(){
		      		obj.css("opacity", 1)
		      	})
		      }
	      }
	});
	
	touchEvt($(".fixedBtn"))
	touchEvt($(".top a"))
	popClose();
});

function popClose(){
	$("body").on("touchend", function(event){
		event.stopPropagation()
		if(!($(event.target).parent().hasClass("score") && $(event.target)[0].tagName == "A")){
			if($(".kb .score a").hasClass("open")){
				$(".kb .score a").removeClass("open");
				$(".scorePopup").hide()	
			}
		}
		
	});
}

function testCode(){
	if(location.href.indexOf("?") != -1){
		var type = parseInt(location.href.split("type=")[1]);

		switch(type){
			case 1:
				score = 100;
				distance = 100;
				break;
			case 2:
				score = 14;
				distance = 550;
				break;
			case 3:
				score = 29;
				distance = 600;
				break;
			case 4:
				score = 69;
				distance = 700;
				break;
			case 5:
				score = 84;
				distance = 800;
				break;
			case 6:
				score = 99;
				distance = 900;
				break;
		}
	}
}