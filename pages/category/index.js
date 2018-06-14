$(function () {
  console.log("category JS founded");


  const BASE_URL = "http://staging.nairabox.com/foodhub/";
  toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};


  checkLogin();

  function checkLogin() {
    console.log("Nav to dashboard page");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);

    if (isLoggedIn !== "true") {
      window.location.href = "../../pages/login/login.html";
      console.log("Not Logged In");
    } else {
      console.log("logged In");
      getCountries();

    }
  }


  function getCountries() {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "countries",
      type: "GET",
      crossDomain: true,
      contentType: "application/json",
      success: function(countries){
        $("#preloaderNav").hide();

        $("#categorySelectCountry").html("");
        $("#categorySelectCountry").append("<option>Select a country</option>");

        for (i = 0; i < countries.message.length; i++) {
          $("#categorySelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
          console.log("adding countries");
        }
      },
      error: function(countries){
        $("#preloaderNav").hide();
        console.log("failed to fetch countries");
        toastr.error("Failed to load Countries. Try Again.");

      }
    })
  }


  $("#categorySelectCountry").change(function () {
    console.log("select country clicked");
    var countryID = $(this).find(":selected").data("id");
    console.log("Selected ID");
    console.log(countryID);
    getStates(countryID)

  });


  function getStates(countryID) {
    $("#preloaderNav").show();



    $.ajax({
      url: BASE_URL + "states?country_id=" + countryID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json",
      success: function(states){
        $("#preloaderNav").hide();
        $("#categorySelectState").html("");
        $("#categorySelectState").append("<option>Select a state</option>");

        for (i = 0; i < states.message.length; i++) {
          $("#categorySelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
          console.log("adding countries");
        }
      },
      error: function(states){
        $("#preloaderNav").hide();
        toastr.error("Failed to load States. Try Again.");
        console.log(states.message);

      }
    })

  }


  $("#categorySelectState").change(function () {
    console.log("select state clicked");
    var stateID = $(this).find(":selected").data("id");
    console.log("Selected ID");
    console.log(stateID);
    getCity(stateID);

  });


  function getCity(stateID) {
    $("#preloaderNav").show();


    $.ajax({
      url: BASE_URL + "cities?state_id=" + stateID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json",
      success: function(cities){
        $("#preloaderNav").hide();
        $("#categorySelectCity").html("");
        $("#categorySelectCity").append("<option>Select a city</option>");

        for (i = 0; i < cities.message.length; i++) {
          $("#categorySelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
          console.log("adding cities");
        }
      },
      error: function(cities){
        $("#preloaderNav").hide();
        toastr.error("Failed to load Cities. Try Again.");
        console.log(cities.message);
      }
    })


    // $.ajax({
    //   url: BASE_URL + "cities?state_id=" + stateID,
    //   type: "GET",
    //   crossDomain: true,
    //   contentType: "application/json"
    // }).done(function (cities) {
    //   $("#preloaderNav").hide();
    //
    //   console.log(cities);
    //   $("#categorySelectCity").html("");
    //   $("#categorySelectCity").append("<option>Select a city</option>");
    //
    //   for (i = 0; i < cities.message.length; i++) {
    //     $("#categorySelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
    //     console.log("adding cities");
    //   }
    // })
  }


  $("#addCategory").click(function () {


    var category = $("#categoryName").val();
    var description = $("#categoryDescription").val();
    var countryID = $("#categorySelectCountry").find(":selected").data("id");
    var stateID = $("#categorySelectState").find(":selected").data("id");
    var cityID = $("#categorySelectCity").find(":selected").data("id");

    if (description === "") {
      $("#categoryDescription").addClass("error_input");
    } else {
      $("#categoryDescription").removeClass("error_input");
    }

    if (category === "") {
      $("#categoryName").addClass("error_input");
    } else {
      $("#categoryName").removeClass("error_input");
    }

    if (countryID === undefined) {
      $("#categorySelectCountryContainer").addClass("error_input");
    } else {
      $("#categorySelectCountryContainer").removeClass("error_input");
    }

    if (stateID === undefined) {
      $("#categorySelectStateContainer").addClass("error_input");
    } else {
      $("#categorySelectStateContainer").removeClass("error_input");
    }


    if (cityID === undefined) {
      $("#categorySelectCityContainer").addClass("error_input");
    } else {
      $("#categorySelectCityContainer").removeClass("error_input");
    }

    var categoryData = {category: category, city_id: cityID, description:description}

    if (category !== "" && description !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined) {

      console.log("All Data is correct");
      $("#preloaderNav").show();
      document.getElementById("addCategory").disabled = true;
      document.getElementById("addCategory").style.backgroundColor = "black";


      var fileSelect = document.getElementById('qqfile');
      var file = fileSelect.files[0];
      var fileName = $("#qqfile").val();

      var formData = new FormData();

      formData.append('image', file, file.name);
      formData.append("category", category);
      formData.append("city_id", cityID);
      formData.append("description", description);

    //  debugger;

      $.ajax({
        url: 'http://staging.nairabox.com/foodhub/category/create',
        data: formData,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {

          document.getElementById("addCategory").disabled = false;
          document.getElementById("addCategory").style.backgroundColor = "#86B77E";

          console.log(data);
          $("#preloaderNav").hide();

          if (data.error_code === 0) {
            toastr.success(data.message);
            document.getElementById("addCategory").disabled = false;
            document.getElementById("addCategory").style.backgroundColor = "#86B77E";
          } else {
            toastr.error(data.message);
          }

        },
        error: function(data){

          document.getElementById("addCategory").disabled = false;
          document.getElementById("addCategory").style.backgroundColor = "#86B77E";

          $("#preloaderNav").hide();
          toastr.error("Failed to create category. Try Again.");
          //console.log(states.message);

        }
      });

    }

  });


  function addPartnerToCategoryModal(category) {
    console.log("addPartnerToCategoryModal : Add partner to that category");

    var screensaverDeleteModalTemplate = "<div>"
    + "<h6 style='margin-bottom: 32px'>Do you want to add a partner to "+ category +" ?</h6>"
    + "</div>";


    alertify.confirm(" ", screensaverDeleteModalTemplate,
    function () {

      window.location.href = "../../pages/category/addpartner.html"

    }, function () {
      window.location.href = "../../pages/category/categories.html"


    }
  ).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();
}


function validateAlphabet(inputtext) {
  var alphaExp = /^[a-zA-Z]+$/;
  if (inputtext.match(alphaExp)) {
    return true;
  } else {
    return false;
  }
}

});
