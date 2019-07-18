
$(function(){
	//이미지 프리로딩
	function preloading (imageArray)
	{
		let n = imageArray.length;
		for (let i = 0; i < n; i++) {
			let img = new Image();
			img.src = imageArray[i];
		}
	}

	preloading([ './images/mission/20181015/images/main_ani_01.gif',
		'./images/mission/20181015/main_ani_02.gif',
		'./images/mission/20181015/main_ani_03.gif'
		]);

	var score =80;
	var barColor="#fa5653";
	var bgColor="#e5e5e5";

    if(score>10){
		pos=177;//bar 각도
	}else{
		pos=186;//bar 각도
	}
	 if(score<0.3){
			$(".circle").addClass("zero");
			barColor = "#e5e5e5";
			score =0.3;
			$(".text").addClass("col0");
			$(".myPosition").hide();
			$(".zeroTxt").show();
	 }

	function scoreGraph(){
      //score
		function getStatusColor(score){ //등급 bar,text 컬러
			if(score < 0.3){
				$(".circle").addClass("zero");
				barColor = "#e5e5e5";
				score =0.3;
				$(".text").addClass("col0");
				$(".myPosition").hide();
				$(".zeroTxt").show();
			}
			else if(score>0.3){
		    	$(".myPosition").show();
				$(".zeroTxt").hide();
			    if(score < 30){
				barColor="#fa5653";
		    	$(".text").addClass("col01");
			    }
			    else if(score <80){
					barColor="#ebba2d";
					$(".text").addClass("col02");
				}else if(score <= 100){
					barColor="#24c89f";
					$(".text").addClass("col03");
				}
		     }

		}
		getStatusColor(score);

		$(".circle canvas").attr("width", 240).attr("height",130);
		$(".circle canvas").gauge(score,{color: barColor, bgcolor: bgColor, lineWidth :9, type:"halfcircle"});

	}

	   scoreGraph();
	   var gageClear=0;
	   $(window).scroll(function(){
		 var now = $(this).scrollTop();
		 var mid=$(".mid");
		   if(gageClear == 0 && now >= (mid.offset().top  - $(this).height() + mid.outerHeight())){
			   if(gageClear == 0){
				   gageClear = 1;
				   scoreGraph();
			   }

		   }

	   });
	   $(".circle").click(function(){
		   scoreGraph();

			});

	var swiper = new Swiper(".swiperWrap .swiper-container",{
		slidesPerView: 1.23,
        centeredSlides: true,
        spaceBetween:"2.8%",
        speed:800,
		autoplay: {
	        delay:3000,
	        disableOnInteraction: false,
	    }
	 });

	 swiper.on('transitionStart', function () {
		var index = swiper.activeIndex;
		 var src="./images/mission/20181015/main_ani_0"+(index+1)+".gif"
         $(".aniImg img").attr("src",src);
		});

	 //롤링 text
		var myPosition= new Swiper('.myPosition .swiper-container',{
			loop: true,
			allowTouchMove:false,
			speed:1000,
			height:70,
			// direction: 'vertical',
			autoplay: {
		        delay: 1800,
		        disableOnInteraction: false,
		    }
		});

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
