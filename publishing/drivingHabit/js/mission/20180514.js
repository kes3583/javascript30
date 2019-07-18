var point = 65489;
$(function(){
    var myPosition = new Swiper(".swiperWrap .swiper-container",{
		slidesPerView: 1.28,
        centeredSlides: true,
        spaceBetween:"4%",
        navigation: {
            nextEl: '.btn.right',
            prevEl: '.btn.left',
        },    
        on: {
            init:function(){
                $(".swiperWrap .left").hide();
            },
            slideChangeTransitionEnd:function(){
                var index = this.activeIndex
                if(index == 0){
                    $(".swiperWrap .left").hide();
                }else if(index == (this.slides.length - 1)){
                    $(".swiperWrap .right").hide();
                }else{
                    $(".swiperWrap .btn").show();
                }
            }
        }
    });

    if($(".record").length > 0){    
        var gageClear = 0;
        var percent = point >= 100000 ? 100 : parseInt(point / 1000);
        
        $(window).scroll(function(){
            var now = $(this).scrollTop();
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