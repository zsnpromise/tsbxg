define([
    'jquery',
    'template',
    'util',
    'uploadify',
    'jcrop',
    'form'
], function ($, template, util) {
    var para = util.qs();
    $.ajax({
        url: "/api/course/picture",
        type: 'get',
        dataType: 'json',
        data: { cs_id: para.cs_id },
        success: function (data) {
            $(".course-add").html(template('infoTpl', data.result));

            //图片上传
            $("#upfile").uploadify({
                fileObjName: 'cs_cover_original',
                width: 80,
                height: 'auto',
                marginRight: 100,
                itemTemplate: '<span></span>',
                buttonText: '上传图片',
                buttonClass: 'btn btn-success btn-sm',
                formData: { cs_id: para.cs_id },
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                onUploadSuccess: function (a, b, c) {
                    var imgSrc = JSON.parse(b);
                    $(".preview img").attr("src", b.result.path);
                }
            });
            var jcrop_api = null;
            var pic = $(".preview img");
            function cropImage() {
                //判断截取对象是否存在，存在则生成（图片重复上传）
                jcrop_api && jcrop_api.destroy();

                pic.Jcrop({
                    aspectRatio: 2,
                     bgColor : 'green',
                }, function () {
                    jcrop_api = this;
                    this.initComponent('Thumbnailer', {
                        width: 240,
                        height: 120,
                        target: $(".thumb")
                    });
                    $('.jcrop-thumb').css({
                        left: 0,
                        top: 0
                    });
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;

                    var x = 0,
                        y = (height - width / 2) / 2;
                        w = width,
                        h = width / 2;
                    this.newSelection();
                    this.setSelect([x, y, w, h]);

                    setCropInfo({ x: x, y: y, w: w, h: h });

                    pic.parent().on('cropend', function (a, b, c) {
                        setCropInfo(c)
                    });
                    //给表单保存值
                    function setCropInfo(c) {
                        $('#cropInfo input[name="x"]').val(c.x);
                        $('#cropInfo input[name="y"]').val(c.y);
                        $('#cropInfo input[name="w"]').val(c.w);
                        $('#cropInfo input[name="h"]').val(c.h);

                    }


                });
            }



            $(".btn-warning").on('click', function () {
                var btnType = $(this).data("id");
                if (btnType) {
                    $("#cropInfo").ajaxSubmit({
                        type: "post",
                        url: "/api/course/update/picture",
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                location.href = '/course/add_step3?cs_id=' + para.cs_id;
                            }
                        }
                    })
                } else {
                    $(this).data("id", 1);
                    $(this).text('保存图片');
                    cropImage();
                }
            })

        }
    })

});