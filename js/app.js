$(function () {
    console.log("app js found!");
    console.log("app js ready!");

    $("#addMenu").click(function () {
        // alert( "Handler for .click() called." );
        console.log($('#inputMenu').val())

    });

    $("#addOptions").click(function () {
        // alert( "Handler for .click() called." );
        console.log($('#inputOptions').val())
        $(".inner").append("<p>Test</p>");

    });

    // $("#addRegion").click(function () {
    //    console.log("Adding Region");
    // });

    $("#addRegion").click(function () {
        var countryData = {country: "Australia"};

        // console.log(data);

        function createCountry(country) {

        }

        function createState(countryID, state) {

        }

        function createCity(city,stateID) {

        }

        $.ajax({
            url: "http://staging.nairabox.com/foodhub/country/create",
            type: "POST",
            data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (countryResult) {
            console.log(countryResult);
            console.log(countryResult.country_id);

            var countryID = toString(countryResult.country_id);
            var stateData = {country_id: countryID, state: "Delta"};

            $.ajax({
                url: "http://staging.nairabox.com/foodhub/state/create",
                type: "POST",
                data: JSON.stringify(stateData),
                contentType: "application/json"
            }).done(function (stateResult) {
                console.log(stateResult);
                console.log(stateResult.state_id);

                var stateID = toString(stateResult.state_id);
                var cityData = {city: "Gbagada", state_id: stateID}

                $.ajax({
                    url: "http://staging.nairabox.com/foodhub/city/create",
                    type: "POST",
                    data: JSON.stringify(cityData),
                    contentType: "application/json"

                }).done(function (cityResult) {
                    console.log(cityResult);
                    console.log(cityResult.city_id)
                })
            });

        });
    });


});