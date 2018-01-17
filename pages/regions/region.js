$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";


    $("#addRegion").click(function () {
        // var countryData = {country: "Uganda"};

        var inputCountry = $('#regionCountry').val();
        var inputState = $('#regionState').val();
        var inputCity = $('#regionCity').val();

        console.log(inputCountry + " - " + inputState + " - " + inputCity);

        createCountry(inputCountry);

        // console.log(data);

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

                if (countryResult.error_code === 0){
                    console.log("New Country");
                    console.log(countryResult.country_id);
                    var state = inputState;
                    createState(countryResult.country_id,state);
                }else {
                    console.log("Duplicate Country. Use Existing id");
                    console.log(countryResult.id);
                    var state = inputState;
                    createState(countryResult.id,state);
                }



            });
        }

        function createState(countryID, state) {
            var stateData = {country_id: countryID, state:state};

            $.ajax({
                url: BASE_URL + "state/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(stateData),
                contentType: "application/json"
            }).done(function (stateResult) {
                // console.log(stateResult);
                // console.log(stateResult.state_id);
                // var city = inputCity;
                // createCity(city,stateResult.state_id);


                console.log(stateResult);
                console.log(stateResult.error_code);

                if (stateResult.error_code === 0){
                    console.log("New State");
                    console.log(stateResult.state_id);
                    var city = inputCity;
                    createCity(city, stateResult.state_id);
                }else {
                    console.log("Duplicate State. Use Existing id");
                    console.log(stateResult.id);
                    var city = inputCity;
                    createCity(city, stateResult.id);
                }
            });
        }

        function createCity(city, stateID) {
            var cityData = {city:city, state_id:stateID};


            $.ajax({
                url: BASE_URL + "city/create",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(cityData),
                contentType: "application/json"
            }).done(function (cityResult) {
                // console.log(cityResult);
                // console.log(cityResult.city_id);
                // //var city = "Onitsha"
                // // createCity(city,stateResult.state_id);


                console.log(cityResult);
                console.log(cityResult.error_code);

                if (cityResult.error_code === 1){
                    console.log("Duplicate Region Found");
                    console.log(cityResult.id);

                }else {
                    console.log("New City");
                    console.log(cityResult.city_id);

                }
            });


        }

        // $.ajax({
        //     url:  BASE_URL + "country/create",
        //     type: "POST",
        //     crossDomain:true,
        //     data: JSON.stringify(countryData),
        //     contentType: "application/json"
        // }).done(function (countryResult) {
        //     console.log(countryResult);
        //     console.log(countryResult.country_id);
        //
        //     var countryID = toString(countryResult.country_id);
        //     var stateData = {country_id: countryID, state: "Yobe"};
        //
        //     $.ajax({
        //         url: BASE_URL + "state/create",
        //         type: "POST",
        //         crossDomain:true,
        //         data: JSON.stringify(stateData),
        //         contentType: "application/json"
        //     }).done(function (stateResult) {
        //         console.log(stateResult);
        //         console.log(stateResult.state_id);
        //
        //         var stateID = toString(stateResult.state_id);
        //         var cityData = {city: "Victoria Island", state_id: stateID}
        //
        //         $.ajax({
        //             url: BASE_URL + "city/create",
        //             type: "POST",
        //             crossDomain:true,
        //             data: JSON.stringify(cityData),
        //             contentType: "application/json"
        //
        //         }).done(function (cityResult) {
        //             console.log(cityResult);
        //             console.log(cityResult.city_id)
        //         })
        //     });
        //
        // });
    });

});