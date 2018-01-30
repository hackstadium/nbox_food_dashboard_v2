var logout = {
    endSession:function () {
        sessionStorage.clear();
        window.location.href = "../../pages/login/login.html";
    }
}