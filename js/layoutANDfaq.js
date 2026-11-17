
var defColor = "#ffffff";
$("#backgroundColor").change(function(){
    $("#page1, #page2").css("background-color", $(this).val());
    defColor = $(this).val();
    $.get("php/updateColor.php?page="+curPage+"&color="+defColor.substring(1));
});

// faq

$("#FAQ").click(function(){
    $("#messageFAQ").css("display", "block");
});
$(".close").click(function(){
    $("#messageFAQ").css("display", "none");
});

$(document).mouseup(function(input) {
    var container = $("#messageFAQ");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(input.target) && container.has(input.target).length === 0) {
        container.css("display", "none");
    }
});


// ==================================== layouts ----------------==========

var perPage;
function drawLayout(pp) {
    var result;
    perPage = pp;
    resetLayoutIcons();
    if(curPage != 0){
        $.get("php/drawBoxes.php?i="+pp+"&idShift=0", function(result){
            $("#page1").html(result);
            $.get("php/drawBoxes.php?i="+pp+"&idShift="+pp, function(result){
            $("#page2").html(result);
            $("#page2").css("display", "flex");
                if($("#borders").is(':checked')){
                    bordersClick();
                }
                if($("#objectFit").is(':checked')){
                    fitClick();
                }
                loadPage();
            });
        });
    }

    if (pp == 1){
        $("#layout1 img").attr("src", "images/oneFill.png");
    }
    else if (pp == 2) {
        $("#layout2 img").attr("src", "images/twoFill.png");
    }    
    else if (pp == 3) {
        $("#layout3 img").attr("src", "images/threeFill.png");
    }
    else if (pp == 4) {
        $("#layout4 img").attr("src", "images/fourFill.png");
    }

    $.get("php/setLayout.php?perPage="+pp);
}

$("#layout1").click(function(){drawLayout(1);});
$("#layout2").click(function(){drawLayout(2);});
$("#layout3").click(function(){drawLayout(3);});
$("#layout4").click(function(){drawLayout(4);});

function resetLayoutIcons() {
    $("#layout1 img").attr("src", "images/one.png");
    $("#layout2 img").attr("src", "images/two.png");
    $("#layout3 img").attr("src", "images/three.png");
    $("#layout4 img").attr("src", "images/four.png");
}

