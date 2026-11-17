<?php

    require_once 'login.php';

    $userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }

    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) {
        echo "<p>Well, this stinks</p>";
        die($conn->connect_error);
    }

    $myQuery = "SELECT url FROM $userDB where ind='0'";
    $result = $conn->query($myQuery);
    if (!$result) {
        echo "<p>Error in reading database!</p>";
        die($conn->error);
    } 
    else {
        if ($result->num_rows > 0){
            $result->data_seek(0);
            $response = $result->fetch_assoc()['url'];
        }
        else {
            $response = 'http://cs.wheatoncollege.edu/~eperry/p4/images/transparent.png';
        }

        echo "<div class='picBox' style='width: 80%; height: 80%;' id='id0'><img src='$response' class='innerImage' width='100%' height='100%'></div>";
    }
?>