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

            var description = "description here";

            console.log(name + " - " + price + " - " + categoryID + " - " + description + " - " + partnerID);


            addBundles(name, price, categoryID, description);

        },

    });


    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getCountries();

    function getCountries() {
        $.ajax({
            url: BASE_URL + "countries",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (countries) {
            console.log(countries);
            // console.log(countries.message)
            //  console.log(countries.message.length);

            for (i = 0; i < countries.message.length; i++) {
                //console.log(countries.message[i]._id);
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
        $.ajax({
            url: BASE_URL + "states?country_id=" + countryID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (states) {
            console.log(states);
            $("#selectState").html("");

            for (i = 0; i < states.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#selectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#selectState").change(function () {
        console.log("select state clicked");
        //var countryID =
        var stateID = $(this).find(":selected").data("id");
        console.log("Selected ID");
        console.log(stateID);
        getCity(stateID);

    });


    function getCity(stateID) {
        $.ajax({
            url: BASE_URL + "cities?state_id=" + stateID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (cities) {
            console.log(cities);
            $("#selectCity").html("");

            for (i = 0; i < cities.message.length; i++) {
                //console.log(countries.message[i]._id);
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
        console.log("getting Partners");
        $.ajax({
            url: BASE_URL + "partners?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);
            $("#bundlesSelectPartner").html("");

            for (i = 0; i < partners.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#bundlesSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }

    function getCategory(cityID) {
        $.ajax({
            url: BASE_URL + "categories?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);

            $("#bundlesSelectCategory").html("");

            for (i = 0; i < categories.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#bundlesSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
                console.log("adding categories");
            }

        });
    }


    $("#addBundle").click(function () {

        // 'name', 'price', 'category_id', 'description'
        var name = $("#bundleInputName").val();
        var price = $("#bundleInputPrice").val();
        var categoryID = $("#bundlesSelectCategory").find(":selected").data("id");
        var description = "description here";

        console.log(name + " - " + price + " - " + categoryID + " - " + description);

        // addBundles(name, price, categoryID, description);

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
            console.log(menus);
        })
    }

    //
    // $('#addMenu').click(function () {
    //     moreMenuTemplate = "<hr" +
    //         "><div>" +
    //         "<input class='input-form' type='text' placeholder='New Menu Name'>" +
    //         "<div class='multipleInput'>" +
    //         "<input id='inputOptions' type='text' placeholder='Enter Options' class='input-form'>" +
    //         "<a id='addOptions' class='input-action pointer'><i class='fa fa-plus-square-o text-icon' aria-hidden='true'></i>add options</a>" +
    //         "</div>" +
    //         "</div>";
    //
    //     $('#moreMenu').append(moreMenuTemplate);
    // });

});

var createBundle = {
    init: function () {

    },

    saveOptions: function () {
        var optionsArray = [];
        // $('#addOptions').click(function () {
        // $('#moreOptions').append("<div class='multipleInput'><input class='input-form' type='text' placeholder='New Option Name'><a onclick='createBundle.removeOption()' id='removeOption' class='input-action'><i class='fa fa-times-circle text-icon' aria-hidden='true'></i></a></div>");

        // optionsArray.push("New Options");
        // console.log(optionsArray);


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


            // console.log("No Options found. Add an Option")

            //   $('#moreOptions').append("<div class='multipleInput'><input class='input-form' type='text' placeholder='New Option Name'></div>");

        } else {
            var options = initalOptions;
            // var inputArrayValue = [];

            for (var i = 0; i < initialOptionsInput.length; i++) {
                // optionID
                var inputOptionValue = $("#option" + i).val();
                inputArrayValue = {option: inputOptionValue};
                console.log("Input Values");
                // console.log(inputArrayValue);
                //inputArrayValue.push($('#options'))
            }

            // arrayValue = {option: "New Option"};
            //
            // options.unshift(arrayValue);
            // localStorage.setItem("options", JSON.stringify(options));
            // console.log(options);
            $('#moreOptions').html("");

            for (var i = 0; i < options.length; i++) {
                $('#moreOptions').append("<div class='multipleInput'><input class='input-form' type='text' value='" + options[i].option + "'></div>");

                //  $('#moreOptions').append("<div class='multipleInput'><input class='input-form' type='text' value='" + options[i].option + "'><a onclick='createBundle.removeOption(\"" + i + "\")' id='removeOption' class='input-action'><i class='fa fa-times-circle text-icon' aria-hidden='true'></i></a></div>");

            }

        }
    },


    addOptions: function () {

        console.log("Number of Menu Options");
        console.log($("div#moreOptions input").length);

        var inputOptionLength = $("div#moreOptions input").length;



        $('#moreOptions').prepend("<input id='menuOption" + inputOptionLength + "' class='input-form' type='text' placeholder='New Option Name'>");





        // // var initalOptions = JSON.parse(localStorage.getItem("options"));
        // var initialOptionsInput = JSON.parse(localStorage.getItem("optionsInput"));
        //
        // if (initialOptionsInput == null) {
        //     var optionsInputsArray = [];
        //
        //     arrayInputs = {option: "option"};
        //     optionsInputsArray.unshift(arrayInputs);
        //     localStorage.setItem("optionsInput", JSON.stringify(optionsInputsArray));
        //
        //     console.log("lenght of inputs");
        //     console.log("0")
        //
        //     $('#moreOptions').prepend("<input id='menuOption' class='input-form' type='text' placeholder='New Option Name'>");
        //
        // } else {
        //
        //     var optionsInputs = initialOptionsInput;
        //
        //     arrayInputs = {option: "option"};
        //     optionsInputs.unshift(arrayInputs);
        //     localStorage.setItem("optionsInput", JSON.stringify(optionsInputs));
        //
        //     console.log("Length of Inputs");
        //     console.log(optionsInputs);
        //     console.log(initialOptionsInput.length);
        //
        //     $('#moreOptions').prepend("<input id='menuOption' class='input-form' type='text' placeholder='New Option Name'>");
        //
        //     console.log("Number of Menu Options");
        //     console.log($("div#moreOptions input").length);
        // }
        // });
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


