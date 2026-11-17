<?php

   require_once 'login.php';

   // these are the variables from login.php
   $conn = new mysqli($hostname, $username, $password, $database);
   if ($conn->connect_error) {
	   echo "<p>Well, this stinks</p>";
	   die($conn->connect_error);
   }

   $userDB = "";
   if(isset($_COOKIE["userBook"])) {
		$userDB = $_COOKIE["userBook"];
   }
   
   $userDB = $userDB."Photos";
   $data = $_GET['q'];
   $image = 'image';

   $myQuery = "SELECT * FROM $userDB where blurb like '%$data%' or date='$data'";
   $result = $conn->query($myQuery);
   if (!$result) {
	   echo "<p>Error in reading database!</p>";
	   die($conn->error);
   } 
   else if ($result->num_rows > 0) {
		for ($i = 0; $i < $result->num_rows; ++$i) {
			$row = $result->fetch_array (MYSQLI_ASSOC);
			$idName = 'id' + $row['id'];
			echo "<div class='box'>";
			echo "<img src=", $row['url'], " class='image'", "id=", $idName, ">";
			echo  '<br>', $row['date'];
			// echo "<a href=",$row['url'],"><img src=",$row['url'],"></a>";
			echo "<br>";
			echo "</div>";
		}
	}
	else {
		// echo "<div>";
		echo "<h1 style='margin-top:75px'>No Results</h1>";
		// echo "</div>";
	}
?>