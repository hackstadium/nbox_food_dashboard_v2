var regions = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        regions.getAllRegions();

    },

    getAllRegions: function () {
        console.log("Getting all regions");
        //regions.showNotifcation("Loading Message");
        $.ajax({
            url: regions.BASE_URL + "cities/all",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (regions) {
            console.log(regions);
            console.log(regions.message[0].country);
            console.log(regions.message[0].state);
            console.log(regions.message[0].city);


            for (var i = 0; i < regions.message.length; i++) {

                // var bundleID = 92777711;

                $("#regionsTable").append("<tr>"
                    + "<td>" + regions.message[i].country + "</td>"
                    + "<td>" + regions.message[i].state + "</td>"
                    + "<td>" + regions.message[i].city + "</td>"
                    + "<td><button class='btn_table' onclick='regions.openModalEditRegionDetails(\"" + regions.message[i]._id + "\",\"" + regions.message[i].city + "\",\"" + regions.message[i].state_id + "\",\"" + regions.message[i].state + "\",\"" + regions.message[i].country_id + "\",\"" + regions.message[i].country + "\" )'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },

    openModalEditRegionDetails: function (cityID, city, stateID, state, countryID, country) {
        console.log("City ID");
        console.log(cityID);
        console.log(city);
        console.log(stateID);
        console.log(state);
        console.log(countryID);
        console.log(country);


        var RegionEditDetaillsTemplate = "<div>"
            + "<div class='verticalInput'><strong>Country :  </strong><input id='modalRegionsInputCountry' type='text' value='" + country + "'></div>"
            + "<div class='verticalInput'><strong>State :  </strong><input id='modalRegionsInputState' type='text' value='" + state + "'></div>"
            + "<div class='verticalInput'><strong>City :  </strong><input id='modalRegionsInputCity' type='text' value='" + city + "'></div>"
            + "</div>";


        alertify.confirm('Edit Region', RegionEditDetaillsTemplate,
            function () {
                //alertify.success('UPDATE');
                console.log("Region Modal ok clicked");
                regions.updateRegion(cityID, stateID, countryID);
            },
            function () {

            }
        ).set({transition: 'zoom', label: ' UPDATE '}).show();


    },


    updateRegion: function (cityID, stateID, countryID) {
        console.log("Updateing Regions with ID");
        console.log(cityID);
        console.log(stateID);
        console.log(countryID);
        var updateCity = $("#modalRegionsInputCity").val();
        var updateState = $("#modalRegionsInputState").val();
        var updateCountry = $("#modalRegionsInputCountry").val();

        var cityData = {city_id: cityID, city: updateCity};
        var stateData = {state_id:stateID, state:updateState};
        var countryData = {country_id:countryID, country:updateCountry};

        $.ajax({
            url: regions.BASE_URL + "city/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(cityData),
            contentType: "application/json"
        }).done(function (city) {
            console.log(city);
            $.ajax({
                url: regions.BASE_URL + "state/update",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(stateData),
                contentType: "application/json"
            }).done(function (state) {
                console.log(state);
                $.ajax({
                    url: regions.BASE_URL + "country/update",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(countryData),
                    contentType: "application/json"
                }).done(function (country) {
                   console.log(country); 
                });
            });
        });
    }



}

regions.init();