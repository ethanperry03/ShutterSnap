<?php

    require_once 'login.php';

    $search = $_GET["searchString"];
    $color = $_GET["color"];
    $perPage = $_GET["perPage"];

    $userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }
    $userPhotos = $userDB."Photos";

    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) {
        echo "<p>Well, this stinks</p>";
        die($conn->connect_error);
    }

    $myQuery = "SELECT * FROM $userPhotos where blurb like '%$search%' or date='$search'";
    $result = $conn->query($myQuery);
    if (!$result) {
        echo "<p>Error in reading database!</p>";
        die($conn->error);
    } 
    else if($result->num_rows > 0){
		for ($i = 0; $i < $result->num_rows; ++$i) {
			$row = $result->fetch_array (MYSQLI_ASSOC);
            $row = $row['url'];
            $myQuery = "INSERT INTO $userDB (ind,url) values('$i','$row')";
            $conn->query($myQuery);
		}
        $userDB = $userDB."Color";
        $pageCount = ceil(($result->num_rows)/($perPage*2));
        $myQuery = "DELETE from $userDB";
        $conn->query($myQuery);
        if(!is_infinite($pageCount)){
            echo($pageCount);
            for($i = 0; $i < $pageCount;++$i){
                $myQuery = "INSERT INTO $userDB (page,color) values('$i','$color')";
                $conn->query($myQuery);
            }
        }
        else{
            echo("HOW?");
            echo($pageCount);
        }
        
    }
    else{
        echo "alert('Invalid default option.')";
    }


?>