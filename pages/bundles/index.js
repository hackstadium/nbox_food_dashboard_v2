$(function () {
    console.log("menu js found");
    console.log("menu js ready");

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
            //  console.log(countries.message.length);

            for (i = 0; i < countries.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }


    $("#selectCountry").change(function () {
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
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (states) {
            console.log(states);
            $("#selectState").html("");

            for (i = 0; i < states.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#selectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#selectState").change(function () {
        console.log("select state clicked");
        //var countryID =
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
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (cities) {
            console.log(cities);
            $("#selectCity").html("");

            for (i = 0; i < cities.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#selectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }

    $("#selectCity").click(function () {
        console.log("selelct city clicked");
        var cityID = $(this).find(":selected").data("id");
        console.log(cityID);
        getPartner(cityID);
        getCategory(cityID);
    });


    function getPartner(cityID) {
        $.ajax({
            url: BASE_URL + "partners?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);
            $("#bundlesSelectPartner").html("");

            for (i = 0; i < partners.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#bundlesSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }

    function getCategory(cityID) {
        $.ajax({
            url: BASE_URL + "categories?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);

            $("#bundlesSelectCategory").html("");

            for (i = 0; i < categories.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#bundlesSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
                console.log("adding categories");
            }

        });
    }


    $("#addBundle").click(function () {

        // 'name', 'price', 'category_id', 'description'
        var name = $("#bundleInputName").val();
        var price = $("#bundleInputPrice").val();
        var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
        var description = "description here";

        console.log(name + " - " + price + " - " + categoryID + " - " + description);

        addBundles(name, price, categoryID, description);

    });


    function addBundles(name, price, categoryID, description) {
        var bundleData = {name: name, price: price, category_id: categoryID, description: description}

        $.ajax({
            url: BASE_URL + "create/bundle",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundles) {
            console.log(bundles);
        })
    }

});