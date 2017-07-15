define([
    'jquery',
    'template',
    'course_list'
], function($,template) {
    
    $.ajax({
        url:'/api/course',
        type:'get',
        dataType:'json',
        success:function(data){
            console.dir(data.result);
            $("#course-list").html(template('courseListTpl',{list:data.result}));
        }
    })
});