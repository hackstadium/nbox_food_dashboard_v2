var categories = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        categories.getAllCategories();
    },

    getAllCategories: function () {
        console.log("Getting all categories");
        $.ajax({
            url: categories.BASE_URL + "categories/all",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (categories) {
            console.log(categories);
            console.log(categories.category);


            for (var i = 0; i < categories.message.length; i++) {

                // var bundleID = 92777711;

                $("#categoriesTable").append("<tr>"
                    + "<td>" + categories.message[i].category + "</td>"
                    // + "<td>" + regions.message[i].state + "</td>"
                    // + "<td>" + regions.message[i].city + "</td>"
                    // + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    }
}

categories.init();