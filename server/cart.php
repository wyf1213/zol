<?php

include "config.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $sql = "SELECT * FROM carts WHERE 
          gId='".$_POST['gId']."' AND uId='".$_POST['uId']."' AND gColor='".$_POST['gColor']."' AND 
          gMemory='".$_POST['gMemory']."' AND gBuy='".$_POST['gBuy']."' AND gSuit='".$_POST['gSuit']."'";
    $resultA = $conn->query($sql);
    if($resultA->num_rows >= 1){
        //如果数据库中有该商品的信息，就更新
        $update = "UPDATE carts SET gNum=gNum+".$_POST['gNum'].",gTotal=gNum*gPrice 
                WHERE gId='".$_POST['gId']."' AND uId='".$_POST['uId']."' AND 
                gColor='".$_POST['gColor']."' AND gMemory='".$_POST['gMemory']."' 
                AND gBuy='".$_POST['gBuy']."' AND gSuit='".$_POST['gSuit']."' ";
//        print_r($update);
        $resultB = $conn->query($update);
        if ($resultB) {
            print_r(json_encode(array("msg" => "加入成功u", "status" => 1)));
        } else {
            print_r(json_encode(array("msg" => "加入失败u", "status" => -1)));
        }
    }else{
        //没有就插入
        $insert = "INSERT INTO carts (`gId`,`gName`,`gDes`,`gImg`,`gPrice`,`gColor`,`gMemory`,`gBuy`,`gSuit`,`uId`,`gNum`,`gTotal`)
            VALUES('".$_POST["gId"]."','".$_POST["gName"]."','".$_POST["gDes"]."',
            '".$_POST["gImg"]."','".$_POST["gPrice"]."','".$_POST["gColor"]."',
            '".$_POST["gMemory"]."','".$_POST["gBuy"]."','".$_POST["gSuit"]."',
            '".$_POST["uId"]."','".$_POST["gNum"]."',
            '".$_POST["gPrice"]*$_POST["gNum"]."')";
        $resultC = $conn->query($insert);
        if ($resultC) {
            print_r(json_encode(array("msg" => "加入成功i", "status" => 2)));
        } else {
            print_r(json_encode(array("msg" => "加入失败i", "status" => -2)));
        }
    }
    $conn->close();

}