<?php

	require_once 'login.php';

	$userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }

   	// these are the variables from login.php
   	$conn = new mysqli($hostname, $username, $password, $database);
   	if ($conn->connect_error) {
		echo "<p>Well, this stinks</p>";
	 	die($conn->connect_error);
   	}
   	
   	$ind = $_GET["ind"];
    $newSrc = $_GET["newSrc"];

   	$myQuery = "SELECT ind FROM $userDB where ind='$ind'";
   	$result = $conn->query($myQuery);
   	if (!$result) {
	   	echo "<p>Error in reading database!</p>";
	   	die($conn->error);
   	}
   	else{
   		if($result->num_rows > 0){
   			$myQuery = "UPDATE $userDB SET url='$newSrc' where ind='$ind'";
   			$conn->query($myQuery);
   		}
   		else{
   			$myQuery = "INSERT INTO $userDB (ind,url) values('$ind','$newSrc')";
   			$conn->query($myQuery);
   		}
   	} 


?>