define([
    'jquery',
    'cookie'
    ], function($) {
      $("#login").on("click",function() {
              $.ajax({
                url:"/api/login",
                type:"post",
                data:$("#from-login").serialize(),
                dataType:"json",
                success:function(data){
                    //var dt=JSON.parse(data);
                    if(data.code==200){
                        $.cookie("userInfo",JSON.stringify(data),{ expires: 7, path: '/' })
                        location.href="/";
                    }
                }
              })
              return false;
          })
});