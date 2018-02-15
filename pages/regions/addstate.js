var state = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",

    init: function () {
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};
        state.checkLogin();
    },


    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            console.log("logged In");
            state.getAllCountries();

        }
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

    disableButton:function(buttonID){
    //  debugger;
      var button = document.getElementById(buttonID);
      button.disabled = true;
      button.style.backgroundColor = "black";
      //  button.style.backgroundColor = "black";
    },

    createState: function () {
        $("#preloaderNav").show();
        state.disableButton("addState");

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
          //  $("#addState").attr("disabled", "false");
            document.getElementById("addState").disabled = false;
            document.getElementById("addState").style.backgroundColor = "#86B77E";

            console.log(state);

            if (state.error_code === 1) {
                toastr.error(state.message);
            } else {
                toastr.success(state.message);

                //ADD CITY DIALOG
                console.log("addMoreMenuDialog : More menus called");

                var screensaverDeleteModalTemplate = "<div>"
                + "<h6 style='margin-bottom: 32px'>Do you want to add a city to " + stateName + " ?</h6>"
                + "</div>";


                alertify.confirm(" ", screensaverDeleteModalTemplate,
                function () {

                  window.location.href = "../../pages/regions/addcity.html"

                }, function () {
                //  window.location.href = "../../pages/bundles/index.html"


                }
              ).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();

            }
        });
    },

    validateAlphabet: function (inputtext) {
        var alphaExp = /^[a-zA-Z\s]*$/;
        if (inputtext.match(alphaExp)) {
            return true;
        } else {
            return false;
        }
    },


    validateInput: function () {
        var stateName = $("#regionState").val();
        var countryID = $("#selectCountry").find(":selected").data("id");

        console.log("Validate state Value");
        console.log(state.validateAlphabet(stateName));

        console.log("Country ID");
        console.log(countryID);

        var stateisValid = state.validateAlphabet(stateName);
        console.log("Validating Country Value");
        console.log(stateisValid);

        if (countryID === undefined) {
            $("#selectCountryContainer").addClass("error_input");

            console.log("Country is undefined");

        } else {
            $("#selectCountryContainer").removeClass("error_input");

        }

        if (!stateisValid) {
            $("#regionState").addClass("error_input");

        } else {
            $("#regionState").removeClass("error_input");
        }


        if (countryID !== undefined && stateisValid) {
            state.createState();
        }

    },

    addCityDialog:function (state) {
        console.log("addCityDialog : Add City called");

        var screensaverDeleteModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Do you want to add a city to " + state +" ?</h6>"
            + "</div>";


        alertify.confirm(" ", screensaverDeleteModalTemplate,
            function () {

                window.location.href = "../../pages/regions/addcity.html"

            }, function () {
                window.location.href = "../../pages/regions/regions.html"


            }
        ).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();
    }


}

state.init();
