var login = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        // login.login()
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};

    },

    login: function () {

        toastr.info("Signing In");

        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();


        var loginData = {user_name: username, password: password};

        $.ajax({
            url: login.BASE_URL + "signin",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(loginData),
            contentType: "application/json"
        }).done(function (login) {
            console.log(login);
            if (login.message === true) {
                toastr.success("Login Successfull");
                sessionStorage.setItem("isLoggedIn", "true");
                window.location.href = "../../pages/dashboard/index.html";
            } else {
                toastr.error("Incorrect Login Details");
            }

        });
    }
}

login.init();