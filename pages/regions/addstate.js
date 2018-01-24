var state = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        state.getAllCountries();
    },

    getAllCountries: function () {
        $.ajax({
            url: state.BASE_URL + "countries",
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

            //$("#selectCountry").append();
        });
    },

    createState: function () {
        var stateName = $("#regionState").val();
        var countryID = $("#selectCountry").find(":selected").data("id");
        // var stateName = $("#regionCountry").val();
        var stateData = {country_id: countryID, state: stateName};
        console.log("state");
        console.log(stateName);
        console.log("countryID");
        console.log(countryID);

        $.ajax({
            url: state.BASE_URL + "state/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(stateData),
            contentType: "application/json"
        }).done(function (state) {
            console.log(state)
        });
    }

}

state.init();