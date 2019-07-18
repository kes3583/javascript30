var today = new Array();
var monthTab = null;

$(function(){
	today.push(new Date().getFullYear())
	today.push(new Date().getMonth() + 1)

	if(location.href.indexOf("?zero") >= 0){ //기록이 없을 경우
		$(".wrap").addClass("nonData");
		
		scoreData = [];
		for (var i = 0; i < 5; i++) {
			var temp = {"date":i,"myscore":-1};
			scoreData.unshift(temp)		
		}

		$(".monthChart h1").html("월별 점수<span>주행 이력이 없습니다.</span>")
		$(".monthChart").prepend("<div class='monthChartNotice'>나의 안전운전 점수가 어떻게 <br />변화했는지 그래프로 알려드립니다.</div>")
		$(".monthChart li dd").each(function(i){
			switch(i){
				case 0:
					$(this).text("0km")
					break;
				case 1:
					$(this).text("0분")
					break;
				case 2:
					$(this).text("0회")
					break;
			}
		});
	}else{
		if(scoreData.length < 12){
			var tempArr = new Array();
			for (var i = 11; i >= 0; i--) {
				var date = returnDateTxt(i);
				date = date[0] + "/" + date[1];
				//var index = scoreData.findIndex(function(ele){return ele.date == date})
				var index = scoreData.map(function(e) { return e.date; }).indexOf(date)
				if(index >= 0){
					tempArr.unshift(scoreData[index])
				}else{
					var tempObj = {"date":date,"myscore":-1,"monthAvg": 0};
					tempArr.unshift(tempObj)
				}
			}
			scoreData = tempArr;
			delete tempArr;
		}
		
		if(getCookie("myscore_month") == -1){
			setCookie("myscore_month", 1)
			
			setTimeout(function(){
				$(".blueNoti").addClass("pop");
				setTimeout(function(){
					$(".blueNoti").removeClass("pop").addClass("hide");
				}, 3800)
			},500);

			$(".blueNoti").click(function(){
				$(".blueNoti").removeClass("pop").addClass("hide");
			});	
		}
	}

	setMonthTab();
	monthTab = new Swiper('.monthTab .swiper-container',{
		slidesPerView: 3,
		on:{
			init: function(){
				$(this.slides[0]).addClass("bold")
			}
		}
	});

	$('.monthTab .swiper-slide').click(function(){
		var index = $('.monthTab .swiper-slide').index($(this));
		slideClick($(this), index, true)
	});
	
	setGradiunt();
	setBoxshadow();
	setMonthChart();

	$(".chartWrap").scrollLeft($(".chartWrap")[0].scrollWidth)
	
	$("svg text").eq(scoreData.length - 1).hide();

	
	$(".infoBtn").click(function(){	
		$(".popWrap").addClass("open");
		$("body").addClass("hidden")
		document.ontouchmove = function (e) {
		  e.preventDefault();
		}
	});
	

	$(".popup .close").click(function(){
		$(".popWrap").addClass("close");
		setTimeout(function(){
			$(".popWrap").removeClass("close").removeClass("open");
		}, 300)
		$("body").removeClass("hidden")
		document.ontouchmove = function (e) {
		  return true;
		}
	})

	if(location.href.indexOf("?index=") > -1){
		var targetMon = location.href.split("?index=")[1]; 
		var target = $(".swiper-slide:contains(' " + targetMon + "월')");

		var index = $('.monthTab .swiper-slide').index(target);
		slideClick(target, index, true)
	}else{
		$('.monthTab .swiper-slide').first().click()
	}

	$(".monthChart > ul").click(function(){
		var index = 11 - $(".monthTab .swiper-slide").index($(".monthTab .bold"));
		var date = scoreData[index].date.split("/");
		location.href = "driving.html?type=M&date=" + date[0] + (parseInt(date[1]) < 10 ? "0":"") + date[1]
	});
	touchEvt($(".monthChart > ul"), true);
});


var scoreSvg = d3.select(".monthChart svg");
var scoreData = monthScore.reports;
var svgDefs = scoreSvg.append('defs');

