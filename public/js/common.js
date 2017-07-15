
// NProgress.start();

// NProgress.done();
define(["jquery", "template","nprogress", "cookie"], function ($, template,NProgress) {

	//判断登陆
	if (!$.cookie("userInfo") && location.pathname != "/login" && location.pathname != "/index/login") {
		location.href = "/login";
	}
	//console.dir($.cookie("userInfo"));
	//更新头像
	var userLogo = '<div class="avatar img-circle">'
		+ '<img src="{{tc_avatar}}">'
		+ '</div>'
		+ '<h4>{{tc_name}}</h4>';
	var userInfo = $.cookie("userInfo");
	var html = template.render(userLogo, userInfo ? JSON.parse(userInfo).result : {});
	$("#userLogo").html(html);

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//退出
	$("#loginOut").on("click", function () {
		$.ajax({
			url: "/api/logout",
			type: "post",
			dataType: "json",
			success: function (data) {
				if (data.code == 200) {
					$.removeCookie('userInfo');
					location.href = "/login";
				}
			}
		})
		return false
	});
	//侧边栏选中
	var path = location.pathname.match(/\/(\w+)\/(\w+)/);
	if (path && path[1] && path[1] != "index") {
		var domArr = $(".navs .list-unstyled a"), arrChile = [];
		for (var i = 0; i < domArr.length; i++) {

			if (domArr[i].href.indexOf(path[1]) != -1) {
				arrChile.push(domArr[i])

			}
		}
		if (arrChile.length == 1) {
			$(arrChile[0]).addClass("active");
		} else {
			for (var i = 0; i < arrChile.length; i++) {
				if (arrChile[i].href.indexOf(path[2]) != -1) {
					$(arrChile[i]).addClass("active");
					if ($(".active").parent().parent().css("display") == "none") {
						$(".active").parent().parent().css("display", "block");
					}
					break;
				}
			}
		}


	} else {
		$(".navs .list-unstyled a").eq(0).addClass("active");
	}



	//NProgress.set(0);

	NProgress.start();

	NProgress.done();

	  // 处理遮罩效果
  $(document).ajaxStart(function(){
    $('.overlay').show();
  });
  $(document).ajaxStop(function(){
    setTimeout(function(){
      $('.overlay').hide();
    },300);
  });
})
