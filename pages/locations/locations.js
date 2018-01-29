var locations = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",


    init: function () {
        // locations.getAllLocations();
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"};
        locations.checkLogin();

    },

    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            // window.location.href = "../../pages/dashboard/index.html";
            console.log("logged In");
            // bundles.getAllbundles();
            // createLocation.getCountries();
            locations.getAllLocations();
        }
    },

    getAllLocations: function () {
        $("#preloaderNav").show();

        $("#locationsTable").html("");
        console.log("Getting all locations");
        $.ajax({
            url: locations.BASE_URL + "locations/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (locations) {
            $("#preloaderNav").hide();

            console.log(locations);
            console.log("Category Partner Name");

            for (var i = 0; i < locations.message.length; i++) {

                $("#locationsTable").append("<tr>"
                    + "<td>" + locations.message[i].location + "</td>"
                    + "<td>" + locations.message[i].address + "</td>"
                    + "<td>" + locations.message[i].alias_id + "</td>"
                    + "<td>" + locations.message[i].country + "</td>"
                    + "<td>" + locations.message[i].state + "</td>"
                    + "<td>" + locations.message[i].city + "</td>"
                    + "<td><button class='btn_table' onclick='locations.openEditLocationsDetailsModal(\"" + locations.message[i]._id + "\",\"" + locations.message[i].location + "\", \"" + locations.message[i].address + "\", \"" + locations.message[i].alias_id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='locations.deleteCategory(\"" + locations.message[i]._id + "\",\"" + locations.message[i].location + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }
        });
    },

    openEditLocationsDetailsModal: function (locationID, location, address, aliasID) {
        console.log("Edit Modal");
        console.log(locationID);
        console.log(address);
        console.log(aliasID);


        var LocationEditDetaillsTemplate = "<div>"
            // + "<div class='verticalInput'><strong>Category :  </strong><input id='modalCategoryInputCategory' type='text' value='" + locationID + "'></div>"
            + "<div class='verticalInput'><strong>Location :  </strong><input id='modalLocationName' type='text' value='" + location + "'></div>"
            + "<div class='verticalInput'><strong>Address :  </strong><input id='modalLocationAddress' type='text' value='" + address + "'></div>"
            // + "<div class='verticalInput'><strong>Alias ID :  </strong><input id='modalCategoryInputCategory' type='text' value='" + aliasID + "'></div>"
            + "</div>";


        alertify.confirm("Edit Location", LocationEditDetaillsTemplate,
            function () {

                locations.validateInput(locationID);

            }, function () {

            }
        ).set({transition: 'zoom', label: ' UPDATE '}).show();


    },
    updateLocation: function (locationID) {

        var location = $("#modalLocationName").val();
        var address = $("#modalLocationAddress").val();


        console.log("Updating Location info");
        console.log(location);
        console.log(address);
        console.log(locationID);

        var updateLocationData = {location_id: locationID, location: location, address: address};

        $.ajax({
            url: locations.BASE_URL + "location/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(updateLocationData),
            contentType: "application/json"
        }).done(function (location) {
            //console.log()
            console.log(location);
            if (location.error_code === 1) {
                toastr.error(location.message);
                //   locations.getAllLocations()
            } else {
                toastr.success(location.message);
            }
        });
    },

    validateInput: function (locationID) {

        var location = $("#modalLocationName").val();
        var address = $("#modalLocationAddress").val();

        if (location === "") {
            $("#modalLocationName").addClass("error_input");
        } else {
            $("#modalLocationName").removeClass("error_input");
        }

        if (address === "") {
            $("#modalLocationAddress").addClass("error_input");
        } else {
            $("#modalLocationAddress").removeClass("error_input");
        }

        if (location !== "" && address !== "") {
            console.log("All Data Correct");
            locations.updateLocation(locationID);
            locations.getAllLocations();

        } else {
            toastr.warning("Invalid Input Value");
        }

    },

    deleteLocation: function () {

    }

}

locations.init();