function setMonthChart(){
	var width = (60 * (scoreData.length - 1)) + 45;
	if($(".nonData").length > 0){
		width = $(window).width()	
	}

	scoreSvg.style("width", width)
	var height = parseInt(scoreSvg.style("height")) - 25;

	var scaleX = d3.scaleLinear()
				   .domain([0, scoreData.length - 1])
				   

	var scaleY = d3.scaleLinear();
	

	var max = d3.max(scoreData, function(){return 100;});

	if($(".nonData").length > 0){
		scaleX.range([18, width - 42]);
	}else{
		scaleX.range([15, width - 45])
	}
	scaleY.domain([0, max])
   		  .rangeRound([0, height - 15]);

   	scoreSvg.append("g")
			.attr("class", "botLine")
			.append("line")
			.attr("x1", "0")
			.attr("x2", width)
			.attr("y1", height)
			.attr("y2", height);

   	var texts = scoreSvg.selectAll("text")
			  			   .remove()
			  			   .exit()
			  			   .data(scoreData);

		texts.enter().append("text")
			.text(function(d){
				if(d.myscore > 0){
					return d.myscore	
				}
			})
			.attr("x", function(d, i){
				var textWidth = this.getBBox().width
				
				return scaleX(i) + ((25 - textWidth) / 2);
			})
			.attr("y", function(d){
				var myscore = d.myscore;
				if(myscore < 0){
					myscore = max * 0.13
				}else if(myscore == 0){
					myscore = 1;
				}
				return	height - scaleY(myscore) - 3
			});

	var axis = scoreSvg.append("g")
						.call(d3.axisBottom(scaleX).ticks(scoreData.length).tickSizeOuter(0).tickFormat(function(d, i){
							if($(".nonData").length == 0){
								return scoreData[i].date.split("/")[1] + "월";	
							}
						}))
						.attr("width", width)
						.attr("transform", "translate(0, " + height + ")")
						.attr("class", "axis")
						.selectAll("line")
						.attr("x1", "12")
						.attr("x2", "12")
						.attr("y1", height * -1 + 15)
						.attr("y2", "0")

	if($(".nonData").length > 0){ return; }

	var bars = scoreSvg.selectAll("rect")
			  			   .remove()
			  			   .exit()
			  			   .data(scoreData);

	    bars.enter().append("rect")
			.attr("x", function(d, i){
				if(d.myscore > 0){
					return scaleX(i);	
				}else{
					return scaleX(i) + 5;
				}
			})
			.attr("y", function(d){
				return	height;
			})
			.attr("width", function(d){
				if(d.myscore > 0){
					return 25;
				}else{
					return 15;
				}
			})
			.attr("class", function(d, i){
				if(d.myscore < 0){
					return "default"
				}else if(i != (scoreData.length - 1)){
					return "zero"	
				}else{
					$(".monthChart h1").text(d.myscore)
					return getGrade(d.myscore) + " selected"
				}
			})
			.attr("filter", function(d, i){
				if(i == (scoreData.length - 1)){
					return "url(#grade)"
				}
			})
			.attr("height", 0)
			.transition()
			.duration(200)
			.delay(function (d, i) {
				return i * 50;
			})
			.attr("y", function(d){
				var myscore = d.myscore
				if(myscore < 0){
					myscore = max
				}else if(myscore == 0){
					myscore = 1;
				}

				return	height - scaleY(myscore)
			})
			.attr("height", function(d){
				var percent = max * 0.01;
				var myscore = d.myscore;

				if(myscore > percent){
					return scaleY(myscore)
				}else {//if(myscore <= percent && myscore >= 0){				
					return scaleY(max)
				}/*else if(myscore < 0){
					return scaleY(max * 0.13)
				}*/
			});

	var clickBar = scoreSvg.append("g")
							.attr("class", "clickBar")
							.selectAll("rect")
			  			   .remove()
			  			   .exit()
			  			   .data(scoreData);
		clickBar.enter().append("rect")
			.attr("x", function(d, i){
				return scaleX(i) - 16;
			})
			.attr("width", function(){
				return 57;
			})
			.attr("fill", "transparent")
			.on("click", function(d, index){
				barClick(index);
			})
			.attr("y", function(d){
				return	height - scaleY(max)
			})
			.attr("height", function(d){
				return scaleY(max)
			});
	$(".axis text").each(function(){
		var target = (45 - $(this)[0].getBBox().width) / 2;
		$(this).attr("transform", "translate(" + target + ", 2)")	
	})
}

function returnDateTxt(swipeIndex){
	var year = today[0];
	var month = today[1] - Math.abs(11 - swipeIndex);
	if(month <= 0){
		year -= 1;
		month = month + 12;
	}

	var date = [year, month];
	return date
}

function setMonthTab(){
	var html = ""
	for (var i = 11; i >= 0; i--) {
		html = "<div class='swiper-slide'>" 
		var date = returnDateTxt(i);
		html += (date[0] + "년 " + date[1] + "월")
		html += "</div>"
		$(".monthTab .swiper-wrapper").append(html);
	}
}

