var regions = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        // regions.getAllRegions();
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};
        regions.checkLogin();

    },


    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            console.log("logged In");
            regions.getAllRegions();
        }
    },

    getAllRegions: function () {
        console.log("Getting all regions");
        $("#preloaderNav").show();


        $.ajax({
            url: regions.BASE_URL + "cities/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (regions) {
            console.log(regions);
            console.log(regions.message[0].country);
            console.log(regions.message[0].state);
            console.log(regions.message[0].city);
            $("#preloaderNav").hide();
            $("#regionsTable").html("");

            for (var i = 0; i < regions.message.length; i++) {


                $("#regionsTable").append("<tr>"
                    + "<td>" + regions.message[i].country + "</td>"
                    + "<td>" + regions.message[i].state + "</td>"
                    + "<td>" + regions.message[i].city + "</td>"
                    + "<td><button class='btn_table' onclick='regions.openModalEditRegionDetails(\"" + regions.message[i]._id + "\",\"" + regions.message[i].city + "\",\"" + regions.message[i].state_id + "\",\"" + regions.message[i].state + "\",\"" + regions.message[i].country_id + "\",\"" + regions.message[i].country + "\" )'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },

    openModalEditRegionDetails: function (cityID, city, stateID, state, countryID, country) {
        console.log("City ID");
        console.log(cityID);
        console.log(city);
        console.log(stateID);
        console.log(state);
        console.log(countryID);
        console.log(country);


        var RegionEditDetaillsTemplate = "<div>"
            + "<div class='verticalInput'><strong>Country :  </strong><input id='modalRegionsInputCountry' type='text' value='" + country + "'></div>"
            + "<div class='verticalInput'><strong>State :  </strong><input id='modalRegionsInputState' type='text' value='" + state + "'></div>"
            + "<div class='verticalInput'><strong>City :  </strong><input id='modalRegionsInputCity' type='text' value='" + city + "'></div>"
            + "</div>";


        alertify.confirm('Edit Region', RegionEditDetaillsTemplate,
            function () {
                console.log("Region Modal ok clicked");

                var country = $("#modalRegionsInputCountry").val();
                var state = $("#modalRegionsInputState").val();
                var city = $("#modalRegionsInputCity").val();
                var countryisValid = regions.validateAlphabet(country);
                var stateisValid = regions.validateAlphabet(state);
                var cityisValid = regions.validateAlphabet(city);

                if (!countryisValid) {
                    toastr.warning("Invalid Country");
                }

                if (!stateisValid) {
                    toastr.warning("Invalid State");
                }

                if (!cityisValid) {
                    toastr.warning("Invalid City");
                }


                if (countryisValid && stateisValid && cityisValid) {
                    // console.log("All DAta correct");
                    regions.updateRegion(cityID, stateID, countryID);
                }

            },
            function () {

            }
        ).set({transition: 'zoom', labels: {ok: 'UPDATE', cancel: 'CANCEL'}}).show();


    },


    updateRegion: function (cityID, stateID, countryID) {
        console.log("Updateing Regions with ID");
        console.log(cityID);
        console.log(stateID);
        console.log(countryID);
        var updateCity = $("#modalRegionsInputCity").val();
        var updateState = $("#modalRegionsInputState").val();
        var updateCountry = $("#modalRegionsInputCountry").val();

        var cityData = {city_id: cityID, city: updateCity};
        var stateData = {state_id: stateID, state: updateState};
        var countryData = {country_id: countryID, country: updateCountry};
        $("#preloaderNav").show();

        $.ajax({
            url: regions.BASE_URL + "city/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(cityData),
            contentType: "application/json"
        }).done(function (city) {
            console.log(city);
            $.ajax({
                url: regions.BASE_URL + "state/update",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(stateData),
                contentType: "application/json"
            }).done(function (state) {
                console.log(state);
                $.ajax({
                    url: regions.BASE_URL + "country/update",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(countryData),
                    contentType: "application/json"
                }).done(function (country) {
                    console.log(country);
                    $("#preloaderNav").hide();

                    regions.getAllRegions();
                    if (country.error_code === 1) {
                        toastr.error("Update Failed");
                    } else {
                        toastr.success("Update Successful");
                    }

                });
            });
        });
    },

    validateAlphabet: function (inputtext) {
        var alphaExp = /^[a-zA-Z]+$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
    },


    validateInput: function () {
        var stateName = $("#regionState").val();
        var countryID = $("#selectCountry").find(":selected").data("id");
        // var selectedCountry = $("#selectCountry").val();


        console.log("Validate state Value");
        console.log(state.validateAlphabet(stateName));

        console.log("Country ID");
        console.log(countryID);

        var stateisValid = state.validateAlphabet(stateName);
        console.log("Validating Country Value");
        console.log(stateisValid);

        if (countryID === undefined) {
            console.log("Country is undefined");
            toastr.warning("Select a country");

        }

        if (!stateisValid) {
            toastr.warning("Invalid State Name");
        }


        if (countryID !== undefined && stateisValid) {
            state.createState();
        }

    }


}

regions.init();