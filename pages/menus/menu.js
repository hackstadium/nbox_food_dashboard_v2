$(function () {
    console.log("menu js found");
    console.log("menu js ready");

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
                $("#menuSelectCountry").append("<option data-id=" + countries.message[i]._id + ">" + countries.message[i].country + "</option>");
                console.log("adding countries");
            }
        });
    }


    $("#menuSelectCountry").change(function () {
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
            $("#menuSelectState").html("");

            for (i = 0; i < states.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#menuSelectState").append("<option data-id=" + states.message[i]._id + ">" + states.message[i].state + "</option>");
                console.log("adding states");
            }
        })
    }


    $("#menuSelectState").change(function () {
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
            $("#menuSelectCity").html("");

            for (i = 0; i < cities.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#menuSelectCity").append("<option data-id=" + cities.message[i]._id + ">" + cities.message[i].city + "</option>");
                console.log("adding cities");
            }
        })
    }

    $("#menuSelectCity").click(function () {
        console.log("selelct city clicked");
        var cityID = $(this).find(":selected").data("id");
        console.log(cityID);
        getPartner(cityID);
        getCategory(cityID);
    });


    // function getPartner(cityID) {
    //     $.ajax({
    //         url: BASE_URL + "partners?city_id=" + cityID,
    //         type: "GET",
    //         crossDomain: true,
    //         // data: JSON.stringify(countryData),
    //         contentType: "application/json"
    //     }).done(function (partners) {
    //         console.log(partners);
    //         $("#bundlesSelectPartner").html("");
    //
    //         for (i = 0; i < partners.message.length; i++) {
    //             //console.log(countries.message[i]._id);
    //             $("#bundlesSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
    //             console.log("adding partners");
    //         }
    //     })
    // }

    function getCategory(cityID) {
        $.ajax({
            url: BASE_URL + "categories?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);

            $("#menuSelectCategory").html("");

            for (i = 0; i < categories.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#menuSelectCategory").append("<option data-id=" + categories.message[i]._id + ">" + categories.message[i].category + "</option>");
                console.log("adding categories");
            }

        });
    }


    $("#menuSelectCategory").click(function () {
        console.log("selelct city clicked");
        var categoryID = $(this).find(":selected").data("id");
       // var categoryID = $(this).find(":selected").data("id");

        console.log(categoryID);
      //  getPartner(cityID);
        getBundles(categoryID);
    });

    function getPartner(cityID) {
        $.ajax({
            url: BASE_URL + "partners?city_id=" + cityID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);
            $("#menuSelectPartner").html("");

            for (i = 0; i < partners.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#menuSelectPartner").append("<option data-id=" + partners.message[i]._id + ">" + partners.message[i].name + "</option>");
                console.log("adding partners");
            }
        })
    }


    function getBundles(categoryID) {
        // var menuData = {bundle_id:bundleID,name:name};
        $.ajax({
            url: BASE_URL + "bundles?category_id=" + categoryID,
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (bundles) {
            console.log(bundles);

            $("#menuSelectBundle").html("");

            for (i = 0; i < bundles.message.length; i++) {
                //console.log(countries.message[i]._id);
                $("#menuSelectBundle").append("<option data-id=" + bundles.message[i]._id + ">" + bundles.message[i].name + "</option>");
                console.log("adding categories");
            }

        });
    }

    $("#addMenu").click(function () {

       // 'name', 'price', 'category_id', 'description'
        var name = $("#menuInputName").val();
         //var partnerID = $("#menuSelectPartner").val();
        var bundleID = $("#menuSelectBundle").find(":selected").data("id");
        var partnerID = $("#menuSelectPartner").find(":selected").data("id");

        //  var description = "description here";

        console.log(name + " - " + bundleID);

        addMenu(name, partnerID, bundleID);

    });


    function addMenu(name, partnerID, bundleID) {
        // var menuData = {menu:{menu: name, partner_id:"5a5f1cbd830f78685572d371",options:["coke","malt"]},bundle_id: bundleID};


        var menuData = {menu: {name: name, partner_id: partnerID, options: ["5Alive", "Lemon"]}, bundle_id: bundleID};


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

});