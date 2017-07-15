define([
    'jquery',
    'template',
    'util',
    'bootstrap',
    'form',
], function ($, template, util) {
    var para = util.qs();
    $.ajax({
        url: '/api/course/lesson',
        type: "get",
        data: { cs_id: para.cs_id },
        dataType: "json",
        success: function (data) {
            console.dir(data);
            $(".course-add").html(template("listTpl", data.result));


            $(".btnAdd").on("click", function () {
                $("#chapterModal").html(template("infoTpl", { ct_cs_id: para.cs_id }));
                $("#chapterModal").modal();

                $(".btnSub").on("click", function () {
                    subForm("/api/course/chapter/add");
                })


            });
            $(".btnEdit").on("click", function () {
                $.ajax({
                    url: "/api/course/chapter/edit",
                    data: { ct_id: $(this).data("id") },
                    type:"get",
                    dataType: "json",
                    success: function (info) {
                        //cs_id: para.cs_id
                        $("#chapterModal").html(template("infoTpl", info.result));
                        $("#chapterModal").modal();

                        $(".btnSub").on("click", function () {
                            subForm("/api/course/chapter/modify");
                        })
                    }
                })
            })

            function subForm(url) {

                $("form").ajaxSubmit({
                    url: url,
                    type: "post",
                    data: { ct_is_free: Number($("input[type=checkbox]").prop("checked")) },
                    success: function (info) {
                        if (info.code == 200) {
                            location.reload();
                        }

                    }
                })
            }
        }
    })

});