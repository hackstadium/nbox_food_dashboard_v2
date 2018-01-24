$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getCountries();

    function getCountries() {
        $.ajax({
            url: BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (countries) {
            console.log(countries);
            // console.log(countries.message)
            console.log(countries.message.length);


            $("#restaurantSelectCountry").html("");
            $("#restaurantSelectCountry").append("<option>Select a country</option>");

            for (i = 0; i < countries.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#restaurantSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }



    $("#restaurantSelectCountry").change(function () {
        console.log("select country clicked");
        //var countryID =
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
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (states) {
            console.log(states);
            $("#restaurantSelectState").html("");
            $("#restaurantSelectState").append("<option>Select a state</option>");


            for (i = 0; i < states.message.length; i++) {
                //console.log(countries.message[i]._id);
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
        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (cities) {
            console.log(cities);
            $("#restaurantSelectCity").html("");

            $("#restaurantSelectCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#restaurantSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }



    // $("#restaurantSelectCity").change(function () {
    //     console.log("select city clicked");
    //     //var countryID =
    //     var cityID = $(this).find(":selected").data("id");
    //     console.log("Selected ID");
    //     console.log(cityID);
    //     getCategories(cityID);
    //
    // });
    //
    // function getCategories(cityID) {
    //     $.ajax({
    //         url: BASE_URL + "categories?city_id=" + cityID,
    //         type: "GET",
    //         crossDomain: true,
    //         // data: JSON.stringify(countryData),
    //         contentType: "application/json"
    //     }).done(function (categories) {
    //         console.log("categories");
    //         console.log(categories);
    //     });
    //
    // }



    $('#addPartner').click(function () {

        console.log("Add partner btn clicked");
        var name = $("#restaurantInputName").val();
        var address = $("#restaurantInputAddress").val();
        var email = $("#restaurantInputEmail").val();
        var phone = $("#restaurantInputPhone").val();
        var cityID = $("#restaurantSelectCity").find(":selected").data("id");
        var commission = $("#restaurantInputCommission").val();


        console.log(name + " - " + address + " - " + email + " - " + phone + " - " + cityID + " - " +commission);

        addPartners(name,address,email,phone,cityID,commission);


    });

    function addPartners(name,address,email,phone,cityID,commission) {
        var partnerData = {name:name,address:address,email:email,phone_number:phone,city_id:cityID,commission:commission};

        $.ajax({
            url: BASE_URL + "create/partner",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(partnerData),
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);

        })

    }

});