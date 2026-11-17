
$("#login").click(popup);

function popup() {
    $("#most").css("filter", "blur(2px)");
    $("#over").css("display", "block");
}

$(".close").click(reset);

function reset() {
    $("#message").css("display", "none");
    $("#over").css("display", "none");
    $("#most").css("filter", "blur(0)");
    $("#user, #pass").val("");
}

$("#submit").click(checkCredentials);

function checkCredentials() {
    var inputUser = $("#user").val();
    var inputPass = $("#pass").val();
    var result;

    $.get("php/credentials.php?user="+inputUser+"&pass="+inputPass, function(result){
        if(result == "Success!"){
            // window.location.replace("http://cs.wheatoncollege.edu/~eperry/p4/FunFotos.html?user="+inputUser);
            document.cookie = "userBook=" + inputUser.toLowerCase() + "Book;";
            window.open("http://cs.wheatoncollege.edu/~eperry/ShutterSnap/FunFotos.html", '_blank');
        }
        else{
            alert("Invalid Credentials");
        }
    })
    return false;
}

$(".inProgress").click(message);

function message() {
    $("#most").css("filter", "blur(2px)");
    $("#message").css("display", "block");
}
