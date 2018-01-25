var country = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        $("#preloaderNav").hide();

        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"}

    },

    createCountry: function () {
        $("#preloaderNav").show();
// country.inputAlphabet();

        var countryName = $("#regionCountry").val();
        // country.inputAlphabet("123456");

        var countryData = {country: countryName};
        console.log(countryName);

        $.ajax({
            url: country.BASE_URL + "country/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (country) {
            console.log(country);
            $("#preloaderNav").hide();

            if (country.error_code === 1) {
                toastr.error(country.message);
            } else {
                toastr.success(country.message);
            }

        })
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
        var countryName = $("#regionCountry").val();
        //
        // console.log("Validate Input Value");
        // console.log(country.validateAlphabet(countryName));

        var countryisValid = country.validateAlphabet(countryName);
        // console.log("Validating Country Value");
        // console.log(countryisValid);

        if (countryisValid) {
           // console.log("country is valid");
            country.createCountry();
        } else {
            toastr.warning("Invalid Country Name");
        }
    }

}

country.init();