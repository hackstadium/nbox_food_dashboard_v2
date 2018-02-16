$( document ).ready(function() {
    console.log( "ready!" );
    $("#modalLocationCutOffTime").timepicker();
    $("#modalLocationCutOff").timepicki();


    var date = new Date("2000-01-01 10:30 PM").getHours();
    console.log(date);

});
