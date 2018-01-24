var country = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {

    },

    createCountry: function () {
        var countryName = $("#regionCountry").val();
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
        })
    }
}