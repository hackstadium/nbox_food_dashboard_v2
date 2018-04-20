

var addBundleOptions = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",


  init: function () {
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true, "preventDuplicates": true,};

    addBundleOptions.getAllBundles();
    addBundleOptions.getAllCountries();
    addBundleOptions.inputOptionID = 0;
  },

  getAllCountries:function () {

    $("#preloaderNav").show();

    $.ajax({
      url: addBundleOptions.BASE_URL + "countries",
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
        url: addBundleOptions.BASE_URL + "states?country_id=" + countryID,
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
      url: addBundleOptions.BASE_URL + "cities?state_id=" + stateID,
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
      url: addBundleOptions.BASE_URL + "partners?city_id=" + cityID,
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
      url: addBundleOptions.BASE_URL + "bundles/all",
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


  createOptions:function (bundleID, partnerID) {
    $("#preloaderNav").show();
    console.log("bundleID");
    console.log(bundleID);
    console.log("partnerID");
    console.log(partnerID);

    console.log(addBundleOptions.inputOptionID);
    var extrasLength = addBundleOptions.inputOptionID + 1;

    for (var i = 0; i < extrasLength; i++) {

      console.log($("#menuOption_" + i).val());
      console.log($("#menuPriceOption_" + i).val());

      var optionName = $("#menuOption_" + i).val();
      var optionPrice = $("#menuPriceOption_" + i).val();

      var optionsData = {bundle_options : {
        bundle_id: bundleID,
        partner_id : partnerID,
        name : optionName,
        price : optionPrice
      }
    };

    //  var lenghtedMessage = "";

    $.ajax({
      url: addBundleOptions.BASE_URL + "bundle/option/create",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(optionsData),
      contentType: "application/json"
    }).done(function (options) {
      $("#preloaderNav").hide();
      console.log(options);

      if(options.status === 200){

        var lenghtedMessage = " ... "+ i +" of " + extrasLength;
        console.log(lenghtedMessage);
        // debugger;;
        console.log("options Added");
        toastr.success(options.message);
        //  addBundleOptions.addMoreMenuDialog();
      }else {
        toastr.error(options.message);
      }



    })

    console.log(optionsData);

  }
},


addOptions: function () {

  console.log("Number of Menu Options");
  console.log($("div#moreOptions input").length);

  var inputOptionLength = $("div#moreOptions input").length;
  //var inputOptionID = 0;

  if (inputOptionLength === 0) {
    inputOptionID = 0;
    //addBundleOptions.inputOptionID = 0;
  }else {
    addBundleOptions.inputOptionID += 1;
    inputOptionID = addBundleOptions.inputOptionID;
  }

  $('#moreOptions').prepend("<div id='menuOptionRow_"+ inputOptionID +"' class='input-row'><input id='menuOption_" + inputOptionID + "' class='input-short-form' type='text' placeholder='New Option Name'><input id='menuPriceOption_" + inputOptionID + "' class='input-short-form' type='text' placeholder='Price'><i onclick='addBundleOptions.removeOption(\"" + inputOptionID + "\")' class='fa fa-close button-inline' aria-hidden='true'></i></div>");

  for (var i = 0; i < inputOptionLength; i++) {
    if ($("#menuOption_" + i).val() === "") {
      $("#menuOption_" + i).addClass("error_input");
    } else {
      $("#menuOption_" + i).removeClass("error_input");
    }

    if ($("#menuPriceOption_" + i).val() === "") {
      $("#menuPriceOption_" + i).addClass("error_input");
    } else {
      $("#menuPriceOption_" + i).removeClass("error_input");
    }
  }

},


removeOption: function (optionsID) {
  console.log("Removing option");
  console.log(optionsID);

  // var storedOptions = JSON.parse(localStorage.getItem("options"));
  //
  // var newOptionsArray = storedOptions.splice(3, 1);
  // console.log("Option removed. New Options Created");
  // console.log(newOptionsArray);
  // console.log(newOptionsArray.length);

  $("#menuOptionRow_" + optionsID).remove();

},


addMenuToBundle: function () {
  //var bundleID =

  var name = $("#inputMenusBundle").val();
  var partnerID = $("#selectPartner").find(":selected").data("id");
  var bundleID = $("#selectBundle").find(":selected").data("id");
  var priceMenu = $("#inputMenuPriceBundle").val();

  $("#preloaderNav").show();

  var options = [];
  console.log("addMenuToBundle : Number of Menu Options");
  console.log($("div#moreOptions input").length);

  var inputOptionLength = $("div#moreOptions input").length;


  for (var i = 0; i < inputOptionLength; i++) {
    console.log("addMenuToBundle : Listing option values");
    console.log($("#menuOption_" + i).val());
    inputOptionValue = $("#menuOption_" + i).val();

    options.push(inputOptionValue);

  }

  console.log(options);

  var menuData = {
    menu: {name: name, partner_id: partnerID, options: options, price: priceMenu},
    bundle_id: bundleID
  };
  console.log("adding menu to bundle");
  document.getElementById("addBundleOptions").disabled = true;
  document.getElementById("addBundleOptions").style.backgroundColor = "black";
  //debugger;
  $.ajax({
    url: addBundleOptions.BASE_URL + "menu/create",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(menuData),
    contentType: "application/json"
  }).done(function (menus) {
    $("#preloaderNav").hide();
    document.getElementById("addBundleOptions").disabled = false;
    document.getElementById("addBundleOptions").style.backgroundColor = "#86B77E";

    console.log(menus);
    toastr.success("A menu was added to the bundle successfully");
  })
},


validateInput: function () {

  var bundleID = $("#selectBundle").find(":selected").data("id");
  var countryID = $("#selectCountry").find(":selected").data("id");
  var stateID = $("#selectState").find(":selected").data("id");
  var cityID = $("#selectCity").find(":selected").data("id");
  var partnerID = $("#selectPartner").find(":selected").data("id");

  if (bundleID === undefined) {
    $("#selectMoreBundlesContainer").addClass("error_input");
  } else {
    $("#selectMoreBundlesContainer").removeClass("error_input");
  }

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

  if (bundleID !== undefined && partnerID !== undefined) {
    console.log("All Data Correct");
    addBundleOptions.createOptions(bundleID, partnerID);

  } else {
    toastr.warning("Invalid Input Values");
  }

}

}

addBundleOptions.init();
