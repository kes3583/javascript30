var score = 89;
var driveDistance = 499; // 주행거리가 500km 이하인 경우를 위한 임시 변수
var errorCode = 0;

$(window).load(function() {	
	if(errorCode == "230401" && driveDistance == 0){
		$(".wrap").addClass("nonData");
		
		score = -1;
		scoreData = [];
		var today = new Date();		
		for (var i = 0; i < 5; i++) {
			var temp = {"date":today.getFullYear() + "/" + ((today.getMonth() + 1) - i),"score":100};
			scoreData.unshift(temp)		
		}
		
		var banner = getCookie("upDown");
		if(banner == '' || banner == null){
			setCookie("upDown", 1, 1);
			$("#prev_score_noti").text("주행 이력이 없습니다.")
			$("#prev_score_noti").addClass("upDown blueNoti down");
		}else{
			$("#prev_score_noti").remove();
		}
		
		$(".circleGragh .num").text("누적점수");
		$(".totalScore li dt[class^='grade']").attr("class", "grade0_solid")
		$(".totalScore li dt span[class^='grade']").attr("class", "grade0_color").text("단계");

		$(".mapInfo .score").text("점수").removeClass("bold")
		$(".mapInfo dd").text("거리 | 소요시간")
		
		$(".mapWrap").append("<img src='/static/drivingHabit/images/index/noRecord.gif' alt='' class='sample'>")
		$(".mapWrap iframe").remove();
	}else{
//		if(scoreData.length < 5){
//			var tempArr = new Array();
//			for (var i = 0; i < 5; i++) {
//				var now = new Date();
//				now = [now.getFullYear(), (now.getMonth() + 1) - i]
//				if(now[1] <= 0){
//					now[0] -= 1;
//					now[1] += 12;
//				}
//				var date = now[0] + "/" + now[1];
//				var index = scoreData.map(function(e) { return e.date; }).indexOf(date)
//				
//				if(index >= 0){
//					tempArr.unshift(scoreData[index])
//				}else{
//					var tempObj = {"date":date,"score":0};
//					tempArr.unshift(tempObj)
//				}
//			}
//			scoreData = tempArr;
//			delete tempArr;
//		}
		
		if(driveDistance >= 500){
			var myPosition = new Swiper('.myPosition .swiper-container',{
				loop: true,
				allowTouchMove:false,
				speed:800,
				autoplay: {
			        delay: 1500,
			        disableOnInteraction: false,
			    }
			});	
		}else{
			$(".myPosition .swiper-slide").last().remove();
			$(".myPosition .swiper-slide").first().text("등수 없음");
			if(getCookie("noRank") == '' || getCookie("noRank") == null){
				$(".myPosition").css("position", "relative").append("<a href='javascript:;' onclick='$(this).hide()' class='toast'>500km이상 주행 시, 등수 확인 가능</a>")	
				setCookie("noRank", 1,365)
			}
		}
	}	

	setRecentRecord("score");

	//setGradiunt();

	var insuranceArray = new Array();
	var slideCount = $(".insurance .swiper-slide").length;
	for(var i = 0; i < slideCount; i++){
		insuranceArray[i] = $(".insurance .swiper-slide").eq(i);	
	}
	shuffleArray(insuranceArray);
	$(".insurance .swiper-wrapper").html("")
	for(var i = 0; i < slideCount; i++){		
		$(".insurance .swiper-wrapper").append(insuranceArray[i][0].outerHTML)
	}

	var swiper = new Swiper('.insurance .swiper-container',{
		slidesPerView: 'auto',
		on: {
		    init: function () {
		    	$(this.slides).each(function(){
		    		var obj = $(this)
		    		var height = obj.outerWidth() * 0.69
		    		obj.css("height", height);
		    		obj.closest(".swiperWrap").height(height).children(".swiper-container").height(height)
		    	});
		    }
		}
	});

	if(slideCount < 3){
		$(".insurance article .swiper-wrapper").css("justify-content", "center")
	}

	touchEvt($(".insurance .swiper-slide"), false, true)
	touchEvt($(".record"), false, true)
	touchEvt($(".insurance .swiper-slide"), false, true)
	touchEvt($(".mission"), false, true)
	touchEvt($("h1 .infoBtn"), false, true)
	touchEvt($(".emergency"), false, true)

	$(".totalScore > a").on("touchstart", function(event){
		event.stopPropagation()
		$(this).closest(".card").addClass("touch")
	});

	$(".totalScore > a").on("touchend", function(event){
		event.stopPropagation()	
		$(this).closest(".card").removeClass("touch");
	});

	$(".mainChartWrap h1").on("touchstart", function(event){
		event.stopPropagation()
		$(this).closest(".card").addClass("touch")
	});

	$(".mainChartWrap h1").on("touchend", function(event){
		event.stopPropagation()	
		$(this).closest(".card").removeClass("touch");
	});

	$(".card .infoBtn").click(function(){
		var index = $(".card .infoBtn").index($(this))
		$(".popWrap").eq(index).addClass("open")
		$("body").addClass("hidden")
		document.ontouchmove = function (e) {
		  e.preventDefault();
		}
	})
	
	$(".insurance > a").click(function(){
		$(".popWrap").eq(2).addClass("open")
		$("body").addClass("hidden")
		document.ontouchmove = function (e) {
		  e.preventDefault();
		}
	})
	
	$(".popup .close").click(function(){
		$(".popWrap").addClass("close");
		setTimeout(function(){
			$(".popWrap").removeClass("close").removeClass("open");
		}, 300)
		$("body").removeClass("hidden")
		document.ontouchmove = function (e) {
		  return true;
		}
	});

	if($(".insuranceBanner .swiper-slide").length > 1){
		var bannerSwiper = new Swiper('.insuranceBanner .swiper-container',{
			loop:true,
			pagination: {
				el:'.insuranceBanner .swiper-pagination'
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			on:{
				init:function(){
					var obj = this
					$(".insuranceBanner").addClass("black")
//					if($(obj.slides[obj.activeIndex]).hasClass("knia")){
//						$(".insuranceBanner").addClass("black")
//					}else{
//						$(".insuranceBanner").removeClass("black")
//					}
				},
				slideChangeTransitionStart: function(){
//					var obj = this
//					if($(obj.slides[obj.activeIndex]).hasClass("knia")){
//						$(".insuranceBanner").addClass("black")
//					}else{
//						$(".insuranceBanner").removeClass("black")
//					}
				}
			},
		    speed:500
		});
	}

	
	//goPageId();
	
//	if(tripTraceDataList.length > 0){
//		if($("#iframe_container").contents().find("#map_div").length < 1){
//			$('iframe').attr('src', '/comm/dh/mainmap.html');
//		}
//	}else{
//		$(".mapWrap iframe").remove();
//	}
	
	$(".emergency .link").click(function(){
		$(".emerCall").addClass("pop")
		$("body").addClass("hidden")
		document.ontouchmove = function (e) {
		  e.preventDefault();
		}
	});
	
	$(".comList li a").on("touchstart", function(){
		event.stopPropagation()
		$(this).parent().addClass("selected")
	}).on("touchend", function(){
		event.stopPropagation()
		$(this).parent().removeClass("selected")
	});
	
	$(document).on("click", ".emerCall.pop", function(){
		setTimeout(function(){$(".emerCall.pop").removeClass("pop")}, 300)
	})
});

//var scoreSvg = d3.select(".mainChart");
//var scoreData = recentMonthData != null?recentMonthData:new Array();
//var svgDefs = scoreSvg.append('defs');

function setRecentRecord(type){return;
	var width = parseInt(scoreSvg.style("width"));
	var height = parseInt(scoreSvg.style("height")) - 20;

	var scaleX = d3.scaleBand()
				   .domain(scoreData.map(function(d, i){
				   		var split = "";
				   		var time = "";
				   		var miliTime = "";
				   		if(d.date.indexOf("/") < 0){
				   			var lastIndex = scoreData.findIndex(function(ele){return ele.score != -1})
				   			var lastDateSplit = scoreData[lastIndex].date.split("/");
				   			time = new Date(lastDateSplit[0], lastDateSplit[1]);
				   			miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
				   		}else{
				   			split = d.date.split("/");
				   			time = new Date(split[0], parseInt(split[1]) - 1);			   			
				   			miliTime = time.getTime();
				   		}

						delete time;
				   		return miliTime;
				   	}))
				   .rangeRound([5, width - 5])
				   .paddingInner(0.68)
				   .paddingOuter(0.15);

	var max = d3.max(scoreData, function(){return 100;});

   	var scaleY = d3.scaleLinear()
   					.domain([0, max])
   		  			.rangeRound([0, height - 25]);

	

  	var bars = scoreSvg.selectAll("rect")
		  			   .remove()
		  			   .exit()
		  			   .data(scoreData);

	bars.enter().append("rect")
		.attr("x", function(d, i){		
			var split = "";
	   		var time = "";
	   		var miliTime = "";
	   		if(d.date.indexOf("/") < 0){
	   			var lastIndex = scoreData.findIndex(function(ele){return ele.score != -1})
	   			var lastDateSplit = scoreData[lastIndex].date.split("/");	   			
	   			time = new Date(lastDateSplit[0], lastDateSplit[1]);		   			
	   			miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
	   		}else{
	   			split = d.date.split("/");
	   			time = new Date(split[0], parseInt(split[1]) - 1);
	   			miliTime = time.getTime();
	   		}

			return scaleX(miliTime) + ((scaleX.bandwidth() - 12) / 2);
		})
		.attr("y", function(d){			
			return	height;
		})
		.attr("width", function(){
			return 12;
		})
		.attr("class", function(d, i){
			if(!$(".wrap").hasClass("nonData") && d.score != 0){
				var tempType = switchType(type, d);
				return getGrade(tempType)	
			}else{
				return "default"
			}
			
		})
		.attr("y", function(d){
			var tempType = switchType(type, d);

			if(tempType <= 0){
				tempType = max
			}

			return	height - scaleY(tempType)
		})
		.attr("height", function(d){
			var tempType = switchType(type, d);
			var percent = max * 0.01;

			if(tempType > percent){
				return scaleY(tempType)
			}else if(tempType <= 0){
				return scaleY(max)
			}
		});


			var clickBar = scoreSvg.append("g")
								.attr("class", "clickBar")
								.selectAll("rect")
				  			   .remove()
				  			   .exit()
				  			   .data(scoreData);
			clickBar.enter().append("rect")
				.attr("x", function(d, i){		
					var split = "";
			   		var time = "";
			   		var miliTime = "";
			   		if(d.date.indexOf("/") < 0){
			   			var lastIndex = scoreData.findIndex(function(ele){return ele.score != -1})
			   			var lastDateSplit = scoreData[lastIndex].date.split("/");
			   			time = new Date(lastDateSplit[0], lastDateSplit[1]);
			   			miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
			   		}else{
			   			split = d.date.split("/");
			   			time = new Date(split[0], parseInt(split[1]) - 1);
			   			miliTime = time.getTime();
			   		}

			   		if(i == 4){
			   			$(".mainChartWrap h1").click(function(){
			   				var month = d.date.split("/")[1];
			   				ga('send', 'event', 'dh_home', 'month_scroe','month_scroe');
			   				setTimeout(function(){
			   					location.href = "/app/dh/main/monthlyscore.do?index=" + month;
			   				}, 250);
			   			})
			   		}
			   		return scaleX(miliTime) + ((scaleX.bandwidth() - 12) / 2) - 18;
				})
				.attr("width", function(){
					return 48;
				})
				.attr("fill", "transparent")
				.on("click", function(d, index){
					var month = d.date.split("/")[1];
					ga('send', 'event', 'dh_home', 'month_scroe','month_scroe');
					setTimeout(function(){
						location.href = "/app/dh/main/monthlyscore.do?index=" + month
					}, 250);
				})
				.on("touchstart", function(d, i){
					event.stopPropagation()
					$(".mainChart > rect").eq(i).attr("class", $(".mainChart > rect").eq(i).attr("class") + " touch")
				})
				.on("touchend", function(d,i){
					event.stopPropagation()
					$(".mainChart > rect").eq(i).attr("class", $(".mainChart > rect").eq(i).attr("class").replace(" touch", ""))
				})
				.attr("y", function(d){
					return	height - scaleY(max)
				})
				.attr("height", function(d){
					return scaleY(max)
				});
		
		if(!$(".wrap").hasClass("nonData")){		
			var texts = scoreSvg.selectAll("text")
							.remove()
							.exit()
							.data(scoreData)
					
			texts.enter().append("text")
					.text(function(d){
						var tempType = switchType(type, d);

						if(tempType > 0){
							return	tempType
						}else{
							return ""
						}
					})
					.attr("class", function(d,i){
						if($(".recentPatturn .rightTitle").text() != "일별 점수" || 
							$(".recentPatturn").hasClass("firstUser")) {return "num";}
						return "num " + getGrade(d.score)
					})
					.attr("x", function(d, i){
						if(d.date.indexOf("/") < 0){return "";}
						var position = parseInt($("rect").eq(i).attr("x"));
						var textWidth = 12 - this.getBBox().width;
						
						position += (textWidth / 2);
						return position>0?position:0;
					})
					.attr("y", function(d){
						return height - scaleY(switchType(type, d)) - 5
					})
		}
		var prevMonth = 0;
		scoreSvg.append("g")
				.call(d3.axisBottom(scaleX).tickFormat(function(d, i){				
					//if(scoreData[i].score < 0){return "8월"}
					var time = new Date(d);				
					var month = time.getMonth();
					delete time;
					
					if(i == 0 || prevMonth != month){
						prevMonth = month;
						month += 1
					}else{
						month = ""
					}
					
					return month + "월";
				}).tickSizeOuter(0))
				.attr("transform", "translate(0, " + (height) + ")")
				.attr("class", "axis");

		$(".axis text").attr("transform", "translate(0, -1)")
}

function switchType(type, obj){
	switch(type){
		case "score":
			return obj.score;
			break;
		case "default":
			return obj.default;
			break;
	}
}

function shuffleArray(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
}

function goPageId(){
	var objid = '';
	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	
	if(pageid == '' || pageid == null || pageid == 'null' || pageid == 'undefined' || pageid == undefined)	return;	
	
	else if(pageid == 'drivinghabit_score')		objid = '#drivinghabit_score';
	else if(pageid == 'drivinghabit_report')	objid = '#drivinghabit_report';
	else if(pageid == 'drivinghistory')			objid = '#drivinghistory';
	else if(pageid == 'drivinghabit_info')		objid = '#drivinghabit_info';
	else if(pageid == 'drivinghabit_faq')		objid = '#drivinghabit_faq';
	else if(pageid == 'drivinghabit_dbinsure')	objid = '#drivinghabit_dbinsure';
	else if(pageid == 'drivinghabit_kbinsure')	objid = '#drivinghabit_kbinsure';
	else if(pageid == 'ssinsure')	objid = '#drivinghabit_ssinsure';
	else if(pageid == 'drivinghabit_mission')	objid = '#drivinghabit_mission';
	else if(pageid == 'UBI_TM_HNJ')	objid = '#UBI_TM_HNJ';
	else if(pageid == 'insure')	objid = '#drivinghabit_insure';
	else	return;
	
//	if(iOS){
//		setTimeout(function() {
//			$(objid).click();
//		}, 1500);	
//	}else{
//		$(objid).click();
//	}
	
	if(pageid == 'insure'){
		var rh=$(".insurance").offset().top
    	$( 'html, body' ).animate( { scrollTop :rh-60}, 400 );
	}else{
		setTimeout(function() {
			$(objid).click();
		}, 1500);
	}	
	
	return;
}
