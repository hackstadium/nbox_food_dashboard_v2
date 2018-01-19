var regions = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        regions.getAllRegions();
    },

    getAllRegions: function () {
        console.log("Getting all regions");
        $.ajax({
            url: regions.BASE_URL + "cities/all",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (regions) {
            console.log(regions);
            console.log(regions.message[0].country);
            console.log(regions.message[0].state);
            console.log(regions.message[0].city);


            for (var i = 0; i < regions.message.length; i++) {

                // var bundleID = 92777711;

                $("#regionsTable").append("<tr>"
                    + "<td>" + regions.message[i].country + "</td>"
                    + "<td>" + regions.message[i].state + "</td>"
                    + "<td>" + regions.message[i].city + "</td>"
                    // + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }


        });
    }
}

regions.init();