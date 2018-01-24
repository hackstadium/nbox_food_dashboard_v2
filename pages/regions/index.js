$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";


    $("#addRegion").click(function () {

        var inputCountry = $('#regionCountry').val();
        var inputState = $('#regionState').val();
        var inputCity = $('#regionCity').val();

        console.log(inputCountry + " - " + inputState + " - " + inputCity);

        createCountry(inputCountry);


        function createCountry(country) {
            var countryData = {country: country};

            $.ajax({
                url: BASE_URL + "country/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(countryData),
                contentType: "application/json"
            }).done(function (countryResult) {
                console.log(countryResult);
                console.log(countryResult.error_code);

                if (countryResult.error_code === 0) {
                    console.log("New Country");
                    console.log(countryResult.country_id);
                    var state = inputState;
                    createState(countryResult.country_id, state);
                } else {
                    console.log("Duplicate Country. Use Existing id");
                    console.log(countryResult.id);
                    var state = inputState;
                    createState(countryResult.id, state);
                }


            });
        }

        function createState(countryID, state) {
            var stateData = {country_id: countryID, state: state};

            $.ajax({
                url: BASE_URL + "state/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(stateData),
                contentType: "application/json"
            }).done(function (stateResult) {

                console.log(stateResult);
                console.log(stateResult.error_code);

                if (stateResult.error_code === 0) {
                    console.log("New State");
                    console.log(stateResult.state_id);
                    var city = inputCity;
                    createCity(city, stateResult.state_id);
                } else {
                    console.log("Duplicate State. Use Existing id");
                    console.log(stateResult.id);
                    var city = inputCity;
                    createCity(city, stateResult.id);
                }
            });
        }

        function createCity(city, stateID) {
            var cityData = {city: city, state_id: stateID};


            $.ajax({
                url: BASE_URL + "city/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(cityData),
                contentType: "application/json"
            }).done(function (cityResult) {

                console.log(cityResult);
                console.log(cityResult.error_code);

                if (cityResult.error_code === 1) {
                    console.log("Duplicate Region Found");
                    console.log(cityResult.id);

                } else {
                    console.log("New City");
                    console.log(cityResult.city_id);

                }
            });


        }


    });

});

var createRegion = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        createRegion.regionWizard();

    },

    regionWizard: function () {

        console.log("regionWizard");
        $("#wizardRegions").steps({
            headerTag: "h1",
            bodyTag: "section",
            transitionEffect: "fade",
            autoFocus: true,

            labels: {
                next: "NEXT",
                finish: "ADD REGION",

            },

            onFinished: function (event, currentIndex) {
                console.log("finished stepper");

                createRegion.addRegion();
            },

        });
    },
    addRegion: function () {
        var inputCountry = $('#regionCountry').val();
        var inputState = $('#regionState').val();
        var inputCity = $('#regionCity').val();

        console.log(inputCountry + " - " + inputState + " - " + inputCity);

        createRegion.createCountry(inputCountry);

    },
    createCountry: function (country) {
        var countryData = {country: country};
        var inputState = $('#regionState').val();


        $.ajax({
            url: createRegion.BASE_URL + "country/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (countryResult) {
            console.log(countryResult);
            console.log(countryResult.error_code);

            if (countryResult.error_code === 0) {
                console.log("New Country");
                console.log(countryResult.country_id);
                var state = inputState;
                createRegion.createState(countryResult.country_id, state);
            } else {
                console.log("Duplicate Country. Use Existing id");
                console.log(countryResult.id);
                var state = inputState;
                createRegion.createState(countryResult.id, state);
            }


        });
    },

    createState: function (countryID, state) {
        console.log("creating State");

        var inputCity = $('#regionCity').val();

        var stateData = {country_id: countryID, state: state};

        $.ajax({
            url: createRegion.BASE_URL + "state/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(stateData),
            contentType: "application/json"
        }).done(function (stateResult) {

            console.log(stateResult);
            console.log(stateResult.error_code);

            if (stateResult.error_code === 0) {
                console.log("New State");
                console.log(stateResult.state_id);
                var city = inputCity;
                createRegion.createCity(city, stateResult.state_id);
            } else {
                console.log("Duplicate State. Use Existing id");
                console.log(stateResult.id);
                var city = inputCity;
                createRegion.createCity(city, stateResult.id);
            }
        });
    },

    createCity: function (city, stateID) {

        console.log("creating city");
        var cityData = {city: city, state_id: stateID};


        $.ajax({
            url: createRegion.BASE_URL + "city/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(cityData),
            contentType: "application/json"
        }).done(function (cityResult) {

            console.log(cityResult);
            console.log(cityResult.error_code);

            if (cityResult.error_code === 1) {
                console.log("Duplicate Region Found");
                console.log(cityResult.id);

            } else {
                console.log("New City");
                console.log(cityResult.city_id);

            }
        });
    },
    showNotification: function (message) {
        $.notify("I'm over here !");
    }


}

createRegion.init();