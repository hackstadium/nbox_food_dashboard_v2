var city = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        //city.getAllCountries();
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"};
        city.checkLogin();

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
            //partners.getAllPartners();
            city.getAllCountries();

        }
    },

    getAllCountries: function () {
        $("#preloaderNav").show();


        $.ajax({
            url: city.BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (countries) {
            $("#preloaderNav").hide();

            console.log(countries);
            $("#selectCountry").html("");
            $("#selectCountry").append("<option>Select a country</option>");

            for (var i = 0; i < countries.message.length; i++) {

                $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
            }

        });

    },

    getAllStates: function () {
        $("#preloaderNav").show();


        var countryID = $("#selectCountry").find(":selected").data("id");


        $.ajax({
            url: city.BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#selectState").html("");
            $("#selectState").append("<option>Select a state</option>");

            for (var i = 0; i < states.message.length; i++) {

                $("#selectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
            }

        });

    },

    createCity: function () {
        $("#preloaderNav").show();

        var cityName = $("#regionCity").val();
        var stateID = $("#selectState").find(":selected").data("id");

        var cityData = {city: cityName, state_id: stateID};

        $.ajax({
            url: city.BASE_URL + "city/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(cityData),
            contentType: "application/json"
        }).done(function (city) {
            $("#preloaderNav").hide();

            console.log(city);
            if (city.error_code === 1) {
                toastr.error(city.message);
            } else {
                toastr.success(city.message);
            }
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
        var cityName = $("#regionCity").val();
        var countryID = $("#selectCountry").find(":selected").data("id");
        var stateID = $("#selectState").find(":selected").data("id");

        // var selectedCountry = $("#selectCountry").val();


        console.log("Validate state Value");
        console.log(city.validateAlphabet(cityName));

        console.log("Country ID");
        console.log(countryID);

        var cityisValid = city.validateAlphabet(cityName);
        console.log("Validating city Value");
        console.log(cityisValid);


        if (stateID === undefined) {
            console.log("state is undefined");
            //  toastr.warning("Select a state");
            $("#selectStateContainer").addClass("error_input");

        } else {
            $("#selectStateContainer").removeClass("error_input");

        }

        if (countryID === undefined) {
            console.log("Country is undefined");
            // toastr.warning("Select a country");
            $("#selectCountryContainer").addClass("error_input");
        } else {
            $("#selectCountryContainer").removeClass("error_input");
        }

        if (!cityisValid) {
            //console.log("Valid Data");
            // toastr.warning("Invalid State Name");
            $("#regionCity").addClass("error_input");
        } else {
            $("#regionCity").removeClass("error_input");
        }


        if (countryID !== undefined && cityisValid && stateID !== undefined) {
            // console.log("Creating A state with valid date");
            city.createCity();
        }

    }


}

city.init();