
// NProgress.start();

// NProgress.done();
define(["jquery","template", "cookie"], function ($,template) {

	//判断登陆
	if (!$.cookie("userInfo") && location.pathname != "/login" && location.pathname != "/index/login") {
		location.href = "/login";
	}
	//console.dir($.cookie("userInfo"));
	//更新头像
    var userLogo='<div class="avatar img-circle">'
            +'<img src="{{tc_avatar}}">'
        +'</div>'
        +'<h4>{{tc_name}}</h4>';
	var userInfo = $.cookie("userInfo");
    var html= template.render(userLogo, userInfo?JSON.parse(userInfo).result:{});
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


})
