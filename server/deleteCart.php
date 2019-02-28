<?php

include "config.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_REQUEST["cId"])) {
        $delete = "DELETE FROM carts WHERE cId=".$_POST['cId'];
        $result = $conn->query($delete);
        print_r($delete);
        print_r($result);
        if($result==1){
            $arr = array("msg"=>"删除成功","status"=>1);
            print_r($arr);
        }else{
            $arr = array("msg"=>"删除失败","status"=>0);
            print_r($arr);
        }
        $conn->close();
    }
}