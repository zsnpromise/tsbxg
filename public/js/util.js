define([
    'jquery'
   ], function($) {
    
    function qs(){
        var urlPara=location.search.slice(1),arrPara=[],objPara={},arr=[];
        if(urlPara){
            arrPara=urlPara.split("&");
            for(var i=0;i<arrPara.length;i+=1){
               arr= arrPara[i].split("=");
               objPara[arr[0]]=arr[1];
            }
        }
        return objPara; 
    }
    return {
        qs:qs
    }
});