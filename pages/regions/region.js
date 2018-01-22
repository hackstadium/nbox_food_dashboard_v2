var regions = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        regions.getAllRegions();

    },

    getAllRegions: function () {
        console.log("Getting all regions");
        regions.showNotifcation("Loading Message");
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
                    + "<td><button class='btn_table' onclick='regions.openModalEditBundleDetails(\"" + regions.message[i].category_id + "\",\"" + regions.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },

    openModalEditBundleDetails: function (categoryID, bundleID) {
        console.log("Edit Modal Clicked");
        console.log(categoryID);
        console.log(bundleID);
        var bundleData = {category_id: categoryID, bundle_id: bundleID}

        $.ajax({
            url: regions.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
            type: "GET",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundle) {
            var bundleEditDetaillsTemplate = "<div>"
                + "<p><strong>Name :  </strong><input type='text' value='" + regions.message.name + "'>" + "</span></p>"
                + "<p><strong>Description :  </strong><input type='text' value='" + regions.message.description + "'>" + "</span></p>"
                + "<p><strong>Price :  </strong><input type='text' value='" + regions.message.price + "'>" + "</span></p>"
                + "</div>";

            alertify.alert(bundleEditDetaillsTemplate);

        })
    },
    
    showNotifcation:function (message, messageType) {
        console.log("Fired ShowNotifaction");
        var noftifyConfig = { showAnimation: 'fadeIn', hideAnimation: 'fadeIn',};
        $.notify(message,messageType, noftifyConfig);
    }


}

regions.init();