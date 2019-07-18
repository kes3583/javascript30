var offsets = new Array();
var daily = dailyRecord.daily;
var today = new Array();
$(function(){
	if(location.href.indexOf("?zero") >= 0 || location.href.indexOf("?data=N") >= 0){ //기록이 없을 경우
		$(".wrap").addClass("nonData");

		$(".date").remove();
		$(".noRecord").height($(window).height() - $(".bottomNotice").outerHeight() - $("header").outerHeight() - $(".monthTab").outerHeight() - 2)

		$(".blueNoti").hide();
	}else{
		$(".map").first().append("<span>지도를 누르시면 확대됩니다.</span>")

		//setSampleMap();	
		
		if(getCookie("drivingFirst") == -1){
			setCookie("drivingFirst", 1)
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
	
	today.push(new Date().getFullYear())
	today.push(new Date().getMonth() + 1)

	setMonthTab();
	var monthTab = new Swiper('.monthTab .swiper-container',{
		slidesPerView: 'auto',
		on:{
			init: function(){
				$(this.slides[0]).addClass("bold")
			}
		}
	});

	setPage(monthTab);

	$('.monthTab .swiper-slide').click(function(){
		var objTxt = $(this).text().split("년 ");
		var index = daily.map(function(ele){
			return ele.date.split("/")[0] == objTxt[0] && parseInt(ele.date.split("/")[1]) == parseInt(objTxt[1])
		}).join().indexOf("true");
		location.href = "/publishing/drivingHabit/driving.html?data=" + (index < 0 ? "N":"T") + "&type=M&date=" + parseInt(objTxt[0]) + zeroDate(objTxt[1]);
	})

	$("header .calendarOpen, .calendar .close, .calendarWrap").click(function(){
		calendarControl()
	});

	var flag = 0;
	$(".card > dl").click(function(){
		if(flag == 1 || $(this).parent().hasClass("none")){return}
		flag = 1;
		if($(this).parent().hasClass("none")){return}
		var parent = $(this).parent();

		if(!parent.hasClass("open")){
			$(".open").children(".map").slideToggle(function(){
				$(this).parent().toggleClass("open");
			});	
		}

		parent.children(".map").slideToggle(function(){
			$(this).parent().toggleClass("open");
			setOffsetArray()
			flag = 0;
		});
	});

	var target = $(".date").eq(0);
	$(window).load(function(){
		setOffsetArray();
	});

	$("[data-sticky_column]").stick_in_parent({
      parent: "[data-sticky_parent]",
      offset_top:50
    });

	

	$(".nowDate li").each(function(index){
		if(index != 2){
			$(this).text($(".date").eq(0).children("h1").text())	
		}else{
			$(this).text($(".date").eq(1).children("h1").text())
		}
	})

	touchEvt($("h1 a"), false);

	if(location.href.indexOf("historyMonth") >= 0){
		//alert("해당 월은 " + location.href.split("historyMonth=")[1] + "월 입니다.");
	}
});

function setOffsetArray(){
	offsets = []
	$(".date").each(function(index){
		offsets.push($(this).offset().top)
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

function setMonth(taretYear, targetMonth){
	$("h1 strong").text(taretYear + "년 " + targetMonth + "월")
}

function setCalendar(year, month, obj){	
	var targetDate = new Date(year, month - 1, 1);	
	var firstDay = targetDate.getDay();
	var lastDate = new Date(year,month,0).getDate();	
	delete targetDate;

	var calTag =  "<ul>" + 
		                "<li>S</li>" + 
		                "<li>M</li>" + 
		                "<li>T</li>" + 
		                "<li>W</li>" + 
		                "<li>T</li>" + 
		                "<li>F</li>" + 
		                "<li>S</li>";

    var nowTime = new Date();

	
	for(var i = 1; i < 42; i++){
		if((i < firstDay + 1) || (i >= lastDate + firstDay + 1)){			
			calTag += "<li><a href='javascript:;'></a></li>"	
		}else if(nowTime.getMonth() == month - 1 && i == nowTime.getDate() + firstDay){
			calTag += "<li><a href='javascript:;' class='num today'>" + (i - firstDay) + "</a></li>"	
		}else if(i < lastDate + firstDay + 1){
			calTag += "<li><a href='javascript:;' class='num'>" + (i - firstDay) + "</a></li>"	
		}
	}
	delete nowTime;

	calTag += "</ul>";
	obj.html(calTag);	

	if($(".nonData").length > 0){return}
	
	var flag = 0;
	var index = daily.map(function(ele, i){
		if( ele.date.split("/")[0] == year && ele.date.split("/")[1] == month && flag == 0){
			flag++;
			return i
		}else{
			return null;
		}
	}).join("");

	if(index == ""){return;}
	while(month == daily[index].date.split("/")[1]){		
		var sample = parseInt(daily[index].date.split("/")[2]) - 1 +  firstDay
		obj.find("a").eq(sample).addClass("data")

		index++;
		if(daily[index] == undefined){return}
	}	
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

function calendarControl(){
	if($(".calendar .swiper-slide").length == 0){
		$(".calendar").show();
		var calendar = new Swiper('.calendar .swiper-container',{
						spaceBetween:15,
						prevButton : ".prev",
						nextButton : ".next",
						speed : 100,
						navigation: {
					        nextEl: 'h1 .next',
					        prevEl: 'h1 .prev'
					    },
						on:{
							slidePrevTransitionEnd: function(){
								var date = returnDateTxt(this.activeIndex)													
								setMonth(date[0], date[1])
							},
							slideNextTransitionEnd: function(){
								var date = returnDateTxt(this.activeIndex)
								setMonth(date[0], date[1])
							}
						}
					});

		setMonth(today[0], today[1]);
		
		for(var i = 0; i < 12; i++){
			var now = new Date();
			calendar.prependSlide("<div class='swiper-slide'></div>");
			
			var year = now.getFullYear();
			var month = now.getMonth() + 1 - i;
			if(month <= 0){
				year -= 1;
				month = month + 12;
			}
			
			setCalendar(year, month, $(".calendar .swiper-slide").eq(0));
		}

		setPage(calendar)

		$(".calendar a.data").click(function(){
			var objTxt = $(".calendar h1 strong.num").text().split("년 ");
			location.href = "/publishing/drivingHabit/driving.html?data=T&type=D&date=" + parseInt(objTxt[0]) + zeroDate(objTxt[1]) + zeroDate($(this).text());
		});

		$(".calendar a.today").click(function(){
			$(".calendar a").removeClass("setDay")
			//$(this).addClass("setDay")
			calendarClose();
		});
		
		$(".calendar").hide();
	}
	calendarClose();
}

function calendarClose(){
	$(".calendar").slideToggle();
	$(".calendarWrap").toggle();
	$("body").toggleClass("hidden");
	var calBool = $("body").hasClass("hidden")
	if(calBool){
		$("header").removeClass("hover").removeClass("underLine")
	}else{
		$("header").addClass("underLine")
		if($(window).scrollTop() != 0){
			$("header").addClass("hover")
		}
	}
	scrollLock(calBool);
}

function setPage(swiper){
	var base = location.href.split("date=")[1]
	if(base == undefined){return;}
	var year = parseInt(base.substring(0, 4))
	var month = parseInt(base.substring(4, 6))
	var day = parseInt(base.substring(6, 8))

	
	var targetMonth = year + "년 " + month + "월";
	var target = $(".monthTab .swiper-slide:contains('" + targetMonth + "')")

	var index = $('.monthTab .swiper-slide').index(target);

	if(swiper.passedParams.el.indexOf("monthTab") > 0){
		index -= 1;
		target.addClass("bold").siblings(".swiper-slide").removeClass("bold")
	}else{
		index = swiper.slides.length - index - 1;
		$(".calendar h1 strong.num").text(targetMonth)
	}
	
	swiper.slideTo(index)

	if(!isNaN(day)){ //type = D
		$(swiper.slides[index]).find("a:contains('" + day + "')").eq(0).addClass("setDay")
	}
}

function zeroDate(str){
	if(parseInt(str) < 10){
		return "0" + parseInt(str)
	}else{
		return parseInt(str)
	}
}