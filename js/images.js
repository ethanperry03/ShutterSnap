// stuff with images
// deleting, inserting, highlighting, etc

var curPage = 0;
var clickedImage = "";
var clickedBox = "";
$(document).on("click", "img.image" , function() {
    if(clickedBox != ""){
        $(clickedBox).children().attr("src", $(this).attr("src"));
        $(clickedBox).css("box-shadow","none");
        clickedBox = "";
    }
    else{
        if (clickedImage != ""){
            var imgStr = "img[src='" + clickedImage +"']";
            $(imgStr).css("box-shadow","none");
        }
        if(clickedImage != $(this).attr("src")){ 
            clickedImage = $(this).attr("src");
            $(this).css("box-shadow","0px 0px 10px");
        }
        else{
            clickedImage = "";
        }
    }   
});

// put the picutre into the book / database
$(document).on("click", "div.picBox", function(){
    if (clickedImage != ""){
        $(this).children().attr("src", clickedImage);
        var imgStr = "img[src='" + clickedImage +"']";
        $(imgStr).css("box-shadow","none");

        //DATABASE
        var boxID = $(this).attr("id");
        boxID = parseInt(boxID.substring(2));
        var inputInd = (2* perPage * (curPage-1))+boxID;
        if (curPage == 0){
            inputInd = 0;
        }
        $.get("php/updateBook.php?ind="+inputInd+"&newSrc="+clickedImage);

        clickedImage = "";
    }
    else if(clickedBox == ""){
        $(this).css("box-shadow","0px 0px 10px");
        clickedBox = "#"+$(this).attr("id");
    }
    else{
       if(clickedBox == "#"+$(this).attr("id")){
            $(this).css("box-shadow","none");
            clickedBox = "";
        }
        else{
            $(clickedBox).css("box-shadow","none");
            $(this).css("box-shadow","0px 0px 10px");
            clickedBox = "#"+$(this).attr("id");
        }
    }
}); 

// ================= delete ============================
$("#delete").click(function(){
    if(clickedBox!=""){
        $(clickedBox).children().attr("src", "http://cs.wheatoncollege.edu/~eperry/ShutterSnap/images/transparent.png");
        $(clickedBox).css("box-shadow","none");
        var inputInd = 2 * perPage * (curPage - 1);
        inputInd = inputInd + parseInt($(clickedBox).attr("id").substring(2));
        $.get("php/removeImage.php?inputInd="+inputInd);
        clickedBox = "";
    }
});

$("#borders").click(bordersClick);
function bordersClick(){
    $("div.picBox").toggleClass("grayborder");
}
$("#objectFit").click(fitClick);
function fitClick(){
    $(".innerImage").toggleClass("objFit");
}
function uncheck(){
    $("#objectFit").prop("checked", false);
    $("#borders").prop("checked", false);
}


