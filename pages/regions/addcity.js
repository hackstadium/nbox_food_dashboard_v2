var city = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        city.getAllCountries();
        //city.getAllStates();
    },

    getAllCountries: function () {

        // city.getAllStates("CountryID Here");

        $.ajax({
            url: city.BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (countries) {
            console.log(countries);
            $("#selectCountry").html("");
            $("#selectCountry").append("<option>Select a country</option>");

            for (var i = 0; i < countries.message.length; i++) {

                $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
            }

        });

    },

    getAllStates: function () {
        //console.log(text);

        //var countryID

        var countryID = $("#selectCountry").find(":selected").data("id");


        $.ajax({
            url: city.BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (states) {
            console.log(states);
            $("#selectState").html("");
            $("#selectState").append("<option>Select a state</option>");

            for (var i = 0; i < states.message.length; i++) {

                $("#selectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
            }

        });

    },

    createCity: function () {
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
            console.log(city);
        });


    }
}

city.init();