$(function(){
	
	$(".blueNoti").click(function(){
		$(this).fadeOut();
	})

	if($(".blueNoti").css("display") == "block"){
		setTimeout(function(){
			if($(".blueNoti").css("display") == "block"){
				$(".blueNoti").fadeOut();
			}
		},3000);
	}

	touchEvt($(".settingBtn"), false);

	
	$(".faqTab a").click(function(){
		$(this).parent().addClass("selected").children("a").addClass("bold").parent().siblings("li").removeClass("selected").children("a").removeClass("bold")
		switch($(".faqTab a").index($(this))){
			case 1:
				$(".faqContents dl").hide();
				$(".faqContents .point").show();
				break;
			case 2:
				$(".faqContents dl").hide();
				$(".faqContents .security").show();
				break;
			case 3:
				$(".faqContents dl").hide();
				$(".faqContents .insurance").show();
				break;
			default:
				$(".faqContents dl").show();
				break;
		}

		$(".faqContents dl dd").hide().parent().removeClass("selected");
		faqHeight()
	})

	$(".faqContents dt").click(function(){
		var obj = $(this)
		obj.next().slideToggle().parent().toggleClass("selected").siblings(".selected").removeClass("selected").children("dd").slideToggle();
	});

	faqHeight()

	$(".removeChk").click(function(){
		$(this).toggleClass("checked")
	});

	$(".removeUserBtn").click(function(){
		if(!$(".removeChk").hasClass("checked")){
			$(".removeAgree").show();
			setTimeout(function(){
				if($(".removeAgree").css("display") == "block"){
					$(".removeAgree").fadeOut();
				}
			},3000);
		}else{
			$(".confirmDim").show();
			$(".confirm").css("margin-top", $(".confirm").outerHeight() / -2)
			$(".confirm a").each(function(i){
				var obj = $(this)
				obj.click(function(){
					if(i == 0){
						$(".confirmDim").hide()
					}else{
						/* 탈퇴동작 */
					}	
				})
			})
		}
	});

	$(window).scroll(function(){
		if($(window).scrollTop() != 0){
			$("header").addClass("noUnder")
		}else{
			$("header").removeClass("noUnder")
		}
	})
})

function faqHeight(){
	if($(".faqContents").parent().outerHeight() > $(window).height()){
		$(".faqContents").addClass("fullPage")
	}else{
		$(".faqContents").removeClass("fullPage")
	}
}