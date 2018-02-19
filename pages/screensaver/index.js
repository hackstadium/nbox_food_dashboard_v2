$(function () {
  const BASE_URL = "http://staging.nairabox.com/foodhub/";
  toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};


  getScreensaverCountry();


  function getScreensaverCountry() {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "countries",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (countries) {
      $("#preloaderNav").hide();

      console.log(countries);

      $("#screensaverSelectCountry").html("");
      $("#screensaverSelectCountry").append("<option>Select a country</option>");

      for (i = 0; i < countries.message.length; i++) {
        $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");

        console.log("adding countries");
      }
    });
  }


  $("#screensaverSelectCountry").change(function () {
    console.log("select country clicked");
    var countryID = $(this).find(":selected").data("id");
    console.log("Selected ID");
    console.log(countryID);
    getScreensaverState(countryID)

  });


  function getScreensaverState(countryID) {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "states?country_id=" + countryID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (states) {
      $("#preloaderNav").hide();

      console.log(states);
      $("#screensaverSelectState").html("");
      $("#screensaverSelectState").append("<option>Select a state</option>");

      for (i = 0; i < states.message.length; i++) {
        $("#screensaverSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
        console.log("adding states");
      }
    })
  }


  $("#screensaverSelectState").change(function () {
    console.log("select country clicked");
    var stateID = $(this).find(":selected").data("id");
    console.log("Selected ID");
    console.log(stateID);
    getScreensaverCity(stateID);

  });


  function getScreensaverCity(stateID) {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "cities?state_id=" + stateID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (cities) {
      $("#preloaderNav").hide();

      console.log(cities);
      $("#screensaverSelectCity").html("");
      $("#screensaverSelectCity").append("<option>Select a city</option>");

      for (i = 0; i < cities.message.length; i++) {
        $("#screensaverSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
        console.log("adding cities");
      }
    })
  }

  $("#screensaverSelectCity").change(function () {
    console.log("select country clicked");
    var cityID = $(this).find(":selected").data("id");
    console.log("Selected ID");
    console.log(cityID);
    $("#city_id").val(cityID);

  });


  $("form").submit(function (event) {

    event.preventDefault();
    var fileSelect = document.getElementById('qqfile');
    var file = fileSelect.files[0];
    var name = $("#screensaverName").val();
    var countryID = $("#screensaverSelectCountry").find(":selected").data("id");
    var stateID = $("#screensaverSelectState").find(":selected").data("id");
    var cityID = $("#screensaverSelectCity").find(":selected").data("id");
    var fileName = $("#qqfile").val();


    if (name === "") {
      $("#screensaverName").addClass("error_input");
    } else {
      $("#screensaverName").removeClass("error_input");
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

    if (fileName === "") {
      $("#qqfile").addClass("error_input");
    } else {
      $("#qqfile").removeClass("error_input");
    }


    if (name !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined && fileName !== "") {

      $("#preloaderNav").show();
      document.getElementById("addScreensaver").disabled = true;
      document.getElementById("addScreensaver").style.backgroundColor = "black";

      var city_id = $("#screensaverSelectCity").find(":selected").data("id");

      var formData = new FormData();

      // Add the file to the request.
      formData.append('image', file, file.name);
      formData.append("city_id", city_id);
      formData.append("name", name);


      $.ajax({
        url: 'http://staging.nairabox.com/foodhub/screensaver/create',
        data: formData,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
          console.log(data);
          $("#preloaderNav").hide();
          document.getElementById("addScreensaver").disabled = false;
          document.getElementById("addScreensaver").style.backgroundColor = "#86B77E";

          if (data.error_code === 0) {
            toastr.success(data.message);
          } else {
            toastr.error(data.message);
          }

        }
      });
    } else {
      toastr.warning("Invalid Input Values");
    }

  });

});


var createScreensaver = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",


  init: function () {

  },


  getScreensaverState: function () {


    $("#preloaderNav").show();

    $.ajax({
      url: createScreensaver.BASE_URL + "states?country_id=" + countryID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (states) {
      $("#preloaderNav").hide();

      console.log(states);
      $("#screensaverSelectState").html("");
      $("#screensaverSelectState").append("<option>Select a state</option>");

      for (i = 0; i < states.message.length; i++) {
        $("#screensaverSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
        console.log("adding states");
      }
    })
  },

  getScreensaverCity: function () {

  },

  // addScreensaver: function () {
  //   console.log("Adding Screensaver");
  //
  //   // Variable to store your files
  //   var files;
  //
  //   // Add events
  //   $('#qqfile').on('change', prepareUpload);
  // 
  //   // Grab the files and set them to our variable
  //   function prepareUpload(event) {
  //     debugger;
  //     files = event.target.files;
  //     console.log(files);
  //   }
  //
  //
  //   event.stopPropagation(); // Stop stuff happening
  //   event.preventDefault(); // Totally stop stuff happening
  //
  //   // START A LOADING SPINNER HERE
  //
  //   // Create a formdata object and add the files
  //   var data = new FormData();
  //   $.each(files, function (key, value) {
  //     data.append(key, value);
  //   });
  //
  //   $.ajax({
  //     url: 'http://staging.nairabox.com/foodhub/fileupload',
  //     type: 'POST',
  //     data: data,
  //     cache: false,
  //     dataType: 'json',
  //     processData: false, // Don't process the files
  //     contentType: false, // Set content type to false as jQuery will tell the server its a query string request
  //     success: function (data, textStatus, jqXHR) {
  //       if (typeof data.error === 'undefined') {
  //         // Success so call function to process the form
  //         submitForm(event, data);
  //       }
  //       else {
  //         // Handle errors here
  //         console.log('ERRORS: ' + data.error);
  //       }
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {
  //       // Handle errors here
  //       console.log('ERRORS: ' + textStatus);
  //       // STOP LOADING SPINNER
  //     }
  //   });
  //
  // }

}

createScreensaver.init();
