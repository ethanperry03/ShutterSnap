<?php

	require_once 'login.php';

	
   	// these are the variables from login.php
   	$conn = new mysqli($hostname, $username, $password, $database);
   	if ($conn->connect_error) {
		echo "<p>Well, this stinks</p>";
	 	die($conn->connect_error);
   	}
   	
   	$page = $_GET["page"];
    $color = $_GET["color"];

    $userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }
    $userDB = $userDB."Color";

   	$myQuery = "SELECT page FROM $userDB where page='$page'";
   	$result = $conn->query($myQuery);
   	if (!$result) {
	   	echo "<p>Error in reading database!</p>";
	   	die($conn->error);
   	}
   	else{
   		if($result->num_rows > 0){
   			$myQuery = "UPDATE $userDB SET color='$color' where page='$page'";
   			$conn->query($myQuery);
   		}
   		else{
   			$myQuery = "INSERT INTO $userDB (page,color) values('$page','$color')";
   			$conn->query($myQuery);
   		}
   	} 


?>