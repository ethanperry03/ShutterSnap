<?php

    $end = $_GET["i"];
    $idShift = $_GET["idShift"];
    
    $style = "";
    if ($end == 1) {
        $style = "style='width: 80%; height:80%;'";
    }

    for($i = 1; $i < $end+1; $i++){
        $idNum = $i + $idShift;
        echo "<div class='picBox' $style id='id$idNum'><img class='innerImage' width='100%' height='100%'></div>";
    }

?>