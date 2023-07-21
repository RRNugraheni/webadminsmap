<?php 
	$host 		="localhost";
	$database 	="db_smap";
	$username	="root";
	$password	="";

$link = mysqli_connect($host,$username,$password,$database);
mysqli_select_db($link,$database);

?>