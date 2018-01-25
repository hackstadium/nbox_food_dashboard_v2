var country = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        $("#preloaderNav").hide();

        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"}

    },

    createCountry: function () {
        $("#preloaderNav").show();


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
            $("#preloaderNav").hide();

            if(country.error_code === 1){
                toastr.error(country.message);
            }else{
                toastr.success(country.message);
            }

        })
    }
    // showNotificationSuccess: function () {
    //     toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "50000000"}
    //     toastr.success("message");
    // },
    //
    // showNotificationFailed: function () {
    //     toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "50000000"}
    //     toastr.error("helloe");
    // },
    //
    // showNotificationInfo: function (message) {
    //     toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "50000000"}
    //     toastr.info(message);
    // }


}

country.init();