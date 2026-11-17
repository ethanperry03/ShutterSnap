// load functionality

$(document).ready(function(){
    var result;
    $.ajax({
        url: "php/search.php?q=",
        success: function(result){
            $("#main").html(result);
        }
    });
    $("#page1").css("display", "flex");
    loadCover();
    $("#borders").prop('checked', true); 
    pageNumberDisplay();
    
    // get layout per page
    $.get("php/getLayout.php", function(result) {
        perPage = result;
        drawLayout(result);
    });
});


function loadCover() {
    // $("#page2").css("display", "none");
    var result;
    $.get("php/loadCover.php", function(result){
        $("#page2").css("display", "none");
        $("#page1").html(result);                
        if($("#borders").is(':checked')) {
            bordersClick();
        }
        $("#page1").fadeIn(500);
        $.get("php/getColor.php?page="+curPage+"&color="+defColor.substring(1), function(result){
            $("#page1, #page2").css("background-color", "#"+result);
        });
    });
}

function loadPage() {
    var result;
    var inputInd = 2 * perPage * (curPage - 1) + 1;
    // loads color for the specific page to UI from the database
    $.get("php/getColor.php?page="+curPage+"&color="+defColor.substring(1),function(result){
        $("#page1, #page2").css("background-color", "#"+result);
    });

    // if this is not the cover page, do things as normal to animate to next/prev
    if (curPage > 0){
            $.get("php/getImage.php?inputInd="+inputInd+"&perPage2="+perPage*2+"&curPage="+curPage, function(result){
                var databaseObj = JSON.parse(result);
                for(var i =0;i<perPage*2;i++){
                    var newID = '#id' + (i+1);
                    $(newID).children().attr("src", databaseObj.response[i].url);
                }
                $("#page1").fadeIn(500);
                $("#page2").fadeIn(500);
            });
    }
    // else load the cover
    else {
        loadCover();
    }
}
