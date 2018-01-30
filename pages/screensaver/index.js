$(function () {
    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getScreensaverCountry();


    function getScreensaverCountry() {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (countries) {
            $("#preloaderNav").hide();

            console.log(countries);

            $("#screensaverSelectCountry").html("");
            $("#screensaverSelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                // $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");


                console.log("adding countries");
            }
        });
    }


    $("#screensaverSelectCountry").change(function () {
        console.log("select country clicked");
        //var countryID =
        var countryID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(countryID);
        getScreensaverState(countryID)

    });


    function getScreensaverState(countryID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#screensaverSelectState").html("");
            $("#screensaverSelectState").append("<option>Select a state</option>");

            for (i = 0; i < states.message.length; i++) {
                $("#screensaverSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#screensaverSelectState").change(function () {
        console.log("select country clicked");
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(stateID);
        getScreensaverCity(stateID);

    });


    function getScreensaverCity(stateID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
            $("#preloaderNav").hide();

            console.log(cities);
            $("#screensaverSelectCity").html("");
            $("#screensaverSelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#screensaverSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }

    $("#screensaverSelectCity").change(function () {
        console.log("select country clicked");
        //var countryID =
        var cityID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(cityID);
        //getScreensaverCity(stateID);
        $("#city_id").val(cityID);

    });


    $("form").submit(function (event) {
        event.preventDefault();
        var fileSelect = document.getElementById('qqfile');
        var file = fileSelect.files[0];
        var name = $("#screensaverName").val();
        var city_id = $("#screensaverSelectCity").find(":selected").data("id");

        var formData = new FormData();

        // Add the file to the request.
        formData.append('image', file, file.name);
        formData.append("city_id", city_id);
        formData.append("name", name);

        // var name = $("#screensaverName").val();
        //  var cityID = $("#screensaverSelectCity").find(":selected").data("id");

        // e.preventDefault();

        // var fd = new FormData();
        // var file_data = $('input[type="file"]')[0].files; // for multiple files
        // for (var i = 0; i < file_data.length; i++) {
        //     fd.append("file_" + i, file_data[i]);
        // }
        // var other_data = $('form').serializeArray();
        // $.each(other_data, function (key, input) {
        //     fd.append(input.name, input.value);
        // });
        $.ajax({
            url: 'http://staging.nairabox.com/foodhub/screensaver/create',
            data: formData,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                console.log(data);
                var res = JSON.parse(data);
                if (res.status === 200) {
                    toastr.success("A new screensaver was added");
                } else {
                    toastr.error("Error occurred :" + res.message);
                }

            }
        });

    });

});


var createScreensaver = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        // createScreensaver.getScreensaverCountry();

    },

    // getScreensaverCountry: function () {
    //     $("#preloaderNav").show();
    //
    //     $.ajax({
    //         url: createScreensaver.BASE_URL + "countries",
    //         type: "GET",
    //         crossDomain: true,
    //         contentType: "application/json"
    //     }).done(function (countries) {
    //         $("#preloaderNav").hide();
    //
    //         console.log(countries);
    //
    //         $("#screensaverSelectCountry").html("");
    //         $("#screensaverSelectCountry").append("<option>Select a country</option>");
    //
    //         for (i = 0; i < countries.message.length; i++) {
    //             $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
    //             // $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
    //
    //
    //             console.log("adding countries");
    //         }
    //     });
    // },

    getScreensaverState: function () {


        $("#preloaderNav").show();

        $.ajax({
            url: createScreensaver.BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#screensaverSelectState").html("");
            $("#screensaverSelectState").append("<option>Select a state</option>");

            for (i = 0; i < states.message.length; i++) {
                $("#screensaverSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    },

    getScreensaverCity: function () {

    },

    addScreensaver: function () {
        console.log("Adding Screensaver");

        // Variable to store your files
        var files;

// Add events
        $('#qqfile').on('change', prepareUpload);

// Grab the files and set them to our variable
        function prepareUpload(event) {
            debugger;
            files = event.target.files;
            console.log(files);
        }


        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

// START A LOADING SPINNER HERE

// Create a formdata object and add the files
        var data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: 'http://staging.nairabox.com/foodhub/fileupload',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data, textStatus, jqXHR) {
                if (typeof data.error === 'undefined') {
                    // Success so call function to process the form
                    submitForm(event, data);
                }
                else {
                    // Handle errors here
                    console.log('ERRORS: ' + data.error);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                // STOP LOADING SPINNER
            }
        });

    }

}

createScreensaver.init();