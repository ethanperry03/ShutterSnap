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

   	$myQuery = "SELECT color FROM $userDB where page='$page'";
   	$result = $conn->query($myQuery);
   	if (!$result) {
	   	echo "<p>Error in reading database!</p>";
	   	die($conn->error);
   	}
   	else{
   		if($result->num_rows > 0){
   			$result->data_seek(0);
            echo($result->fetch_assoc()['color']);
   		}
   		else{
   			echo($color);
   		}
   	} 


?>