$(function () {
  console.log("menu js found");
  console.log("menu js ready");
  toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};


  // $("#wizard").steps();

  $("#wizard").steps({
    headerTag: "h1",
    bodyTag: "section",
    transitionEffect: "fade",
    autoFocus: true,

    labels: {
      next: "ADD MENU",
      finish: "CREATE BUNDLE",

    },

    onFinished: function (event, currentIndex) {
      console.log("finished stepper");

      var name = $("#bundleInputName").val();
      var price = $("#bundleInputPrice").val();
      var partnerID = $("#MenuSelectPartner").find(":selected").data("id");
      var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
      var description = $("#bundleInputDescription").val();

      console.log(name + " - " + price + " - " + categoryID + " - " + description + " - " + partnerID);

      createBundle.validateInput();

    },

  });


  const BASE_URL = "http://staging.nairabox.com/foodhub/";

  getCountries();

  function getCountries() {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "countries",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (countries) {
      $("#preloaderNav").hide();

      console.log(countries);

      $("#selectCountry").html("");
      $("#selectCountry").append("<option>Select a country</option>");

      for (i = 0; i < countries.message.length; i++) {
        $("#selectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
        $("#selectMenuCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");

        console.log("adding countries");
      }
    });
  }


  $("#selectCountry").change(function () {
    console.log("select country clicked");
    //var countryID =
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
  }


  $("#selectState").change(function () {
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
  }

  $("#selectCity").click(function () {
    console.log("selelct city clicked");
    var cityID = $(this).find(":selected").data("id");
    console.log(cityID);
    getPartner(cityID);
    getCategory(cityID);
  });


  function getPartner(cityID) {
    $("#preloaderNav").show();

    console.log("getting Partners");
    $.ajax({
      url: BASE_URL + "partners?city_id=" + cityID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (partners) {
      $("#preloaderNav").hide();

      console.log(partners);
      $("#bundlesSelectPartner").html("");
      $("#bundlesSelectPartner").append("<option>Select a partner</option>");

      for (i = 0; i < partners.message.length; i++) {
        $("#bundlesSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
        console.log("adding partners");
      }
    })
  }

  function getCategory(cityID) {
    $("#preloaderNav").show();

    $.ajax({
      url: BASE_URL + "categories?city_id=" + cityID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (categories) {
      $("#preloaderNav").hide();

      console.log(categories);

      $("#bundlesSelectCategory").html("");
      $("#bundlesSelectCategory").append("<option>Select a category</option>");

      for (i = 0; i < categories.message.length; i++) {
        $("#bundlesSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
        console.log("adding categories");
      }

    });
  }


  $("#addBundle").click(function () {
    var name = $("#bundleInputName").val();
    var price = $("#bundleInputPrice").val();
    var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
    var description = "description here";

    console.log(name + " - " + price + " - " + categoryID + " - " + description);

  });

  $('#moveWizard').click(function () {
    $("#wizard").steps();
  });


  function addBundles(name, price, categoryID, description) {

    console.log("Creating a bundle")
    var bundleData = {name: name, price: price, category_id: categoryID, description: description}

    $.ajax({
      url: BASE_URL + "create/bundle",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(bundleData),
      contentType: "application/json"
    }).done(function (bundles) {
      console.log(bundles);

      var bundleID = bundles.bundle_id;
      var partnerID = $("#bundlesSelectPartner").find(":selected").data("id");

      addMenuToBundle(name, partnerID, bundleID);
    })
  }


  function addMenuToBundle(name, partnerID, bundleID) {
    $("#preloaderNav").show();

    var storedOptions = JSON.parse(localStorage.getItem("options"));

    var optionsArray = [];

    for (var i = 0; i < storedOptions.length; i++) {
      optionsArray.push(storedOptions[i].option);
      console.log("Options Array to be inserterd");
      console.log(optionsArray);
    }

    var menuData = {menu: {name: name, partner_id: partnerID, options: optionsArray}, bundle_id: bundleID};
    console.log("adding menu to bundle")

    $.ajax({
      url: BASE_URL + "menu/create",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(menuData),
      contentType: "application/json"
    }).done(function (menus) {
      $("#preloaderNav").hide();

      console.log(menus);
    })
  }


});

var createBundle = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init: function () {
    createBundle.checkLogin();
    createBundle.inputOptionID = 0;
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


  saveOptions: function () {
    var optionsArray = [];

    var initalOptions = JSON.parse(localStorage.getItem("options"));
    var initialOptionsInput = JSON.parse(localStorage.getItem("optionsInput"));

    console.log("saveOptions Length of options");
    console.log(initialOptionsInput.length);

    if (initalOptions == null) {

      var options = [];
      var optionsInputValue = $("#option0").val();
      console.log("Saving First value");
      console.log(optionsInputValue);
      arrayValue = {option: optionsInputValue};

      options.unshift(arrayValue);

      localStorage.setItem("options", JSON.stringify(options));

      console.log(options);

    } else {
      var options = initalOptions;

      for (var i = 0; i < initialOptionsInput.length; i++) {
        var inputOptionValue = $("#option" + i).val();
        inputArrayValue = {option: inputOptionValue};
        console.log("Input Values");

      }

      $('#moreOptions').html("");

      for (var i = 0; i < options.length; i++) {
        $('#moreOptions').append("<div class='multipleInput'><input class='input-form' type='text' value='" + options[i].option + "'></div>");

      }

    }
  },



  addBundle:function(name, price, categoryID, description){
    $("#preloaderNav").show();
    //  event.preventDefault();
    var fileSelect = document.getElementById('qqfile');
    var file = fileSelect.files[0];
    var fileName = $("#qqfile").val();
    var partnerID = $("#MenuSelectPartner").find(":selected").data("id");

    var formData = new FormData();

    // Add the file to the request.
    formData.append('image', file, file.name);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", categoryID);
    formData.append("description", description);

    $.ajax({
      url: 'http://staging.nairabox.com/foodhub/create/bundle',
      data: formData,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function (data) {
        console.log(data);
        $("#preloaderNav").hide();

        if (data.error_code === 0) {
          toastr.success(data.message);
          bundleID = data.bundle_id;
          //  createBundle.addMenuToBundle(name, partnerID, bundleID);
          // toastr.success("A new bundle was created successfully");
          createBundle.createOptions(bundleID, partnerID)
        } else {
          toastr.error(data.message);
        }

      }
    });

  },

  createOptions:function (bundleID, partnerID) {
    $("#preloaderNav").show();
    console.log("bundleID");
    console.log(bundleID);
    console.log("partnerID");
    console.log(partnerID);

    console.log(createBundle.inputOptionID);
    var extrasLength = createBundle.inputOptionID + 1;

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
      url: createBundle.BASE_URL + "bundle/option/create",
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
        toastr.success(options.message + lenghtedMessage);
        //  createBundle.addMoreMenuDialog();
      }else {
        toastr.error(options.message);
      }

    })

    console.log(optionsData);

  }
},

addMenuToBundle: function (name, partnerID, bundleID) {
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
  var menuName = $("#menuName").val();
  // console.log("menuName");
  // console.log(menuName);
  var priceMenu = $("#inputMenuPrice").val();

  var menuData = {
    menu: {name: menuName, partner_id: partnerID, options: options, price: priceMenu},
    bundle_id: bundleID
  };
  console.log("adding menu to bundle")

  $.ajax({
    url: createBundle.BASE_URL + "menu/create",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(menuData),
    contentType: "application/json"
  }).done(function (menus) {
    $("#preloaderNav").hide();

    console.log(menus);
    console.log("Menu Added");
    toastr.success("A menu was added to the bundle successfully");
    createBundle.addMoreMenuDialog();
  })
},

addMoreMenuDialog: function () {

  console.log("addMoreMenuDialog : More menus called");

  var screensaverDeleteModalTemplate = "<div>"
  + "<h6 style='margin-bottom: 32px'>Do you want to add more menus to this bundle ?</h6>"
  + "</div>";


  alertify.confirm(" ", screensaverDeleteModalTemplate,
  function () {

    window.location.href = "../../pages/bundles/addbundlemenu.html"

  }, function () {
    window.location.href = "../../pages/bundles/bundles.html"


  }
).set({transition: 'zoom', labels: {ok:'YES', cancel: 'NO'}}).show();


},


addOptions: function () {

  console.log("Number of Menu Options");
  console.log($("div#moreOptions input").length);

  var inputOptionLength = $("div#moreOptions input").length;
  //var inputOptionID = 0;

  if (inputOptionLength === 0) {
    inputOptionID = 0;
    //createBundle.inputOptionID = 0;
  }else {
    createBundle.inputOptionID += 1;
    inputOptionID = createBundle.inputOptionID;
  }

  $('#moreOptions').prepend("<div id='menuOptionRow_"+ inputOptionID +"' class='input-row'><input id='menuOption_" + inputOptionID + "' class='input-short-form' type='text' placeholder='New Option Name'><input id='menuPriceOption_" + inputOptionID + "' class='input-short-form' type='text' placeholder='Price'><i onclick='createBundle.removeOption(\"" + inputOptionID + "\")' class='fa fa-close button-inline' aria-hidden='true'></i></div>");

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

clearOptions: function () {
  localStorage.clear("options");
  localStorage.clear("optionsInput");

  $('#moreOptions').html("");

},

validateNumeric: function (inputtext) {
  var numericExpression = /^[0-9]+$/;
  if (inputtext.match(numericExpression)) {
    return true;
  } else {
    return false;
  }
},


validateAlphabet: function (inputtext) {
  var alphaExp = /^[a-zA-Z]+$/;
  if (inputtext.match(alphaExp)) {
    return true;
  } else {
    return false;
  }
},

validateInput: function () {

  var name = $("#bundleInputName").val();
  var countryID = $("#selectCountry").find(":selected").data("id");
  var stateID = $("#selectState").find(":selected").data("id");
  var cityID = $("#selectCity").find(":selected").data("id");
  var partnerID = $("#MenuSelectPartner").find(":selected").data("id");
  var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
  var price = $("#bundleInputPrice").val();
  var description = $("#bundleInputDescription").val();
  var priceisValid = createBundle.validateNumeric(price);
  var priceMenu = $("#inputMenuPrice").val();
  var priceMenuisValid = createBundle.validateNumeric(priceMenu);
  var menuName = $("#menuName").val();
  createBundle.isValidOptions = 1;

  if (!priceMenuisValid) {
    $("#inputMenuPrice").addClass("error_input");
  } else {
    $("#inputMenuPrice").removeClass("error_input");
  }

  if (name === "") {
    $("#bundleInputName").addClass("error_input");
  } else {
    $("#bundleInputName").removeClass("error_input");
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
    $("#selectMenuPartnerContainer").addClass("error_input");
  } else {
    $("#selectMenuPartnerContainer").removeClass("error_input");
  }

  if (categoryID === undefined) {
    $("#selectCategoryContainer").addClass("error_input");
  } else {
    $("#selectCategoryContainer").removeClass("error_input");
  }

  if (!priceisValid) {
    $("#bundleInputPrice").addClass("error_input");
  } else {
    $("#bundleInputPrice").removeClass("error_input");
  }

  if (description === "") {
    $("#bundleInputDescription").addClass("error_input");
  } else {
    $("#bundleInputDescription").removeClass("error_input");
  }

  if (menuName === "") {
    $("#menuName").addClass("error_input");
  } else {
    $("#menuName").removeClass("error_input");
  }


  // console.log(createBundle.inputOptionID);
  // var extrasLength = createBundle.inputOptionID + 1;
  // for (var i = 0; i < extrasLength; i++) {
  //   // if ($("#menuOption_" + i).val() === "") {
  //   // //  $("#menuOption_" + i).addClass("error_input");
  //   //   //createBundle.isValidOptions = 1;
  //   //   console.log($("#menuOption_" + i).val());
  //   // }
  //
  //   console.log($("#menuOption_" + i).val());
  //   console.log($("#menuPriceOption_" + i).val());
  //
  // }


  if (name !== "" && countryID !== undefined && stateID !== undefined && cityID !== undefined && partnerID !== undefined && categoryID !== undefined && priceisValid && priceMenuisValid && description !== "") {
    //debugger;
    console.log("All Data Correct");
    createBundle.addBundle(name, price, categoryID, description);
  } else {
    toastr.warning("Invalid Input Values");
  }
},

getMenuState: function () {
  $(function () {
    var countryID = $("#selectMenuCountry").find(":selected").data("id");
    $("#preloaderNav").show();

    $.ajax({
      url: createBundle.BASE_URL + "states?country_id=" + countryID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (states) {
      $("#preloaderNav").hide();

      console.log(states);
      $("#selectMenuState").html("");
      $("#selectMenuState").append("<option>Select a state</option>");

      for (i = 0; i < states.message.length; i++) {
        $("#selectMenuState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
        console.log("adding states");
      }
    })

    console.log(countryID);
  })

},
getMenuCity: function () {
  var stateID = $("#selectMenuState").find(":selected").data("id");

  $("#preloaderNav").show();

  $.ajax({
    url: createBundle.BASE_URL + "cities?state_id=" + stateID,
    type: "GET",
    crossDomain: true,
    contentType: "application/json"
  }).done(function (cities) {
    $("#preloaderNav").hide();

    console.log(cities);
    $("#selectMenuCity").html("");
    $("#selectMenuCity").append("<option>Select a city</option>");

    for (i = 0; i < cities.message.length; i++) {
      $("#selectMenuCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
      console.log("adding cities");
    }
  })
},
getMenuPartner: function () {
  var cityID = $("#selectMenuCity").find(":selected").data("id");

  $("#preloaderNav").show();

  console.log("getting Partners");
  $.ajax({
    url: createBundle.BASE_URL + "partners?city_id=" + cityID,
    type: "GET",
    crossDomain: true,
    contentType: "application/json"
  }).done(function (partners) {
    $("#preloaderNav").hide();

    console.log(partners);
    $("#MenuSelectPartner").html("");
    $("#MenuSelectPartner").append("<option>Select a partner</option>");

    for (i = 0; i < partners.message.length; i++) {
      $("#MenuSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
      console.log("adding partners");
    }
  })
}
}

createBundle.init();
