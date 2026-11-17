<?php

    require_once 'login.php';

    $indx = $_GET["inputInd"];

    $userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }

    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) {
        echo "<p>Well, this stinks</p>";
        die($conn->connect_error);
    }

    $myQuery = "DELETE FROM $userDB where ind = '$indx'";
    $result = $conn->query($myQuery);
    if (!$result) {
	   echo "<p>Error in reading database!</p>";
	   die($conn->error);
    }
?>