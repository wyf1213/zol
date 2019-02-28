<?php

include "config.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $sql = "SELECT * FROM carts where uId='".$_POST['uId']."'";
    $result = $conn->query($sql);
    if($result->num_rows>=1){
        $listArr = array();
        while ($row = $result->fetch_assoc()) {
            array_push($listArr, $row);
        }
        $resultJson=array("msg"=>"查询成功","status"=>1,"data"=>$listArr,"cartnum"=>$result->num_rows);
        print_r(json_encode($resultJson));
    }else{
        $resultJson=array("msg"=>"查询失败","status"=>0,"data"=>"","cartnum"=>0);
    }
    $conn->close();
}