function slideClick(obj, index, flag){
	if($(".nonData").length > 0){ return; }

	obj.addClass("bold").siblings(".swiper-slide").removeClass("bold");
	monthTab.slideTo(index - 1);

	if(flag){
		barClick(getMatchNum(index), true)	
	}
}

function barClick(index, flag){
	if($(".nonData").length > 0){ return; }

	var target = $("svg > rect").eq(index);
		
	$(".chartWrap").animate({
		scrollLeft:target.attr("x") - ($(window).width() / 2) + 16
	}, 500);

	if(target.attr("class") == "zero"){
		var grade = getGrade(scoreData[index].myscore)
		target.attr("class", grade + " selected")
		target.attr("filter", "url(#grade)")	
	}
	
	target = target.siblings(".selected")
	target.attr("class", "zero").attr("filter", "");

	$("svg text").show().eq(index).hide();

	if(scoreData[index].myscore > 0){
		$(".monthChart h1").addClass("bold").removeClass("noData").text(scoreData[index].myscore);	
	}else{
		var txt = "주행 이력이 없습니다.";
		if(parseInt(scoreData[index].date.split("/")[0]) <= 2017 && parseInt(scoreData[index].date.split("/")[1]) <= 6){
			txt = "월별 리포트는<span>2017년 7월부터 제공됩니다.</span>"; //2017년 6월까지 주행기록이 없는 경우	
		}
		
		$(".monthChart h1").removeClass("bold").addClass("noData").html(txt)
	}
	
	if(scoreData[index].myscore > 0){
		$(".reports").show();
		$(".reports.noData").hide();
		setMonthData(index)
	}else{
		$(".reports").hide();
		$(".reports.noData").show();
		$(".monthChart dd").each(function(i){
			obj = $(this)
			switch(i){
				case 0:
					obj.text("0km")
					break;
				case 1:
					obj.text("0분")
					break;
				case 2:
					obj.text("0회")
					break;
			}
		})
	}

	if(!flag){		
		slideClick($(monthTab.slides[getMatchNum(index)]), getMatchNum(index))
	}
	
}

function getMatchNum(index){
	return Math.abs(index - (scoreData.length - 1))
}

function setMonthData(index){
	var target = scoreData[index];
	var obj = $(".month").first();

	obj.children("h1").children("span").eq(0).text(target.date.split("/")[1]);
	var titleSpan = obj.children("h1").children("span").eq(1)
	var monthHtml = titleSpan.text();
	if(target.date.split("/")[1] == String(today[1])){
		if(monthHtml.indexOf("진행중") < 0){
			titleSpan.text(monthHtml.replace("리포트", "리포트 (진행중)"))	
		}
	}else{
		titleSpan.text(monthHtml.replace("리포트 (진행중)", "리포트"))
	}
	var overSpeedDistance = target.overSpeedDistance / 1000
	obj.find(".speed").children("span").last().text("(" + overSpeedDistance.toFixed(1) + "km)")
	obj.find(".speed").children(".result").text(target.overSpeedCount + "회")
	obj.find(".acc").children(".result").text(target.accelCount + "회")
	obj.find(".stop").children(".result").text(target.reduceCount + "회")

	obj.find("dt").each(function(i){
		var value = 0;
		switch(i){
			case 0:
				value = target.overSpeedScore
				break;
			case 1:
				value = target.accelScore
				break;
			case 2:
				value = target.reduceScore
				break;
		}
		var obj = $(this).children("div");
		var grade = getGrade(value)
		obj.attr("class", grade + "_45deg");
		obj.children("span").attr("class", "bold " + grade + "_color").text(getStatusTxt(value))

		$(this).prev().prev().html(setNotice(value, i))
		var randomTip = ""
		if(value < 85){
			randomTip = randomTipStr(i);
		}else if(value >= 85 && value <= 94){
			randomTip = "안전과 경제운전 모두 훌륭하시네요."
		}else{
			randomTip = "이 시대 최고의 안전 수준입니다."
		}
		$(this).prev().html(randomTip)
	});

	$(".monthChart dd").each(function(i){
		obj = $(this)
		switch(i){
			case 0:
				obj.text(target.distance + "km")
				break;
			case 1:
				var time = parseInt(target.time / 60)
				var hour = parseInt(time / 60);
				var min = parseInt(time % 60);
				if(hour < 1){
					hour = ""
				}else{
					hour += "시간 "
				}
				if(0 < min && min < 10){
					min = "0" + min
				}
				if(min != 0){
					min += "분"	
				}else{
					min = ""
				}
				obj.text(hour + min)
				break;
			case 2:
				obj.text(target.count + "회")
				break;
		}
	});
}

