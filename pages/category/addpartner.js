$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getCountries();

    function getCountries() {
        $.ajax({
            url: BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (countries) {
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

        console.log("Getting States with ID");
        console.log(countryID);

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
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
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID for State");
        console.log(stateID);
        getCity(stateID);

    });


    function getCity(stateID) {
        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
            console.log(cities);

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
        console.log("getting Partners");
        $.ajax({
            url: BASE_URL + "partners?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);

            $("#categoryPartnerSelectPartner").html("");
            $("#categoryPartnerSelectPartner").append("<option>Select a partner</option>");


            for (i = 0; i < partners.message.length; i++) {
                $("#categoryPartnerSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }


    function getCategory(cityID) {
        $.ajax({
            url: BASE_URL + "categories?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);

            $("#categoryPartnerSelectCategory").html("");
            $("#categoryPartnerSelectCategory").append("<option>Select a category</option>");

            for (i = 0; i < categories.message.length; i++) {
                $("#categoryPartnerSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
                console.log("adding categories");
            }

        });
    }

    $("#addCategoryPartner").click(function () {

        var partnerID = $("#categoryPartnerSelectPartner").find(":selected").data("id");
        var categoryID = $("#categoryPartnerSelectCategory").find(":selected").data("id");
        var addCategoryPartnerData = {partner_id: partnerID, category_id: categoryID};

        $.ajax({
            url: BASE_URL + "category/add/partner",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(addCategoryPartnerData),
            contentType: "application/json"
        }).done(function (message) {
            console.log(message);
        })
    })


});
