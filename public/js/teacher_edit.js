define([
    'jquery',
    'template',
    'util',
    'bootstrap',
    'bootstrap_date',
    'bootstrap_date_zh',
    'validate',
    'form',
], function ($, template, u) {

    $('.datepicker').datepicker();


    var para = u.qs();
    if (para.tc_id) {
        $.ajax({
            url: "/api/teacher/edit",
            data: { tc_id: para.tc_id },
            type: "get",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $(".teacher").html(template("teacherEdit", data.result));
                subData("/api/teacher/update");
            }
        })
    } else {
        $(".teacher").html(template("teacherEdit", { tc_gender: 0, tc_type: 0 }));
        subData("/api/teacher/add");
    }
    function subData(url) {
        $("form").validate({
            sendForm: false,
            valid: function () {
                $(this).ajaxSubmit({
                    url:url,
                    type:"post",
                    dataType:"json",
                    success(data){
                        // console.dir(data);
                        if(data.code==200){
                           location.href="/teacher/list";
                        }
                        
                    }
                });
            },
            description: {
                tc_name: {
                    required: "请输入姓名",
                },
                tc_pass: {
                    required: "请输入密码",
                    pattern: '请输入六位数字的密码',
                },
                tc_join_date: {
                    required: "请输入入职时间",
                }

            },

        });
    }
});