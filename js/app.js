$(function () {
    console.log("app js found!");
    console.log("app js ready!");


    $("#addMenu").click(function () {
        // alert( "Handler for .click() called." );
        console.log($('#inputMenu').val())

    });

    $("#addOptions").click(function () {
        // alert( "Handler for .click() called." );
        console.log($('#inputOptions').val())
        $(".inner").append("<p>Test</p>");

    });

    // $("#addRegion").click(function () {
    //    console.log("Adding Region");
    // });


});