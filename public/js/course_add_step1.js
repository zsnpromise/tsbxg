define([
    'jquery',
    'template',
    'util',
    'ckeditor',
    'validate',
    'form'
], function($,template,util,CKEDITOR) {

    var para=util.qs();
    $.ajax({
        url:"/api/course/basic",
        type:"get",
        dataType:"json",
        data:{cs_id:para.cs_id},
        success:function(data){
            console.dir(data);
            if(para.type){
                data.result.EditType=para.type;
            }
            $(".course-add").html(template('infoTpl',data.result));
            //富文本
            CKEDITOR.replace('editor');
            //栏目联动
            $("#categoryLeval").on("change",function(){
                $.ajax({
                    url:"/api/category/child",
                    type:"get",
                    dataType:"json",
                    data:{cg_id:$(this).val()},
                    success:function(info){
                        
                        var tpl='  <option value="0">请选择</option>'
                                       +  '{{each list}}'
                                       + '<option value="{{$value.cg_id}}" {{if cs_cg_id==$value.cg_id}}selected{{/if}}>{{$value.cg_name}}</option>'
                                       +' {{/each}}';
                       $("#categoryLeval").next().html(template.render(tpl,{list:info.result})) 
                    }
                })
            })

            //保存
            $("form").validate({sendForm:false,valid:function(){
                 for (var instance in CKEDITOR.instances) {CKEDITOR.instances[instance].updateElement(); }
                $("form").ajaxSubmit({
                    url:"/api/course/update/basic",
                    data:{cs_id:para.cs_id},
                    type:"post",
                    dataType:"json",
                    success:function(info){
                       console.dir(info);
                       var type="";
                       if(para.type){
                           type="&type="+para.type;
                       }
                       location.href="/course/add_step2?cs_id="+para.cs_id+type;
                    }
                })
            }})
        }
    })
    
});