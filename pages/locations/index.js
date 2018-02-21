var createLocation = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init: function () {
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};
    // createLocation.getCountries();
    createLocation.checkLogin();
    createLocation.timePicker();
  },

  timePicker:function(){
    console.log("time called");
    // $(document).ready(function(){
      $('#timepicker').mdtimepicker({
        hourPadding: false ,
        theme: 'green'
      });

  //     $("#timepicker").click(function(){
  //     alert("The paragraph was clicked.");
  // });

    // });

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
      createLocation.getCountries();

    }
  },

  getCountries: function () {
    $("#preloaderNav").show();

    $.ajax({
      url: createLocation.BASE_URL + "countries",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (countries) {
      $("#preloaderNav").hide();

      console.log(countries);
      console.log(countries.message.length);

      $("#locationSelectCountry").html("");
      $("#locationSelectCountry").append("<option>Select a country</option>");

      for (i = 0; i < countries.message.length; i++) {
        $("#locationSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
        console.log("adding countries");
      }
    });
  },

  getStates: function () {
    console.log("getting states");

    var countryID = $("#locationSelectCountry").find(":selected").data("id");

    $("#preloaderNav").show();


    console.log("Getting States with ID");
    console.log(countryID);

    $.ajax({
      url: createLocation.BASE_URL + "states?country_id=" + countryID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (states) {
      $("#preloaderNav").hide();

      console.log(states);

      $("#locationSelectState").html("");
      $("#locationSelectState").append("<option>Select a state</option>");


      for (i = 0; i < states.message.length; i++) {
        $("#locationSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
        console.log("adding countries");
      }
    })

  },

  getCities: function () {
    $("#preloaderNav").show();

    var stateID = $("#locationSelectState").find(":selected").data("id");


    $.ajax({
      url: createLocation.BASE_URL + "cities?state_id=" + stateID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (cities) {
      console.log(cities);
      $("#preloaderNav").hide();

      $("#locationSelectCity").html("");
      $("#locationSelectCity").append("<option>Select a city</option>");

      for (i = 0; i < cities.message.length; i++) {
        $("#locationSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
        console.log("adding cities");
      }
    })

  },

  addLocation: function (name, cityID, address,cutoff) {
    console.log("adding location");
    console.log(name);
    console.log(cityID);
    console.log(address);
    $("#preloaderNav").show();
    document.getElementById("addLocation").disabled = true;
    document.getElementById("addLocation").style.backgroundColor = "black";

//debugger;
    var locationData = {location: name, city_id: cityID, address: address, cut_off_time:cutoff};

    $.ajax({
      url: createLocation.BASE_URL + "location/create",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(locationData),
      contentType: "application/json"
    }).done(function (location) {
      $("#preloaderNav").hide();
      document.getElementById("addLocation").disabled = false;
      document.getElementById("addLocation").style.backgroundColor = "#86B77E";

      console.log(location);
      if (location.error_code === 1) {
        toastr.error(location.message);
      } else {
        toastr.success(location.message);
      }
    });
  },

  validateInput: function () {
    console.log("Input validated");

    var name = $("#locationName").val();
    var address = $("#locationAddress").val();
    var countryID = $("#locationSelectCountry").find(":selected").data("id");
    var stateID = $("#locationSelectState").find(":selected").data("id");
    var cityID = $("#locationSelectCity").find(":selected").data("id");
    var cutoff = $("#timepicker").val();

    if(cutoff === ""){
      $("#timepicker").addClass("error_input");
    }else{
      $("#timepicker").removeClass("error_input");
    }
    //if ()

    if (name === "") {
      $("#locationName").addClass("error_input");
    } else {
      $("#locationName").removeClass("error_input");
    }

    if (address === "") {
      $("#locationAddress").addClass("error_input");
    } else {
      $("#locationAddress").removeClass("error_input");
    }

    if (countryID === undefined) {
      $("#locationSelectCountryContainer").addClass("error_input");
    } else {
      $("#locationSelectCountryContainer").removeClass("error_input");
    }

    if (stateID === undefined) {
      $("#locationSelectStateContainer").addClass("error_input");
    } else {
      $("#locationSelectStateContainer").removeClass("error_input");
    }

    if (cityID === undefined) {
      $("#locationSelectCityContainer").addClass("error_input");
    } else {
      $("#locationSelectCityContainer").removeClass("error_input");
    }

    if (name !== "" && address !== "" && cutoff !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined) {
      console.log("All Data is correct");
      createLocation.addLocation(name, cityID, address, cutoff);
    } else {
      toastr.warning("Invalid Input values");
    }
  }
}

createLocation.init();
