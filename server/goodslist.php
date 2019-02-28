<?php

header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");

if(isset($_REQUEST["gId"])){
    $GID = $_REQUEST["gId"];
    $goodsStr=file_get_contents("./data/goods.json");
    $goodsList = json_decode($goodsStr);
    for($i=0;$i<count($goodsList);$i++){
        if($goodsList[$i]->gId==$GID){
            print_r(json_encode($goodsList[$i]));
            break;
        }
    }
}else{
    $goodsStr=file_get_contents("./data/goods.json");
    print_r($goodsStr);
}
