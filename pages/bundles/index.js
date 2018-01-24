$(function () {
    console.log("menu js found");
    console.log("menu js ready");

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
            var partnerID = $("#bundlesSelectPartner").find(":selected").data("id");
            var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
            var description = $("#bundleInputDescription").val();

            console.log(name + " - " + price + " - " + categoryID + " - " + description + " - " + partnerID);

            createBundle.addBundle(name, price, categoryID, description);

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

    addBundle: function (name, price, categoryID, description) {
        $("#preloaderNav").show();



        console.log("Creating a bundle")
        var bundleData = {name: name, price: price, category_id: categoryID, description: description}

        $.ajax({
            url: createBundle.BASE_URL + "create/bundle",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundles) {
            $("#preloaderNav").hide();

            console.log(bundles);

            var partnerID = $("#bundlesSelectPartner").find(":selected").data("id");
            var name = $("#inputMenus").val();


            if (bundles.error_code === 0) {
                bundleID = bundles.bundle_id;


                createBundle.addMenuToBundle(name, partnerID, bundleID);

            } else {
                bundleID = bundles.id;
                createBundle.addMenuToBundle(name, partnerID, bundleID);

            }

        })

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


        var menuData = {menu: {name: name, partner_id: partnerID, options: options}, bundle_id: bundleID};
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
        })
    },


    addOptions: function () {

        console.log("Number of Menu Options");
        console.log($("div#moreOptions input").length);

        var inputOptionLength = $("div#moreOptions input").length;


        $('#moreOptions').prepend("<input id='menuOption_" + inputOptionLength + "' class='input-form' type='text' placeholder='New Option Name'>");

    },
    removeOption: function (optionsID) {
        console.log("Removing option");
        console.log(optionsID);

        var storedOptions = JSON.parse(localStorage.getItem("options"));

        var newOptionsArray = storedOptions.splice(3, 1);
        console.log("Option removed. New Options Created");
        console.log(newOptionsArray);
        console.log(newOptionsArray.length);

    },

    clearOptions: function () {
        localStorage.clear("options");
        localStorage.clear("optionsInput");

        $('#moreOptions').html("");

    }
}

createBundle.init();


