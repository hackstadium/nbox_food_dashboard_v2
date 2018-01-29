// $(function () {
//     console.log("app js found!");
//     console.log("app js ready!");
//
//
//     $("#addMenu").click(function () {
//         // alert( "Handler for .click() called." );
//         console.log($('#inputMenu').val())
//
//     });
//
//     $("#addOptions").click(function () {
//         // alert( "Handler for .click() called." );
//         console.log($('#inputOptions').val())
//         $(".inner").append("<p>Test</p>");
//
//     });
//
//     // $("#addRegion").click(function () {
//     //    console.log("Adding Region");
//     // });
//
//
// });

var app = {
    init: function () {
        console.log("app js found");

        app.checkLogin();
    },

    checkLogin: function () {

        // var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        // console.log(isLoggedIn);
        console.log("redirecting to login page");
        window.location.href = "pages/login/login.html";
    }

    // showNotification:function (message) {
    //     $.notify("I'm over here !");
    // }
}

app.init();