//var score = 54;
//var distance = 700;
var scores = {
    "scores":   [{
        "date": "2017/12",
        "score": "29",
        "distance": "110",
        "status":"now"
    }, {
        "date": "2018/1",
        "score": "69",
        "distance": "600",
        "status":"fail"
    }, {
        "date": "2018/2",
        "score": "79",
        "distance": "800",
        "status":"success"
    }]
}

$(function(){

	setScores(scores.scores.length - 1)

	var myswiper = new Swiper('.swiper-container',{
		allowTouchMove:false,
		speed:300,
		navigation: {
	        nextEl: '.next',
	        prevEl: '.prev',
	    },
		on:{
			init:function(){
				var index = this.slides.length - 1
				this.slideTo(index, 0, false);
			},
			slideChangeTransitionStart:function(){
				var index = this.activeIndex;
				setScores(index);
				$(".circle .car").css({"transform": "translate3d(" + ($("body").width() / 2 + $(".circle .car").width()) + "px, 0px, 0px)"})
				setTimeout(function(){
					$(".circle .car").css({"transform": "translate3d(" + ((($("body").width() / 2) * -1) - ($(".circle .car").width() / 2) - 30) + "px, 0px, 0px)",
											"transition-duration" : "0ms"});
					setTimeout(function(){
						$(".circle .car").css({"transform": "translate3d(0px, 0px, 0px)",
											"transition-timing-function" : "ease-out"}).removeAttr("style");
					}, 50)
				},300)
			}
		}
	});
	
	$(".card").animate({
		bottom:"33px"
	},"linear", function(){
		$(".card").animate({
			bottom:"22px"
		},200,"linear")
		$(".card").prev().fadeIn().css("display", "block")
	});

	$(window).scroll(function(){
		var now = $(window).scrollTop();

		if(now > 0){
    		$("header").addClass("hover")
    	}else{
    		$("header").removeClass("hover")
    	}
	});
});

function setScores(index){	
	var target= scores.scores[index];
	var score = target.score;
	$(".indicator .medium").text(target.date.split("/")[0] + "년 " + target.date.split("/")[1] + "월");

	var circle = $("canvas");
	var barColor = "#F44336";
	var bgColor = "#e6e6e6";
	
	
	if(score == 0){
		score = 1;
	}

	barColor = getSolidColor(score);

	circle.parent().siblings("ul").find(".num").text(target.distance)
	$(".score .status").text(statusTxt(target.status)).removeClass("fail").addClass(target.status)	
	circle.attr("width", circle.parent().css("width")).attr("height", circle.parent().css("height"))
	circle.gauge(score,{color: barColor, bgcolor: bgColor, lineWidth : 6, noCounting : false});	
}

function statusTxt(flag){
	switch(flag){
		case "now":
			return "도전중";
		case "fail":
			return "도전실패 - 주유권 증정 불가";
		case "success":
			return "도전성공 - 주유권 1만원 증정";
	}
}