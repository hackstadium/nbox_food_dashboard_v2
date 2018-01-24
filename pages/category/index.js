$(function () {
    console.log("category JS founded");


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
        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
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
        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
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
        var cityID = $("#categorySelectCity").find(":selected").data("id");
        var categoryData = {category: category, city_id: cityID}

        $.ajax({
            url: BASE_URL + "category/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(categoryData),
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);
        });
    });

});