<?php 
 header('Content-Type:text/html;charset=utf-8');
 $pathName="index";
 $fileName="index";
//  var_dump($_SERVER['PATH_INFO']);
  if(isset($_SERVER['PATH_INFO'])){
    $pathArr=explode('/',substr($_SERVER['PATH_INFO'],1));
    if(count($pathArr)===2){
        $pathName=$pathArr[0];
        $fileName=$pathArr[1];
    }else{
        $fileName="login";
    }
    // var_dump($pathArr) ;
  }else{
    
  }
  include './views/'.$pathName.'/'.$fileName.'.html';
?>