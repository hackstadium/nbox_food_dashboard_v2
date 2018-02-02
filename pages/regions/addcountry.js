var country = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        $("#preloaderNav").hide();

        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};
        country.checkLogin();
    },


    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            // window.location.href = "../../pages/dashboard/index.html";
            console.log("logged In");
            // bundles.getAllbundles();
            //partners.getAllPartners();
            // city.getAllCountries();

        }
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
        var alphaExp = /^[a-zA-Z\s]*$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
        // /^[a-zA-Z\s]*$/
        // /^[a-zA-Z]+$/
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
            $("#regionCountry").removeClass("error_input");

        } else {
            //toastr.warning("Invalid Country Name");
            $("#regionCountry").addClass("error_input");
        }
    }

}

country.init();