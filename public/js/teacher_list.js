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


            })

        }
    });



});