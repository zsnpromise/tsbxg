define(['jquery', 'template', 'ckeditor', 'region', 'uploadify', 'validate',
    'form','bootstrap_date','bootstrap_date_zh'], function ($, template, CKEDITOR) {
       
        $.ajax({
            url: "/api/teacher/profile",
            type: "get",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $(".settings").html(template("settingsTpl", data.result))
                //异步上传图片
                $("#upfile").uploadify({
                    fileObjName: 'tc_avatar',
                    height: '120px',
                    width: '120px',
                    buttonText: '',
                    swf: '/public/assets/uploadify/uploadify.swf',    //指定上传控件的主体文件
                    uploader: '/api/uploader/avatar',  //指定服务器端上传处理文件
                    onUploadSuccess: function (a, b, c) {
                        console.dir(b);
                        b=JSON.parse(b);
                        $(".settings img").attr("src", b.result.path);
                    }
                });
                //省市联动
                $("#adress").region({ url: '/public/assets/jquery-region/region.json' });

                //富文本
                CKEDITOR.replace('editor', {
                    toolbarGroups: [
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                        { name: 'others', groups: ['others'] },
                        { name: 'about', groups: ['about'] }
                    ]
                });
                //时间

                $("form").validate({

                    sendForm: false,
                    valid: function () {
                        // 处理富文本内容更新
                        for (var instance in CKEDITOR.instances) {
                            CKEDITOR.instances[instance].updateElement();
                        }
                        // 处理籍贯信息
                        var p = $('#p option:selected').text();
                        var c = $('#c option:selected').text();
                        var d = $('#d option:selected').text();
                        $(this).ajaxSubmit({
                            url: '/api/teacher/modify',
                            type: "post",
                            dataType: "json",
                            data:{tc_hometown:p+'|'+c+'|'+'d'},
                            success(data) {
                                console.dir(data);
                                // if (data.code == 200) {
                                //     location.href = "/teacher/list";
                                // }
                               location.reload();
                            }
                        });
                    },
                    // description: {
                    //     tc_name: {
                    //         required: "请输入姓名",
                    //     },
                    //     tc_pass: {
                    //         required: "请输入密码",
                    //         pattern: '请输入六位数字的密码',
                    //     },
                    //     tc_join_date: {
                    //         required: "请输入入职时间",
                    //     }

                    // },

                });
            }
        })
    })