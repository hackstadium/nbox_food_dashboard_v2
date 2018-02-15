var city = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};
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
            console.log("logged In");
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

    disableButton:function(buttonID){
    //  debugger;
      var button = document.getElementById(buttonID);
      button.disabled = true;
      button.style.backgroundColor = "black";
      //  button.style.backgroundColor = "black";
    },

    createCity: function () {
        $("#preloaderNav").show();
        city.disableButton("addCity");

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
          //  $("#addState").attr("disabled", "false");
            document.getElementById("addCity").disabled = false;
            document.getElementById("addCity").style.backgroundColor = "#86B77E";

            console.log(city);
            if (city.error_code === 1) {
                toastr.error(city.message);
            } else {
                toastr.success(city.message);
                window.location.href = "../../pages/regions/regions.html";
            }
        });


    },

    validateAlphabet: function (inputtext) {
        var alphaExp = /^[a-zA-Z\s]*$/;
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

        console.log("Validate state Value");
        console.log(city.validateAlphabet(cityName));

        console.log("Country ID");
        console.log(countryID);

        var cityisValid = city.validateAlphabet(cityName);
        console.log("Validating city Value");
        console.log(cityisValid);


        if (stateID === undefined) {
            console.log("state is undefined");
            $("#selectStateContainer").addClass("error_input");

        } else {
            $("#selectStateContainer").removeClass("error_input");

        }

        if (countryID === undefined) {
            console.log("Country is undefined");
            $("#selectCountryContainer").addClass("error_input");
        } else {
            $("#selectCountryContainer").removeClass("error_input");
        }

        if (!cityisValid) {
            $("#regionCity").addClass("error_input");
        } else {
            $("#regionCity").removeClass("error_input");
        }


        if (countryID !== undefined && cityisValid && stateID !== undefined) {
            city.createCity();
        }
    }

}

city.init();
