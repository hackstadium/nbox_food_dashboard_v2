$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};


    checkLogin();

    function checkLogin() {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            console.log("logged In");
            getCountries();

        }
    }

    function getCountries() {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (countries) {
            console.log(countries);
            console.log(countries.message.length);
            $("#preloaderNav").hide();

            $("#restaurantSelectCountry").html("");
            $("#restaurantSelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                $("#restaurantSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }


    $("#restaurantSelectCountry").change(function () {
        console.log("select country clicked");
        var countryID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(countryID);
        getStates(countryID)

    });


    function getStates(countryID) {
        $("#preloaderNav").show();


        console.log("Getting States with ID");
        console.log(countryID);

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#restaurantSelectState").html("");
            $("#restaurantSelectState").append("<option>Select a state</option>");


            for (i = 0; i < states.message.length; i++) {
                $("#restaurantSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding countries");
            }
        })
    }


    $("#restaurantSelectState").change(function () {
        console.log("select state clicked");
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID for State");
        console.log(stateID);
        getCity(stateID);

    });


    function getCity(stateID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
            $("#preloaderNav").hide();

            console.log(cities);
            $("#restaurantSelectCity").html("");

            $("#restaurantSelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#restaurantSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }

    $('#addPartner').click(function () {
        $("#preloaderNav").show();


        console.log("Add partner btn clicked");
        var name = $("#restaurantInputName").val();
        var address = $("#restaurantInputAddress").val();
        var email = $("#restaurantInputEmail").val();
        var phone = $("#restaurantInputPhone").val();
        var countryID = $("#restaurantSelectCountry").find(":selected").data("id");
        var stateID = $("#restaurantSelectState").find(":selected").data("id");
        var cityID = $("#restaurantSelectCity").find(":selected").data("id");
        var commission = $("#restaurantInputCommission").val();

        console.log(name + " - " + address + " - " + email + " - " + phone + " - " + cityID + " - " + commission);


        var emailisValid = validateEmail(email);
        var phoneisValid = validateNumeric(phone);
        //var cityisValid = validateNum()
        var commissionisValid = validateNumeric(commission);

        if (name === "") {
            $("#restaurantInputName").addClass("error_input");
        } else {
            $("#restaurantInputName").removeClass("error_input");
        }

        if (countryID === undefined) {
            $("#restaurantSelectCountryContainer").addClass("error_input");
        } else {
            $("#restaurantSelectCountryContainer").removeClass("error_input");
        }

        if (stateID === undefined) {
            $("#restaurantSelectStateContainer").addClass("error_input");
        } else {
            $("#restaurantSelectStateContainer").removeClass("error_input");
        }

        if (cityID === undefined) {
            $("#restaurantSelectCityContainer").addClass("error_input");
        } else {
            $("#restaurantSelectCityContainer").removeClass("error_input");
        }

        if (address === "") {
            $("#restaurantInputAddress").addClass("error_input");
        } else {
            $("#restaurantInputAddress").removeClass("error_input");
        }

        if (!emailisValid) {
            $("#restaurantInputEmail").addClass("error_input");
        } else {
            $("#restaurantInputEmail").removeClass("error_input");
        }

        if (!phoneisValid) {
            $("#restaurantInputPhone").addClass("error_input");
        } else {
            $("#restaurantInputPhone").removeClass("error_input");
        }

        if (!commissionisValid) {
            $("#restaurantInputCommission").addClass("error_input");
        } else {
            $("#restaurantInputCommission").removeClass("error_input");

        }

        if (name !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined, address !== "" && emailisValid && phoneisValid && commissionisValid) {
            console.log("All Data Correct");
            addPartners(name, address, email, phone, cityID, commission);
        } else {
            toastr.warning("Incorrect Input Values");
        }

    });

    function addPartners(name, address, email, phone, cityID, commission) {

      document.getElementById("addPartner").disabled = true;
      document.getElementById("addPartner").style.backgroundColor = "black";
//debugger;
        var partnerData = {
            name: name,
            address: address,
            email: email,
            phone_number: phone,
            city_id: cityID,
            commission: commission
        };

        $.ajax({
            url: BASE_URL + "create/partner",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(partnerData),
            contentType: "application/json"
        }).done(function (partners) {
            $("#preloaderNav").hide();
            document.getElementById("addPartner").disabled = false;
            document.getElementById("addPartner").style.backgroundColor = "#86B77E";

            if (partners.error_code === 1) {
                toastr.error(partners.message);
            } else {
                toastr.success(partners.message);
            }

            console.log(partners);

        })

    }

    function validateAlphabet(inputtext) {
        var alphaExp = /^[a-zA-Z]+$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
    }


    function validateEmail(inputtext) {
        var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (inputtext.match(emailExp)) {
            return true;
        } else {
            return false;
        }
    }


    function validateNumeric(inputtext) {
        var numericExpression = /^[0-9]+$/;
        if (inputtext.match(numericExpression)) {
            return true;
        } else {
            return false;
        }
    }

});
