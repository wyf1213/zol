<?php

include "config.php";

if(isset($_GET["username"])){
    $username = $_GET["username"];

    $sql = "select * from userinfo where uname='".$username."'";
    $result = $conn->query($sql);
    if($result->num_rows>=1){
        print_r("false");
    }else{
        print_r("true");
    }
    $conn->close();
}