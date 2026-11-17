// building or deleting book

var building = false;
$("#build").click(function(){
    building = true;
    var subset = $("#searchString").val();
    var inputColor = $("#backgroundColor").val(); 
    var bookLength;
 
    $.get("php/checkBookLength.php", function(bookLength){
        
        // if the book is not empty, ask if they want to override
        if (bookLength != '0'){
            warningMessage();
        }
        else if (bookLength == '0'){
            // we pass the default builder the substring, color, and number items per page
            $.get("php/buildBook.php?searchString="+subset+"&color="+inputColor.substring(1)+"&perPage="+perPage, function(){
                loadPage();
                building = false;
            });
        }
    });
});


$("#clear").click(warningMessage);
function warningMessage(){
    $("div#message").css("display", "block");
    $("div#message").css("box-shadow", "0px 0px 20px");
    // $("#confirmClear").click(clearBook);
}
$("#confirmClear").click(clearBook);

function clearBook(){
    if(building == true){
        var subset = $("#searchString").val();
        var inputColor = $("#backgroundColor").val();  
        $.get("php/clearBook.php", function(){
            $("div#message").css("display", "none");
            $.get("php/buildBook.php?searchString="+subset+"&color="+inputColor.substring(1)+"&perPage="+perPage, function(){
                loadPage();
                building = false;
                $("#searchString").val();
            });
        });
    }
    else{
        $.get("php/clearBook.php", function(){
            $("div#message").css("display", "none");
            defColor = "#ffffff";
            $("#backgroundColor").val("#ffffff");
            loadPage();
        });
    }
}

$(".close").click(function(){
    $("div#message").css("display", "none");
});
