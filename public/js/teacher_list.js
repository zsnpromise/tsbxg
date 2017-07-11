define([
    'jquery',
    'template',
    'bootstrap'
], function ($, template) {
    $.ajax({
        url: "/api/teacher",
        type: "get",
        dataType: "json",
        success: function (data) {
            console.dir(data);
            var year = new Date().getFullYear();
            $("#teacherlist").html(template("telList", { list: data.result, year: year }));
            //查看
            $("#teacherlist").find(".seeUserInfo").on("click", function () {
                var userId = $(this).parent().data("userid");
                $.ajax({
                    url: "/api/teacher/view",
                    type: "get",
                    data: {tc_id : userId},
                    dataType: "json",
                  success: function (info) {
                        console.dir(info);
                       $("#teacherInfo").html(template("telSeeInfo", info.result));
                       $('#teacherModal').modal();
                    }
                });


            });
            //修改状态
            
            $("#teacherlist").find(".eidtStates").on("click",function(){
                var userId = $(this).parent().data("userid");
                 var status = $(this).parent().data("status");
                 var that=this;
                $.ajax({
                    url: "/api/teacher/handle",
                    type: "get",
                    data: {tc_id : userId,tc_status:status},
                    dataType: "json",
                  success: function (info) {
                        console.dir(info);
                         $(that).parent().data("status",info.result.tc_status);
                        if(!info.result.tc_status){
                           $(that).text("注 销");
                        }else{
                         $(that).text("显 示");
                        }
                    //    $("#teacherInfo").html(template("telSeeInfo", info.result));
                    //    $('#teacherModal').modal();
                    }
                });
            })

        }
    });



});