function setNotice(score, flag){
	var tip = "";

	switch(flag){
		case 0:
			if (score > 0 && score <= 14)			tip = "과속이 매우 잦은 편입니다.";
			else if (score >= 15 && score <= 29) 	tip = "과속이 잦은 편입니다.";
			else if (score >= 30 && score <= 69) 	tip = "가끔 과속을 하십니다.";
			else if (score >= 70 && score <= 84) 	tip = "최고 안전 수준까지 얼마 남지 않았습니다.";
			else if (score >= 85 && score <= 94) 	tip = "규정 속도를 잘 지키시는 편입니다.";
			else if(score >= 95) 					tip = "규정 속도를 잘 지키십니다.";
			break;
		case 1:
			if (score > 0 && score <= 15)			tip = "무리한 가속으로 사고 위험이 있습니다.";
			else if (score >= 15 && score <= 29) 	tip = "자주 액셀을 급하게 밟으십니다.";
			else if (score >= 30 && score <= 69) 	tip = "가끔 액셀을 급하게 밟으십니다.";
			else if (score >= 70 && score <= 84) 	tip = "최고 안전 수준까지 얼마 남지 않았습니다.";
			else if (score >= 85 && score <= 94) 	tip = "비교적 안전하게 가속하시는 편입니다.";
			else if(score >= 95) 					tip = "부드럽고 안전하게 가속하시네요.";
			break;
		case 2:
			if (score > 0 && score <= 15)			tip = "추돌 사고의 위험이 큽니다.";
			else if (score >= 15 && score <= 29) 	tip = "자주 급브레이크를 밟으시네요.";
			else if (score >= 30 && score <= 69) 	tip = "가끔 급브레이크를 밟으시네요.";
			else if (score >= 70 && score <= 84) 	tip = "최고 안전 수준까지 얼마 남지 않았습니다.";
			else if (score >= 85 && score <= 94) 	tip = "부드럽고 안전하게 정차하시는 편입니다.";
			else if(score >= 95) 					tip = "부드럽고 안전하게 정차하십니다.";
			break;
	}

	return tip;
}

function randomTipStr(flag){
	var randSeed = [5,8,5]
	var ranNum = parseInt((Math.random() * randSeed[flag]) + 1);
	var resultStr = "";

	switch(flag){
		case 0:
			switch(ranNum) {
		        case 1: resultStr = "평소보다 조금 일찍 출발해 여유를 가져보세요."; break;
		        case 2: resultStr = "주행하고 있는 도로의 제한속도를 확인해 주세요."; break;
		        case 3: resultStr = "티맵의 제한속도 안내에 귀 기울여 주세요."; break;
		        case 4: resultStr = "여유를 가지시고 속도를 조금 줄여 주세요."; break;
		        case 5: resultStr = "경제속도를 준수하여 연비와 안전을 모두 챙겨보세요."; break;
		        default: resultStr = "평소보다 조금 일찍 출발해 여유를 가져보세요."; break;
	        }
			break;
		case 1:
			switch(ranNum) {
		        case 1: resultStr = "여유를 갖고 천천히 출발해 주세요."; break;
		        case 2: resultStr = "여유를 갖고 가속 페달을 천천히 밟아 가속해 주세요."; break;
		        case 3: resultStr = "무리한 교차로 진입 및 추월을 삼가 주세요."; break;
		        case 4: resultStr = "교차로를 통과하기 위해 무리하게 가속하지 말아 주세요."; break;
		        case 5: resultStr = "황색 신호에 무리한 교차로 진입을 삼가 주세요."; break;
		        case 6: resultStr = "무리한 끼어들기를 삼가 주세요."; break;
		        case 7: resultStr = "잦은 급가속은 연비와 안전 모두에 위협이 됩니다."; break;
		        case 8: resultStr = "신호 대기 중 휴대폰 사용은 급출발의 원인이 됩니다."; break;
		        default: resultStr = "여유를 갖고 천천히 출발해 주세요."; break;
	        }
			break;
		case 2:
			switch(ranNum) {
		        case 1: resultStr = "앞 차와의 안전거리를 유지해 주세요."; break;
		        case 2: resultStr = "돌발 상황에 대비해 미리 속도를 줄여 주세요."; break;
		        case 3: resultStr = "운전 중에는 항상 전방을 주시해 주세요."; break;
		        case 4: resultStr = "여유를 갖고 브레이크를 밟아 주세요."; break;
		        case 5: resultStr = "신호체계와 교통 흐름을 파악하며 운전해 주세요."; break;
		        default: resultStr = "앞 차와의 안전거리를 유지해 주세요."; break;
	        }
	        break;
	}

	return resultStr
}