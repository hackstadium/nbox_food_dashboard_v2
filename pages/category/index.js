$(function () {
    console.log("category JS founded");


    const BASE_URL = "http://staging.nairabox.com/foodhub/";
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};


    // getCountries();
    checkLogin();

    function checkLogin() {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            // window.location.href = "../../pages/dashboard/index.html";
            console.log("logged In");
            //bundles.getAllbundles();
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
            $("#preloaderNav").hide();

            console.log(countries);
            console.log(countries.message.length);

            $("#categorySelectCountry").html("");
            $("#categorySelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                $("#categorySelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }


    $("#categorySelectCountry").change(function () {
        console.log("select country clicked");
        //var countryID =
        var countryID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(countryID);
        getStates(countryID)

    });


    function getStates(countryID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#categorySelectState").html("");
            $("#categorySelectState").append("<option>Select a state</option>");

            for (i = 0; i < states.message.length; i++) {
                $("#categorySelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding countries");
            }
        })
    }


    $("#categorySelectState").change(function () {
        console.log("select state clicked");
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID");
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
            $("#categorySelectCity").html("");
            $("#categorySelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#categorySelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }


    $("#addCategory").click(function () {


        var category = $("#categoryName").val();
        var countryID = $("#categorySelectCountry").find(":selected").data("id");
        var stateID = $("#categorySelectState").find(":selected").data("id");
        var cityID = $("#categorySelectCity").find(":selected").data("id");

        if (category === "") {
            $("#categoryName").addClass("error_input");
        } else {
            $("#categoryName").removeClass("error_input");
        }


        if (countryID === undefined) {
            $("#categorySelectCountryContainer").addClass("error_input");
        } else {
            $("#categorySelectCountryContainer").removeClass("error_input");
        }


        if (stateID === undefined) {
            $("#categorySelectStateContainer").addClass("error_input");
        } else {
            $("#categorySelectStateContainer").removeClass("error_input");
        }


        if (cityID === undefined) {
            $("#categorySelectCityContainer").addClass("error_input");
        } else {
            $("#categorySelectCityContainer").removeClass("error_input");
        }

        var categoryData = {category: category, city_id: cityID}

        if (category !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined) {
            console.log("All Data is correct");
            $("#preloaderNav").show();


            $.ajax({
                url: BASE_URL + "category/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(categoryData),
                contentType: "application/json"
            }).done(function (categories) {
                $("#preloaderNav").hide();

                console.log(categories);

                if (categories.error_code === 1) {
                    toastr.error(categories.message);
                } else {
                    toastr.success(categories.message);
                    addPartnerToCategoryModal(category);
                }
            });


        } else {
            toastr.warning("Invalid Input Values");
        }

    });


    function addPartnerToCategoryModal(category) {
        console.log("addPartnerToCategoryModal : Add partner to that category");

        var screensaverDeleteModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Do you want to add a partner to "+ category +" ?</h6>"
            + "</div>";


        alertify.confirm(" ", screensaverDeleteModalTemplate,
            function () {

                window.location.href = "../../pages/category/addpartner.html"

            }, function () {
                window.location.href = "../../pages/category/categories.html"


            }
        ).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();
    }


    function validateAlphabet(inputtext) {
        var alphaExp = /^[a-zA-Z]+$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
    }

});