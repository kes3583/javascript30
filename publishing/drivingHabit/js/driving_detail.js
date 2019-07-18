$(function(){
	$("html, body").css("height", "100%");

	$("#map_div").height($(".detailMap").height());

	$(".detailClose").click(function(){
		history.back();
	});

	$(".flag li").each(function(){
		$(this).click(function(){
			$(".notiPop").removeClass("selected")
			$(".detailMap ." + $(this).attr("class")).addClass("selected")
		});
	})

	$(".delete").click(function(){
		$(".confirmDim").show();
		$(".confirm").css("margin-top", $(".confirm").outerHeight() / -2)
		$(".confirm a").each(function(i){
			var obj = $(this)
			obj.click(function(){
				if(i == 0){
					$(".confirmDim").hide()
				}else{
					/* 삭제동작 */
				}	
			})
		})
	})
	
	if(getCookie("drivingDetailFirst") == -1){
		setCookie("drivingDetailFirst", 1)
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

	setSampleMap();
})