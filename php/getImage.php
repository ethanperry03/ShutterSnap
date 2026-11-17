<?php

    require_once 'login.php';

    $indx = $_GET["inputInd"];
    $perPage = $_GET["perPage2"];
    $curPage = $_GET["curPage"];

    $userDB = "";
    if(isset($_COOKIE["userBook"])){
        $userDB = $_COOKIE[userBook];
    }

    $conn = new mysqli($hostname, $username, $password, $database);
    if ($conn->connect_error) {
        echo "<p>Well, this stinks</p>";
        die($conn->connect_error);
    }
    
    $response = $response.'{"response":[';
    for($i = 0; $i<(($perPage)); $i++){
        $curInd = $indx + $i;
        $myQuery = "SELECT url FROM $userDB where ind = '$curInd'";
        $result = $conn->query($myQuery);
        if (!$result) {
    	   echo "<p>Error in reading database!</p>";
    	   die($conn->error);
        } 
        else {
            if ($result->num_rows > 0){
                $result->data_seek(0);
                
                $line = '{"index":"'.$curInd.'","url":"'.$result->fetch_assoc()['url'].'"}';

                $response = $response.$line;
            }
            else {
                $line = '{"index":"'.$curInd.'","url":"http://cs.wheatoncollege.edu/~eperry/ShutterSnap/images/transparent.png"}';
                $response = $response.$line;
            }
            if($i < $perPage -1){
                $response = $response.',';
            }
        }
    }
    $response=$response.']}';
    echo $response;
?>