define([
    'jquery',
    'validate',
    'form',
], function ($) {
    $("form").validate({
        sendForm: false,
        valid: function () {
            $(this).ajaxSubmit({
                url: '/api/course/create',
                type: "post",
                dataType: "json",
                success: function (data) {
                    if(data.code==200){
                      location.href='/course/add_step1?type=1&cs_id='+data.result.cs_id;
                    }
                     //console.dir(data);
                }
            })
        },

    })


});