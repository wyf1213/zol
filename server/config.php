<?php

header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");
$host = "127.0.0.1";
$name = "root";
$pwd = "";
$db = "zol";
$port = "3306";
$conn = new mysqli($host,$name,$pwd,$db,$port);
mysqli_query($conn,"set names utf8");