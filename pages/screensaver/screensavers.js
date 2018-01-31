var screensavers = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        //  BASE_URL :"http://staging.nairabox.com/foodhub/",
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"};

    },

    displayScreensavers: function () {
        var cityID = $("#screensaversSelectCity").find(":selected").data("id");
        $("#preloaderNav").show();

        $("#screensaversTable").html("");
        $.ajax({
            url: screensavers.BASE_URL + "city/screensavers/all?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (screensavers) {
            $("#preloaderNav").hide();

            console.log(screensavers);


            for (var i = 0; i < screensavers.message.length; i++) {

                $("#screensaversTable").append("<tr>"
                    //  + "<td class='table_cell_link pointer' onclick='bundles.openModalBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'>" + allBundles.message[i].name + "</td>"
                    + "<td><img src='" + screensavers.message[i].image + "' style='width: 100px;margin-left: 32px'></td>"
                    + "<td><img>" + screensavers.message[i].name + "</td>"
                    + "<td>" + screensavers.message[i].status + "</td>"
                    + "<td class='btn_table_container'><button class='btn_table' onclick='screensavers.editScreensaver(\"" + screensavers.message[i]._id + "\", \"" + screensavers.message[i].name + "\",\"" + screensavers.message[i].status + "\")'><i class='fa fa-pencil icon_green' aria-hidden='true'></i><button class='btn_table' onclick='screensavers.activateScreensaver(\"" + screensavers.message[i]._id + "\", \"" + screensavers.message[i].name + "\",\"" + screensavers.message[i].status + "\",\"" + screensavers.message[i].image + "\")'><i class='icon_green fa fa-power-off' aria-hidden='true'></i></button><button class='btn_table' onclick='screensavers.deleteScreensaver(\"" + screensavers.message[i]._id + "\", \"" + screensavers.message[i].name + "\", \"" + screensavers.message[i].image + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    //  + "<td><button class='btn_table' onclick='screensavers.deleteScreensaver()'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });

    },
    editScreensaver: function (screensaverID, name, status) {
        console.log("Edit Modal");
        console.log(screensaverID);
        console.log(name);
        console.log(status);


        var screensaverEditModalTemplate = "<div>"
            // + "<div class='verticalInput'><strong>Category :  </strong><input id='modalCategoryInputCategory' type='text' value='" + locationID + "'></div>"
            + "<div class='verticalInput'><strong>File Name :  </strong><input id='modalScreensaverTitle' type='text' value='" + name + "'></div>"
            // + "<div class='verticalInput'><strong>Address :  </strong><input id='modalLocationAddress' type='text' value='" + address + "'></div>"
            // + "<div class='verticalInput'><strong>Alias ID :  </strong><input id='modalCategoryInputCategory' type='text' value='" + aliasID + "'></div>"
            + "</div>";


        alertify.confirm("Edit Screensaver Title", screensaverEditModalTemplate,
            function () {

                screensavers.validateInput(screensaverID, name, status);

            }, function () {

            }
        ).set({transition: 'zoom', label: ' UPDATE '}).show();

    },

    activateScreensaver: function (screensaverID, name, status, image) {
        // var screensaverTitleModal = $("#modalScreensaverTitle").val();


        var screensaverActivateModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Are you sure you want to activate this ?</h6>"
            + "<div style='display: flex; align-items: center'>"
            + "<img style='width: 100px' src='" + image + "'> "
            + "<div class='file_name'>"
            + "<h6>Screensaver Title </h6>"
            + "<p>" + name + "</p>"
            + "</div>"
            + "</div>"
            + "</div>";


        var screensaverDeactivateModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Are you sure you want to deactivate this ?</h6>"
            + "<div style='display: flex; align-items: center'>"
            + "<img style='width: 100px' src='" + image + "'> "
            + "<div class='file_name'>"
            + "<h6>Screensaver Title </h6>"
            + "<p>" + name + "</p>"
            + "</div>"
            + "</div>"
            + "</div>";


        if (status === "ACTIVE") {
            // var status = "INACTIVE";


            alertify.confirm("Confirm Action", screensaverDeactivateModalTemplate,
                function () {

                    screensavers.updateScreensaver(screensaverID, name, "INACTIVE");


                }, function () {

                }
            ).set({transition: 'zoom', label: ' UPDATE '}).show();


        } else {
            // var status = "ACTIVE";


            alertify.confirm("Confirm Action", screensaverActivateModalTemplate,
                function () {

                    //screensavers.updateScreensaver(screensaverID, name, "INACTIVE");
                    screensavers.updateScreensaver(screensaverID, name, "ACTIVE");


                }, function () {

                }
            ).set({transition: 'zoom', label: ' UPDATE '}).show();


            // screensavers.updateScreensaver(screensaverID, name, "ACTIVE");

        }
        //
        // $("#preloaderNav").show();
        //
        // var screensaverData = {screen_saver_id: screensaverID, name: screensaverTitleModal, status: status};
        // $.ajax({
        //     url: screensavers.BASE_URL + "screensaver/update",
        //     type: "POST",
        //     crossDomain: true,
        //     data: JSON.stringify(screensaverData),
        //     contentType: "application/json"
        // }).done(function (screensaver) {
        //     $("#preloaderNav").hide();
        //
        //     console.log("Value Updated");
        //     console.log(screensaver);
        //     screensavers.displayScreensavers();
        //
        //     if (screensavers.error_code === 0) {
        //         toastr.error(screensaver.message);
        //     } else {
        //         toastr.success(screensaver.message);
        //     }
        // });
    },

    updateScreensaver: function (screensaverID, name, status) {

        $("#preloaderNav").show();

        var screensaverData = {screen_saver_id: screensaverID, name: name, status: status};
        $.ajax({
            url: screensavers.BASE_URL + "screensaver/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(screensaverData),
            contentType: "application/json"
        }).done(function (screensaver) {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            console.log(screensaver);
            screensavers.displayScreensavers();

            if (screensavers.error_code === 0) {
                toastr.error(screensaver.message);
            } else {
                toastr.success(screensaver.message);
            }
        });

    },

    deleteScreensaver: function (screensaverID, name, image) {

        var screensaverDeleteModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Are you sure you want to delete this ?</h6>"
            + "<div style='display: flex; align-items: center'>"
            + "<img style='width: 100px' src='" + image + "'> "
            + "<div class='file_name'>"
            + "<h6>Screensaver Title </h6>"
            + "<p>" + name + "</p>"
            + "</div>"
            + "</div>"
            + "</div>";

        alertify.confirm("Confirm Delete Action", screensaverDeleteModalTemplate,
            function () {

                // screensavers.validateInput(screensaverID, name, status);

                $("#preloaderNav").show();

                var screensaverData = {screen_saver_id: screensaverID};
                $.ajax({
                    url: screensavers.BASE_URL + "screensaver/delete",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(screensaverData),
                    contentType: "application/json"
                }).done(function (screensaver) {
                    $("#preloaderNav").hide();

                    console.log("Value Updated");
                    console.log(screensaver);
                    screensavers.displayScreensavers();

                    if (screensavers.error_code === 0) {
                        toastr.error(screensaver.message);
                    } else {
                        toastr.success(screensaver.message);
                    }
                });

            }, function () {

            }
        ).set({transition: 'zoom', label: ' UPDATE '}).show();


    },

    validateInput: function (screensaverID, name, status) {

        var screensaverTitleModal = $("#modalScreensaverTitle").val()
        // if (screensaverTitleModal === ""){
        //
        // }


        if (screensaverTitleModal === "") {
            $("#modalScreensaverTitle").addClass("error_input");
            toastr.warning("Invalid Input Values");

        } else {
            $("#modalScreensaverTitle").removeClass("error_input");
            screensavers.updateScreensaverTitle(screensaverID, status);
        }
    },

    updateScreensaverTitle: function (screensaverID, status) {
        var screensaverTitleModal = $("#modalScreensaverTitle").val();


        $("#preloaderNav").show();

        var screensaverData = {screen_saver_id: screensaverID, name: screensaverTitleModal, status: status};
        $.ajax({
            url: screensavers.BASE_URL + "screensaver/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(screensaverData),
            contentType: "application/json"
        }).done(function (screensaver) {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            console.log(screensaver);
            screensavers.displayScreensavers();

            if (screensavers.error_code === 0) {
                toastr.error(screensaver.message);
            } else {
                toastr.success(screensaver.message);
            }
        });

    }
}

screensavers.init();

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

            $("#screensaversSelectCountry").html("");
            $("#screensaversSelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                $("#screensaversSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                // $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");


                console.log("adding countries");
            }
        });
    }


    $("#screensaversSelectCountry").change(function () {
        console.log("select country clicked");
        //var countryID =
        var countryID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(countryID);
        getScreensaversState(countryID)

    });


    function getScreensaversState(countryID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#screensaversSelectState").html("");
            $("#screensaversSelectState").append("<option>Select a state</option>");

            for (i = 0; i < states.message.length; i++) {
                $("#screensaversSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#screensaversSelectState").change(function () {
        console.log("select country clicked");
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(stateID);
        getScreensaversCity(stateID);

    });


    function getScreensaversCity(stateID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
            $("#preloaderNav").hide();

            console.log(cities);
            $("#screensaversSelectCity").html("");
            $("#screensaversSelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#screensaversSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }


    $("#screensaversSelectCity").change(function () {
        console.log("select country clicked");
        //var countryID =
        var cityID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(cityID);
        //getScreensaverCity(stateID);
        //$("#city_id").val(cityID);
        if (cityID !== undefined) {
            screensavers.displayScreensavers();
        }
    });


});