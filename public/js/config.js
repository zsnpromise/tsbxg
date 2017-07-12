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
        common: '../js/common',
        util: '../js/util',
        login: '../js/login',
        teacher_list: '../js/teacher_list',
        teacher_edit: '../js/teacher_edit',
        settings: '../js/settings',
        
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
        }  
    }
})