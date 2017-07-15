requirejs.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        template: 'artTemplate/template-web',
        cookie: 'jquery-cookie/jquery.cookie',
        bootstrap: "bootstrap/js/bootstrap",
        bootstrap_date: 'bootstrap-datepicker/js/bootstrap-datepicker.min',
        bootstrap_date_zh: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        form: 'jquery-form/jquery.form',
        validate: 'validate/jquery-validate.min',
        uploadify:'uploadify/jquery.uploadify.min',
        ckeditor:'ckeditor/ckeditor',
        region:'jquery-region/jquery.region',
        nprogress:"nprogress/nprogress",
        jcrop:'jcrop/js/Jcrop',
        common: '../js/common',
        util: '../js/util',
        login: '../js/login',
        teacher_list: '../js/teacher_list',
        teacher_edit: '../js/teacher_edit',
        settings: '../js/settings',
        course_list:'../js/course_list',
        course_add:"../js/course_add",
        course_add_step1:'../js/course_add_step1',
        course_add_step2:'../js/course_add_step2',
        course_add_step3:'../js/course_add_step3',
        
       
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        bootstrap_date_zh: {
            deps: ['jquery', 'bootstrap_date']
        },
        validate: {
            deps: ['jquery']
        },
        uploadify:{
            deps: ['jquery']
        },
        ckeditor:{
            exports :"CKEDITOR"
        }  ,
        jcrop:{
             deps: ['jquery']
        }
    }
})