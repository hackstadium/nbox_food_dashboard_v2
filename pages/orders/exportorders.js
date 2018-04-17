

var exportOrders = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",


  init: function () {
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};

    exportOrders.getAllBundles();
    exportOrders.getAllCountries();
    exportOrders.inputOptionID = 0;
  },

  getAllCountries:function () {

    $("#preloaderNav").show();

    $.ajax({
      url: exportOrders.BASE_URL + "countries",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (countries) {
      $("#preloaderNav").hide();

      console.log(countries);

      $("#selectBundleMenuCountry").html("");
      $("#selectBundleMenuCountry").append("<option>Select a country</option>");

      for (i = 0; i < countries.message.length; i++) {
        $("#selectBundleMenuCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
        $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");

        console.log("adding countries");
      }
    });

  },

  getState: function () {
    $(function () {
      var countryID = $("#selectCountry").find(":selected").data("id");
      $("#preloaderNav").show();

      $.ajax({
        url: exportOrders.BASE_URL + "states?country_id=" + countryID,
        type: "GET",
        crossDomain: true,
        contentType: "application/json"
      }).done(function (states) {
        $("#preloaderNav").hide();

        console.log(states);
        $("#selectState").html("");
        $("#selectState").append("<option>Select a state</option>");

        for (i = 0; i < states.message.length; i++) {
          $("#selectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
          console.log("adding states");
        }
      })

      console.log(countryID);
    })

  },

  getCity:function () {
    var stateID = $("#selectState").find(":selected").data("id");

    $("#preloaderNav").show();

    $.ajax({
      url: exportOrders.BASE_URL + "cities?state_id=" + stateID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (cities) {
      $("#preloaderNav").hide();

      console.log(cities);
      $("#selectCity").html("");
      $("#selectCity").append("<option>Select a city</option>");

      for (i = 0; i < cities.message.length; i++) {
        $("#selectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
        console.log("adding cities");
      }
    })
  },

  getPartners:function () {

    var cityID = $("#selectCity").find(":selected").data("id");

    $("#preloaderNav").show();

    console.log("getting Partners");
    $.ajax({
      url: exportOrders.BASE_URL + "partners?city_id=" + cityID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (partners) {
      $("#preloaderNav").hide();

      console.log(partners);
      $("#selectPartner").html("");
      $("#selectPartner").append("<option>Select a partner</option>");

      for (i = 0; i < partners.message.length; i++) {
        $("#selectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
        console.log("adding partners");
      }
    })

  },

  getAllBundles: function () {
    $("#preloaderNav").show();

    $("#bundlesTable").html("");
    $.ajax({
      url: exportOrders.BASE_URL + "bundles/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (allBundles) {
      $("#preloaderNav").hide();

      console.log(allBundles);

      for (var i = 0; i < allBundles.message.length; i++) {

        $("#selectBundle").append("<option data-id=" + allBundles.message[i]._id + ">" + allBundles.message[i].name + "</option>");
        console.log("adding bundles");

      }

    });
  },


  validateInput: function () {

    // var bundleID = $("#selectBundle").find(":selected").data("id");
    var countryID = $("#selectCountry").find(":selected").data("id");
    var stateID = $("#selectState").find(":selected").data("id");
    var cityID = $("#selectCity").find(":selected").data("id");
    var partnerID = $("#selectPartner").find(":selected").data("id");

    // if (bundleID === undefined) {
    //   $("#selectMoreBundlesContainer").addClass("error_input");
    // } else {
    //   $("#selectMoreBundlesContainer").removeClass("error_input");
    // }

    if (countryID === undefined) {
      $("#selectCountryContainer").addClass("error_input");
    } else {
      $("#selectCountryContainer").removeClass("error_input");
    }

    if (stateID === undefined) {
      $("#selectStateContainer").addClass("error_input");
    } else {
      $("#selectStateContainer").removeClass("error_input");
    }

    if (cityID === undefined) {
      $("#selectCityContainer").addClass("error_input");
    } else {
      $("#selectCityContainer").removeClass("error_input");
    }

    if (partnerID === undefined) {
      $("#selectPartnerContainer").addClass("error_input");
    } else {
      $("#selectPartnerContainer").removeClass("error_input");
    }

    if (partnerID !== undefined && cityID !== undefined) {
      console.log("All Data Correct");
      exportOrders.export(partnerID);

    } else {
      toastr.warning("Invalid Input Values");
    }

  },

  export:function (partnerID) {
  //  $("#preloaderNav").show();

  //  $("#bundlesTable").html("");
    // $.ajax({
    //   url: exportOrders.BASE_URL + "orders/downloadfood?partner_id=" + partnerID,
    //   type: "GET",
    //   crossDomain: true,
    //   contentType: "application/json"
    // }).done(function (exports) {
    //   $("#preloaderNav").hide();
    //
    //   console.log(exports);
    //
    //
    // });
    window.open(exportOrders.BASE_URL + "orders/downloadfood?partner_id=" + partnerID,'_blank');
    //window.open
  }

}

exportOrders.init();
