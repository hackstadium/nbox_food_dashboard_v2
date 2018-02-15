$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};

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
            $("#preloaderNav").hide();

            console.log(countries);
            console.log(countries.message.length);

            $("#categoryPartnerSelectCountry").html("");
            $("#categoryPartnerSelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                $("#categoryPartnerSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }


    $("#categoryPartnerSelectCountry").change(function () {
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

            $("#categoryPartnerSelectState").html("");
            $("#categoryPartnerSelectState").append("<option>Select a state</option>");


            for (i = 0; i < states.message.length; i++) {
                $("#categoryPartnerSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding countries");
            }
        })
    }


    $("#categoryPartnerSelectState").change(function () {
        console.log("select state clicked");
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
            console.log(cities);
            $("#preloaderNav").hide();

            $("#categoryPartnerSelectCity").html("");
            $("#categoryPartnerSelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#categoryPartnerSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }


    $("#categoryPartnerSelectCity").click(function () {
        console.log("selelct city clicked");
        var cityID = $(this).find(":selected").data("id");
        console.log(cityID);
        getPartner(cityID);
        getCategory(cityID);
    });


    function getPartner(cityID) {
        $("#preloaderNav").show();

        console.log("getting Partners");
        $.ajax({
            url: BASE_URL + "partners?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);
            $("#preloaderNav").hide();

            $("#categoryPartnerSelectPartner").html("");
            $("#categoryPartnerSelectPartner").append("<option>Select a partner</option>");


            for (i = 0; i < partners.message.length; i++) {
                $("#categoryPartnerSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }


    function getCategory(cityID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "categories?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);
            $("#preloaderNav").hide();

            $("#categoryPartnerSelectCategory").html("");
            $("#categoryPartnerSelectCategory").append("<option>Select a category</option>");

            for (i = 0; i < categories.message.length; i++) {
                $("#categoryPartnerSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
                console.log("adding categories");
            }

        });
    }

    $("#addCategoryPartner").click(function () {

        var countryID = $("#categoryPartnerSelectCountry").find(":selected").data("id");
        var stateID = $("#categoryPartnerSelectState").find(":selected").data("id");
        var cityID = $("#categoryPartnerSelectCity").find(":selected").data("id");
        var partnerID = $("#categoryPartnerSelectPartner").find(":selected").data("id");
        var categoryID = $("#categoryPartnerSelectCategory").find(":selected").data("id");

        if (countryID === undefined) {
            $("#categoryPartnerSelectCountryContainer").addClass("error_input");
        } else {
            $("#categoryPartnerSelectCountryContainer").removeClass("error_input");
        }

        if (stateID === undefined) {
            $("#categoryPartnerSelectStateContainer").addClass("error_input");
        } else {
            $("#categoryPartnerSelectStateContainer").removeClass("error_input");
        }

        if (cityID === undefined) {
            $("#categoryPartnerSelectCityContainer").addClass("error_input");
        } else {
            $("#categoryPartnerSelectCityContainer").removeClass("error_input");
        }

        if (partnerID === undefined) {
            $("#categoryPartnerSelectPartnerContainer").addClass("error_input");
        } else {
            $("#categoryPartnerSelectPartnerContainer").removeClass("error_input");
        }

        if (categoryID === undefined) {
            $("#categoryPartnerSelectCategoryContainer").addClass("error_input");
        } else {
            $("#categoryPartnerSelectCategoryContainer").removeClass("error_input");
        }


        var addCategoryPartnerData = {partner_id: partnerID, category_id: categoryID};

        if (countryID !== undefined && stateID !== undefined && cityID !== undefined && partnerID !== undefined && categoryID !== undefined) {
            console.log("All Data is correct");

            $("#preloaderNav").show();
            document.getElementById("addCategoryPartner").disabled = true;
            document.getElementById("addCategoryPartner").style.backgroundColor = "black";
//debugger;
            $.ajax({
                url: BASE_URL + "category/add/partner",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(addCategoryPartnerData),
                contentType: "application/json"
            }).done(function (message) {
                $("#preloaderNav").hide();
                document.getElementById("addCategoryPartner").disabled = false;
                document.getElementById("addCategoryPartner").style.backgroundColor = "#86B77E";

                console.log(message);
                if (message.error_code === 1) {
                    toastr.error(message.message);
                } else {
                    toastr.success(message.message);
                }
            });
        } else {
            toastr.warning("Invalid Input Value");
        }

    });

});
