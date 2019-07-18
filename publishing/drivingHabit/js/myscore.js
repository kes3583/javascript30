var score = 57;
var joinDay = "2017/2/10"
var driveDistance = 499; // 주행거리가 500km 이하인 경우를 위한 임시 변수

$(function(){
	setDropshadow();

	if(location.href.indexOf("?zero") >= 0){ //기록이 없을 경우
		$(".wrap").addClass("nonData");
		score = 0;
		monthlyData.forEach(function(obj){
			obj.myscore = 100;
		});

		$(".totalScore .circleGragh b").text("누적 점수")
		$(".totalScore .myPosition").text("상위 %")
		$(".totalScore .distanceStandard").html("주행 이력이 없습니다. <br /><h2 class='bg'><span class='bold'>오늘 주행한 이력은 내일 반영됩니다.</span></h2>")

		$(".mainChart").remove();
		$(".reports").show().addClass("noData");
		$(".reports h1 .infoBtn").hide();
		$(".reports dt span").text("단계").removeClass("bold").parent().attr("class", "grade0_45deg")
		var resultTxt = ["횟수/거리", "횟수", "횟수"]
		var infoTxt = ["주행한 도로의 제한속도를 15km/h 이상 초과하는 경우", "속도가 1초 이내 10km/h 이상 증가하는 경우", "속도가 1초 이내 10km/h 이상 감소하는 경우"]
		$(".reports dl").each(function(i){
			$(this).children("dd").eq(0).children(".result").text(resultTxt[i]).next().remove();
			$(this).children("dd").eq(1).hide();
			$(this).children("dd").eq(2).html(infoTxt[i])
		})
		$(".distance li span").each(function(i){
			if(i == 0){
				$(this).text("0km")
			}else{
				$(this).text("0분")
			}
		});

		setCircle($(".totalScore .circleGragh"), score, getStatusColor(score), 5);
	}else{
		if(monthlyData.length == 1){
			var date = monthlyData[0].date.split("/")
			if(date[1] == "1"){
				date[1] = 12;
				date[0]--;
			}else{
				date[1] = parseInt(date[1]) - 1
			}
			var tempObj = {"date":date[0] + "/" + date[1],"myscore":monthlyData[0].myscore,"monthAvg": monthlyData[0].monthAvg};
			monthlyData.unshift(tempObj);
		}
		var circle = setCircle($(".totalScore .circleGragh"), score, getStatusColor(score), 5);
		circle.on("circle-animation-end", function(){
			$(".totalScore .upDown").fadeIn()
		});

		drawChart();

		if(driveDistance >= 500){
			if($(".myPosition .swiper-slide").length > 1){
				var myPosition = new Swiper('.myPosition .swiper-container',{
					loop: true,
					allowTouchMove:false,
					speed:800,
					autoplay: {
				        delay: 1500,
				        disableOnInteraction: false,
				    }
				});
			}
		}else{
			$(".myPosition .swiper-slide").last().remove();
			$(".myPosition .swiper-slide").first().text("등수 없음");
			$(".noRank").css("display", "inline-block");
		}

		if(getCookie("myscore") == -1){
			setCookie("myscore", 1)
			
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

	$(".infoBtn").click(function(){
		var index = $(".infoBtn").index($(this))
		$(".popWrap").eq(index).addClass("open")
		$("body").addClass("hidden")
		document.ontouchmove = function (e) {
		  e.preventDefault();
		}
	});
	
	$(".popup .close").click(function(){
		$(".popWrap").addClass("close");
		setTimeout(function(){
			$(".popWrap").removeClass("close").removeClass("open");
		}, 300);
		
		$("body").removeClass("hidden")
		document.ontouchmove = function (e) {
		  return true;
		}
	})
});


var monthlyData = myScore.reports;
var scoreSvg = d3.select(".mainChart");
var svgDefs = scoreSvg.append('defs');			  
var realLen = monthlyData.length

function drawChart(){
	var reportsLen = monthlyData.length;
	var obj = monthlyData[reportsLen - 1];

	var lastX = 0;
	var lastY = 0;
	var avgY = 0;
	var dTxt = "";

	var width = $(".mainChart").width();
	var height = parseInt(scoreSvg.style("height")) - 36;

	var scaleX = d3.scaleLinear()
				   .domain([0, monthlyData.length - 1])
				   .range([12, width - 100]);

	var scaleY = d3.scaleLinear()
					.domain([0, 100])
	   		  		.rangeRound([3, height - 75]);

	avgY = height - scaleY(obj.monthAvg);
	lastX = scaleX(reportsLen - 1) + 3;
	lastY = height - scaleY(obj.myscore);

	var avgTxt = scoreSvg.append("text")
						 .attr("x", lastX + 10)
						 .attr("y", avgY + 7)
						 .attr("class", "allTxt")
						 .text("티맵 평균 " + obj.monthAvg);

	scoreSvg.append("line")
			.attr("x1", function(){
				return lastX;
			})
			.attr("x2", function(){
				return lastX;
			})
			.attr("y1", function(){
				return lastY;
			})
			.attr("y2", function(){
				return height + 1;
			})
			.attr("class", "verticalPath")
			.attr("stroke-dasharray", "3,2");

	if(realLen > 1){
		var avgline = d3.line()
					.x(function(d, i){
						return scaleX(i);
					})
					.y(function(d){
						return	height - scaleY(d.monthAvg)
					});

		scoreSvg.selectAll(".avgline")
					.remove()
					.exit();
		scoreSvg.append("path")
			.attr("d", avgline(monthlyData))
			.attr("class", "avgline");	
	}

	scoreSvg.append("circle")
			.attr("cx", lastX)
			.attr("cy", avgY)
			.attr("r", 3)
			.attr("fill", "#000")
			.attr("fill-opacity","0.4");

	scoreSvg.append("g")
			.call(d3.axisBottom(scaleX).ticks(monthlyData.length - 1).tickSizeOuter(0).tickFormat(function(d, i){
				if(i == 0){
					if($(".nonData").length == 0){
						var dayArray = joinDay.split("/")
						return dayArray[0] + "." + dayArray[1] + "." + dayArray[2] + " 가입"	
					}else{
						return "가입일"
					}
				}else if(i == reportsLen - 1){
					return "TODAY"
				}
			}))
			.attr("transform", function(d, i){
				return "translate(16, " + height + ")"	
			})
			.attr("class", "axis");	

	scoreSvg.append("path")
			.attr("d", function(){
				var yPosition = height + 0.5;
				dTxt = "M" + 0 + ", " + yPosition + "L" + width + ", " + yPosition;
				return dTxt;
			})
			.attr("stroke", "#000")
			.attr("class", "subPath");

	$(".axis text").first().closest(".tick").attr("transform", "translate(35, 0)"); 
	$(".axis text").last().attr("class", "bold").closest(".tick").attr("transform", "translate(" + ((lastX - (($(".axis .tick").last()[0].getBBox().width) / 2)) + 5) +", 0)");

	if($(".nonData").length == 1){
		$(".axis text").first().closest(".tick").attr("transform", "translate(15, 0)"); 
		$(".chart").prepend("<div class='chartNotice'>나의 안전운전 점수가 어떻게 변화했는지<br />그래프로 알려드립니다.</div>")
		return;
	}

	var setColor = "";
	if(obj.myscore < 15){
		setColor = "#f36966"
	}else if(obj.myscore < 30){
		setColor = "#f27f55"
	}else if(obj.myscore < 70){
		setColor = "#ebb636"
	}else if(obj.myscore < 85){
		setColor = "#7abf19"
	}else{
		setColor = "#32c284"
	}
	
	var avgGroup = 	scoreSvg.append("g")
							.attr("class", "avg")

	avgGroup.append("rect")
			.attr("width", function(){
				if(obj.myscore != 100){
					return 108;
				}else{
					return 118;
				}
			})
			.attr("height", 33)
			.attr("rx", 18)
			.attr("ry", 18)
			.attr("y", 14)
			.attr("x", function(){
				return lastX - (parseInt($(this).attr("width")) / 2)
			});

	var myTxt = avgGroup.append("text")
							.attr("class", "myTxt")
							.attr("textLength", function(){
								return parseInt($(this.previousSibling).attr("width")) - 38
							})
							.text("나의 점수 " + obj.myscore)
							.attr("y", function(){
								var prevObj = $(this.previousSibling);
								var txtHeight = parseInt(this.getBBox().height)
								return parseInt(prevObj.attr("y")) + txtHeight + 4
							})
							.attr("x", function(){
								return lastX - (parseInt(this.getBBox().width) / 2)/* - 16)*/
							});

	scoreSvg.append("line")
			.attr("x1", function(){
				return lastX;
			})
			.attr("x2", function(){
				return lastX;
			})
			.attr("y1", function(){
				return 47;
			})
			.attr("y2", function(){
				return lastY;
			})
			.attr("class", "verticalPathMyScore");

	var line = d3.line()
				.x(function(d, i){
					return scaleX(i);
				})
				.y(function(d, i){
					if(i == reportsLen - 1){
						$(".mainChart").attr("class", $(".mainChart").attr("class") + " " + getGrade(d.myscore))
					}
					return	height - scaleY(d.myscore)
				});
				
	scoreSvg.selectAll(".myline")
				.remove()
				.exit();

	var myscore = scoreSvg.append("path")
							.attr("d", line(monthlyData))
							.attr("class", "myline")


	if(realLen == 1){
		myscore.attr("class", "myline dash")
	}else{
		scoreSvg.selectAll(".fakeMyline")
				.remove()
				.exit();

		scoreSvg.append("path")
				.attr("d", line(monthlyData))
				.attr("class", "fakeMyline")
				.attr("stroke", "#fff")
				.attr("stroke-width", 4)
				.attr("filter", "url(#dropShadow)");
	}

	scoreSvg.append("circle")
			.attr("cx", lastX)
			.attr("cy", lastY)
			.attr("r", 17)
			.attr("fill", "#fff")
			.attr("fill-opacity","0.2")

	scoreSvg.append("circle")
			.attr("cx", lastX)
			.attr("cy", lastY)
			.attr("r", 8)
			.attr("fill", "#fff");

	scoreSvg.append("circle")
			.attr("cx", lastX)
			.attr("cy", lastY)
			.attr("r", 6)
			.attr("fill", setColor)	
}
function todayReset(obj){
	var matrix = obj.css('transform').replace(/[^0-9\-.,]/g, '').split(',')

  var x = matrix[12] || matrix[4]
  console.log(x)
}