<?php
$userPassword= $_GET["pass"];
$inName= $_GET["user"];

require_once 'login.php';

// these are the variables from login.php
$conn = new mysqli($hostname, $username, $password, $database);
if ($conn->connect_error) {
   echo "<p>Well, this stinks</p>";
   die($conn->connect_error);
}

$myQuery = "SELECT password FROM users where BINARY username = '$inName'";
$result = $conn->query($myQuery);
if (!$result) {
	   echo "<p>Error in reading database!</p>";
	   die($conn->error);
   } 
else{
	$obj = $result->fetch_object();
	if (password_verify($userPassword, $obj->password)){
		echo "Success!";
	}
	else{
		echo "NO";
	}
}


?>