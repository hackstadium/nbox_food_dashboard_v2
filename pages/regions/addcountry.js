var country = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init: function () {
    $("#preloaderNav").hide();

    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};
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
      console.log("logged In");
    }
  },

  enableButton:function(buttonID){
    var button = document.getElementById(buttonID);
    button.disabled = false;
    button.style.backgroundColor = "#86B77E";
  },

  disableButton:function(buttonID){
    var button = document.getElementById(buttonID);
    button.disabled = true;
    button.style.backgroundColor = "black";
    //  button.style.backgroundColor = "black";
  },

  createCountry: function () {
    $("#preloaderNav").show();
    country.disableButton("addCountry");

    var countryName = $("#regionCountry").val();

    var countryData = {country: countryName};
    console.log(countryName);
  //  debugger;
    $.ajax({
      url: country.BASE_URL + "country/create",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(countryData),
      contentType: "application/json"
    }).done(function (country) {
      console.log(country);
      $("#preloaderNav").hide();
    //  $("#addCountry").attr
    //  country.enableButton("addCountry");
  //  $("#addCountry").attr("disabled", "false");
    document.getElementById("addCountry").disabled = false;
    document.getElementById("addCountry").style.backgroundColor = "#86B77E";


      if (country.error_code === 1) {
        toastr.error(country.message);
        //country.enableButton("addCountry");

      } else {
        toastr.success(country.message);
        //ADD STATE DIALOG
        console.log("addMoreMenuDialog : More menus called");

        var screensaverDeleteModalTemplate = "<div>"
        + "<h6 style='margin-bottom: 32px'>Do you want to add a state to " + countryName+ " ?</h6>"
        + "</div>";


        alertify.confirm(" ", screensaverDeleteModalTemplate,
        function () {

          window.location.href = "../../pages/regions/addstate.html"

        }, function () {
          //  window.location.href = "../../pages/bundles/index.html"
        }
      ).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();

    }

  })
},

addedCountryPrompt:function(){
  console.log("addedCountryPrompt");
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

  var countryisValid = country.validateAlphabet(countryName);

  if (countryisValid && countryName !== "") {
    country.createCountry();
    $("#regionCountry").removeClass("error_input");

  } else {
    $("#regionCountry").addClass("error_input");
  }
}

}

country.init();
