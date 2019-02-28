<?php
/**
 * Created by PhpStorm.
 * User: wyf
 * Date: 2019/2/19
 * Time: 11:16
 */

include "config.php";
if($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_REQUEST["uname"])&&$_REQUEST["upwd"]){
        $UNAME = $_REQUEST["uname"];
        $UPWD = $_REQUEST["upwd"];

        $sql = "SELECT uid,uname FROM userinfo WHERE uname='".$UNAME."' AND upwd='".$UPWD."'";
        $result = $conn ->query($sql);
//        print_r($result->fetch_assoc());
        if($result->num_rows>=1){
            $arr = array("msg"=>"登录成功","status"=>1,"data"=>$result->fetch_assoc());
            print_r(json_encode($arr));
        }else{
            $arr = array("msg"=>"用户名或密码错误","status"=>0);
            print_r(json_encode($arr));
        }
        $conn->close();
    }
}else{
    $arr = array("msg"=>"不支持ge请求","status"=>-1);
    print_r(json_encode($arr));
}