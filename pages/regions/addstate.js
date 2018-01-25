var state = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        state.getAllCountries();
        //$("#preloaderNav").show();
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"};

    },

    getAllCountries: function () {
        $("#preloaderNav").show();

        $.ajax({
            url: state.BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (countries) {
            $("#preloaderNav").hide();

            console.log(countries);
            $("#selectCountry").html("");
            $("#selectCountry").append("<option>Select a country</option>");

            for (var i = 0; i < countries.message.length; i++) {

                $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
            }

        });
    },

    createState: function () {
        $("#preloaderNav").show();

        var stateName = $("#regionState").val();
        var countryID = $("#selectCountry").find(":selected").data("id");
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
            $("#preloaderNav").hide();

            console.log(state);
            // state.notifySuccess();

            if (state.error_code === 1) {
                toastr.error(state.message);
            } else {
                toastr.success(state.message);
            }
        });
    },

    validateAlphabet: function (inputtext) {
        var alphaExp = /^[a-zA-Z]+$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
    },


    validateInput: function () {
        var stateName = $("#regionState").val();
        var countryID = $("#selectCountry").find(":selected").data("id");
        // var selectedCountry = $("#selectCountry").val();


        console.log("Validate state Value");
        console.log(state.validateAlphabet(stateName));

        console.log("Country ID");
        console.log(countryID);

        var stateisValid = state.validateAlphabet(stateName);
        console.log("Validating Country Value");
        console.log(stateisValid);

        if (countryID === undefined) {
            console.log("Country is undefined");
            toastr.warning("Select a country");

        }

        if (!stateisValid) {
            //console.log("Valid Data");
            toastr.warning("Invalid State Name");
        }


        if (countryID !== undefined && stateisValid) {
            // console.log("Creating A state with valid date");
            state.createState();
        }

    }

}

state.init();