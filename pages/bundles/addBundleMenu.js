$(function () {
    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getBundleMenuCountry();


    function getBundleMenuCountry() {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "countries",
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
                // $("#screensaverSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");


                console.log("adding countries");
            }
        });
    }


    $("#selectBundleMenuCountry").change(function () {
        console.log("select country clicked");
        //var countryID =
        var countryID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(countryID);
        getBundleMenuState(countryID)

    });


    function getBundleMenuState(countryID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (states) {
            $("#preloaderNav").hide();

            console.log(states);
            $("#selectBundleMenuState").html("");
            $("#selectBundleMenuState").append("<option>Select a state</option>");

            for (i = 0; i < states.message.length; i++) {
                $("#selectBundleMenuState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#selectBundleMenuState").change(function () {
        console.log("select country clicked");
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(stateID);
        getBundleMenuCity(stateID);

    });


    function getBundleMenuCity(stateID) {
        $("#preloaderNav").show();

        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cities) {
            $("#preloaderNav").hide();

            console.log(cities);
            $("#selectBundleMenuCity").html("");
            $("#selectBundleMenuCity").append("<option>Select a city</option>");

            for (i = 0; i < cities.message.length; i++) {
                $("#selectBundleMenuCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }

    $("#selectBundleMenuCity").click(function () {
        console.log("selelct city clicked");
        var cityID = $(this).find(":selected").data("id");
        console.log(cityID);
        getBundleMenuPartner(cityID);
    });


    function getBundleMenuPartner(cityID) {
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
            $("#selectBundleMenuPartner").html("");
            $("#selectBundleMenuPartner").append("<option>Select a partner</option>");

            for (i = 0; i < partners.message.length; i++) {
                $("#selectBundleMenuPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }
});


var addBundleMenu = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",


    init: function () {
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};

        addBundleMenu.getAllBundles();
    },

    getAllBundles: function () {
        $("#preloaderNav").show();

        $("#bundlesTable").html("");
        $.ajax({
            url: addBundleMenu.BASE_URL + "bundles/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (allBundles) {
            $("#preloaderNav").hide();

            console.log(allBundles);

            for (var i = 0; i < allBundles.message.length; i++) {

                $("#selectMoreBundle").append("<option data-id=" + allBundles.message[i]._id + ">" + allBundles.message[i].name + "</option>");
                console.log("adding bundles");

            }

        });
    },

    addMenuToBundle: function () {
//var bundleID =

        var name = $("#inputMenusBundle").val();
        var partnerID = $("#selectBundleMenuPartner").find(":selected").data("id");
        var bundleID = $("#selectMoreBundle").find(":selected").data("id");
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
        document.getElementById("addBundleMenu").disabled = true;
        document.getElementById("addBundleMenu").style.backgroundColor = "black";
//debugger;
        $.ajax({
            url: addBundleMenu.BASE_URL + "menu/create",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(menuData),
            contentType: "application/json"
        }).done(function (menus) {
            $("#preloaderNav").hide();
            document.getElementById("addBundleMenu").disabled = false;
            document.getElementById("addBundleMenu").style.backgroundColor = "#86B77E";

            console.log(menus);
            toastr.success("A menu was added to the bundle successfully");
        })
    },


    validateInput: function () {

        var bundleID = $("#selectMoreBundle").find(":selected").data("id");
        var priceMenu = $("#inputMenuPriceBundle").val();
        var MenuItem = $("#inputMenusBundle").val();

        if (priceMenu === "") {
            $("#inputMenuPriceBundle").addClass("error_input");
        } else {
            $("#inputMenuPriceBundle").removeClass("error_input");
        }

        if (MenuItem === "") {
            $("#inputMenusBundle").addClass("error_input");
        } else {
            $("#inputMenusBundle").removeClass("error_input");
        }

        if (bundleID === undefined) {
            $("#selectMoreBundlesContainer").addClass("error_input");
        } else {
            $("#selectMoreBundlesContainer").removeClass("error_input");
        }

        if (bundleID !== undefined && priceMenu !== "" && MenuItem !== "") {
            console.log("All Data Correct");
            addBundleMenu.addMenuToBundle();

        } else {
            toastr.warning("Invalid Input Values");
        }

    }

}

addBundleMenu.init();
