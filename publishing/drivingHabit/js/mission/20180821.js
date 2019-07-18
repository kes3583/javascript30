var point = 65489;
$(function(){
//number counter
	var cn=300000;//현재 적립장학금
	var en=600000;//최종 적립장학금
	var pr=cn/en;
	var counter=cn*100;		
	var now;
	function numberCounter(target_frame, target_number) {
	    this.count = 0; this.diff = 0;
	    this.target_count = parseInt(target_number);
	    this.target_frame = document.getElementById(target_frame);
	    this.timer = null;
	    this.counter();
	};
	    numberCounter.prototype.counter = function() {
	        var self = this;
	        this.diff = this.target_count - this.count;
	    
	        if(this.diff > 0) {
	            self.count += Math.ceil(this.diff / 5);
	        }
	    
	        this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	    
	        if(this.count < this.target_count) {
	            this.timer = setTimeout(function() { self.counter(); }, 10);
	        } else {
	            clearTimeout(this.timer);
	        }
	    };
	circleDraw(0,0);
	if($(".second.circle").length > 0){ 
		   var first = 0;
		   
	       $(window).scroll(function(){
	           now = $(this).scrollTop();
	           var circle = $(".second.circle");
	        
	           if(first == 0 && now >= (circle.offset().top  - $(this).height() + circle.outerHeight())){
	        	   
	        	   if(first == 0){
	        		   first = 1; 
	        		   circleDraw(pr,counter);
	        	   }
	           }
	       })
	   }
	//원그래프

	function circleDraw(n,nc){
		new numberCounter("counter1", nc);	

		//원그래프
	   $('.second.circle').circleProgress({
		    value:n,
		    size:230,
		    startAngle: -Math.PI / 4 * 2,
		    lineCap:'round',
		    thickness:6,
		    animation:{duration: 1200,easing: "circleProgressEasing"},
		    fill: {
		    	color: "#41c2ff" 
		      }
		  });
	};	
	
	$('.second.circle').click(function(){
		 circleDraw(pr,counter);
	   });
  //후원안내 팝업
	  $('.popInfo').click(function(){
		  $('.recomPop').show();
		  $('.bgPop').show();
	  })
	    $('.popClose').click(function(){
		  $('.recomPop').hide();
		  $('.bgPop').hide();
	  })
	   $('.bgPop').click(function(){
		    $('.recomPop').hide();
		  $('.bgPop').hide();
	   });
	  
	  
		var swiper = new Swiper(".swiperWrap .swiper-container",{
			
			slidesPerView: 'auto',
	        on: {
	            init:function(){
	                $(".swiperWrap .left").hide();
	            }
	        }
	    });
		  
		var myPosition= new Swiper('.myPosition .swiper-container',{
				loop: true,
				allowTouchMove:false,
				speed:800,
				autoplay: {
			        delay: 1500,
			        disableOnInteraction: false,
			    }
			});	
			
	
    if($(".record").length > 0){    
        var gageClear = 0;
        var percent = point >= 100000 ? 100 : parseInt(point / 1000);
        
        $(window).scroll(function(){
            now = $(this).scrollTop();
            var record = $(".record");
            if(gageClear == 0 && now >= (record.offset().top  - $(this).height() + record.outerHeight())){
                $(".gage").animate({
                    width: percent + "%"
                }, 800, function(){
                    if(gageClear == 0){
                        gageClear = 1; 
                        $(".distanceBox").children(".bold").text(parseInt(point / 1000)).parent().css("left", function(){
                            return  "calc(" + percent + "% - " + (($(".distanceBox").outerWidth() / 2) + 5) + "px)" 
                        }).addClass("pop")
                        $(".gage").stop(true, true).width(percent + "%")
                    }
                });
            }
        })
    }

    $(".shareBtn").click(function(){
        //$(".shareBtns").addClass("show");
        location.href = "http://minasis01.dothome.co.kr/comm/missions/mission_20180514/index.html"
    })

    $(".footer a").click(function(){
        // $(this).toggleClass("open").next().stop().slideToggle()
        $(this).toggleClass("open").next().toggle()
        $("body, html").animate({
            scrollTop:$("body").height()
        }, 300)
    });

    setTimeout(function(){
        $(".blueNoti").addClass("pop");
        setTimeout(function(){
            if(!$(".blueNoti").hasClass("hide")){
                $(".blueNoti").addClass("hide");
            }
        }, 3000)
    },2500);

    $(".blueNoti").click(function(){
        $(".blueNoti").addClass("hide");
    })
})