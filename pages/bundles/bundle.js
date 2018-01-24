//const BASE_URL = "http://staging.nairabox.com/foodhub/";

//  getAllBundles();
var bundles = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        bundles.getAllbundles();
    },
    getAllbundles: function () {
        $("#preloaderNav").show();

        $("#bundlesTable").html("");
        $.ajax({
            url: bundles.BASE_URL + "bundles/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (allBundles) {
            $("#preloaderNav").hide();

            console.log(allBundles);
            console.log(allBundles.message[0].name);
            console.log(allBundles.message[0].category_name);
            console.log(allBundles.message[0].menu[0].name);
            console.log(allBundles.message[0].menu[0].options[0]);
            console.log(allBundles.message[0].menu[0].options[1]);
            console.log(allBundles.message[0].description);
            console.log(allBundles.message[0].menu[0].partner_name);
            console.log(allBundles.message[0].price);


            for (var i = 0; i < allBundles.message.length; i++) {

                $("#bundlesTable").append("<tr>"
                    + "<td class='table_cell_link pointer' onclick='bundles.openModalBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'>" + allBundles.message[i].name + "</td>"
                    + "<td>" + allBundles.message[i].category_name + "</td>"
                    + "<td>" + allBundles.message[i].description + "</td>"
                    + "<td>" + allBundles.message[i].menu[0].partner_name + "</td>"
                    + "<td>" + allBundles.message[i].price + "</td>"
                    + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='bundles.deleteBundle(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },
    openModalBundleDetails: function (categoryID, bundleID) {
        $("#preloaderNav").show();

        console.log("clicked to open Modal");
        console.log(categoryID);
        console.log(bundleID);
        var bundleData = {category_id: categoryID, bundle_id: bundleID}
        $.ajax({
            url: bundles.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
            type: "GET",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundle) {
            $("#preloaderNav").hide();

            console.log("One Bundle");
            console.log(bundle.message.menu.length);
            console.log(bundle);
            var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
                + "<div class='multiList'><strong>Name</strong><p>" + bundle.message.name + " </p></div>"
                + "<div class='multiList'><strong>Menus</strong><p id='bundleDetailsMenus'></p></p></div>"
                + "<div class='multiList'><strong>Options</strong><p id='bundleDetailsOptions'></p></p></div>"
                + "<div class='multiList'><strong>Description</strong><p>" + bundle.message.description + " </p></div>"
                + "<div class='multiList'><strong>Price</strong><p>" + bundle.message.price + " </p></div></div>";


            alertify.alert('Bundle Details',bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
            for (var i = 0; i < bundle.message.menu.length; i++) {
                $('#bundleDetailsMenus').html("");
                $('#bundleDetailsOptions').html("");

                $('#bundleDetailsMenus').append("<li>" + bundle.message.menu[i].name + "</li>");
                $('#bundleDetailsOptions').append("<li>" + bundle.message.menu[i].options + "</li>");
                console.log("listing menu");
            }

        });

    },
    openModalEditBundleDetails: function (categoryID, bundleID) {
        $("#preloaderNav").show();

        console.log("Edit Modal Clicked");
        console.log(categoryID);
        console.log(bundleID);
        var bundleData = {category_id: categoryID, bundle_id: bundleID}

        $.ajax({
            url: bundles.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
            type: "GET",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundle) {
            $("#preloaderNav").hide();

            var bundleEditDetaillsTemplate = "<div>"
                + "<div class='verticalInput'><strong>Bundle Name :  </strong><input id='modalBundlesInputName' type='text' value='" + bundle.message.name + "'></div>"
                + "<div class='verticalInput'><strong>Description :  </strong><input id='modalBundlesInputDescription' type='text' value='" + bundle.message.description + "'></div>"
                + "<div class='verticalInput'><strong>Price :  </strong><input id='modalBundlesInputPrice' type='text' value='" + bundle.message.price + "'></div>"
                + "</div>";

            alertify.confirm('Edit Bundle', bundleEditDetaillsTemplate,
                function () {
                    console.log("Modal ok clicked");
                    bundles.updateBundle(bundleID);
                },
                function () {

                }
            ).set({transition: 'zoom', label: ' UPDATE '}).show();


        })
    },

    updateBundle: function (bundleID) {
        $("#preloaderNav").show();


        var updateName = $("#modalBundlesInputName").val();
        var updateDescription = $("#modalBundlesInputDescription").val();
        var updatePrice = $("#modalBundlesInputPrice").val();

        var updateBundleData = {
            bundle_id: bundleID,
            name: updateName,
            price: updatePrice,
            description: updateDescription
        }


        console.log("Bundle ID");
        console.log(bundleID);

        $.ajax({
            url: bundles.BASE_URL + "bundle/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(updateBundleData),
            contentType: "application/json"
        }).done(function () {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            bundles.getAllbundles();
        });
    },

    deleteBundle: function (categoryID, bundleID) {
        $("#preloaderNav").show();

        console.log("Delete Bundle with ID")
        console.log(bundleID);

        var bundleData = {category_id: categoryID, bundle_id: bundleID}

        var deleteBundleData = {bundle_id: bundleID};


        $.ajax({
            url: bundles.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
            type: "GET",
            crossDomain: true,
            data: JSON.stringify(bundleData),
            contentType: "application/json"
        }).done(function (bundle) {
            $("#preloaderNav").hide();

            var deleteBundleTemplate = "<p>Delete</p><h5>" + bundle.message.name + "</h5>";

            alertify.confirm("Conform delete action", deleteBundleTemplate,
                function () {
                    $.ajax({
                        url: bundles.BASE_URL + "bundle/delete",
                        type: "POST",
                        crossDomain: true,
                        data: JSON.stringify(deleteBundleData),
                        contentType: "application/json"
                    }).done(function () {
                        console.log("Value Deleted");
                        bundles.getAllbundles();
                    });
                },
                function () {
                }).set({transition: 'zoom', label: ' DELETE '}).show();
        });


    }
}
bundles.init();
