var dashboard = {
    init: function () {
        dashboard.checkLogin();
        $("#preloaderNav").hide();
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
        }
    },

    logout: function () {
        sessionStorage.clear();
        window.location.href = "../../pages/login/login.html";
    }
};

dashboard.init();