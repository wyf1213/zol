<?php

include "config.php";
if($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST["uname"])&&isset($_POST["upwd"])){
        $UNAME = $_POST["uname"];
        $UPWD = $_POST["upwd"];

        $sql = "INSERT INTO `userinfo` (`uname`,`upwd`)
                VALUES ('" . $UNAME . "','" . $UPWD . "')";
        $result = $conn->query($sql);
        if($result==1){
            $arr = array("msg"=>"注册成功","status"=>1);
            print_r(json_encode($arr));
        }else{
            $arr = array("msg"=>"注册失败","status"=>0);
            print_r(json_encode($arr));
        }
        $conn->close();
    }else{
        $arr = array("msg"=>"不支持get请求","status"=>-1);
        print_r(json_encode($arr));
    }
}