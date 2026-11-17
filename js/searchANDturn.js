// search functionality, turn and load pages

function pageNumberDisplay() {
    if (curPage == 0) {
        $("#pageNumber").html("Cover Page");
    }
    else {
        $("#pageNumber").html("pg. "+curPage);
    }
}
$("#searchString").keyup(show);

// Get the string for searching from this function
function show(event) {
    
    event.preventDefault();
    var input = $("#searchString").val();

    $.ajax({
        url: "php/search.php?q="+input,
        success: function(result){
            $("#main").html(result);
        }
    })   
}


// load data from book database
$("#prev").click(
    function(){
        curPage--;
        $("#page1").fadeOut(500);
        $("#page2").fadeOut(500,function(){
            $("#page2").css("display", "none");
            loadPage();   
        });
        pageNumberDisplay();
        
        if(curPage == 0){
            $("#prev").children().attr("src", "images/transparent.png");
        }
    }
);

var nextSrc = "";
$("#next").click(
    function(){
        curPage++;
        if(curPage == 1){
            $("#page1").fadeOut(500,function(){
                drawLayout(perPage);
                loadPage();
            });
            $("#prev").children().attr("src", "images/leftArrow.png");
        }
        else{
            $("#page1").fadeOut(500);
            $("#page2").fadeOut(500,function(){
                loadPage();    
            });
        }
        pageNumberDisplay();   
    }
);
