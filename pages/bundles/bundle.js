//const BASE_URL = "http://staging.nairabox.com/foodhub/";

//  getAllBundles();
var bundles = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        // bundles.getAllbundles();
        bundles.checkLogin();
    },

    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            // window.location.href = "../../pages/dashboard/index.html";
            console.log("logged In");
            bundles.getAllbundles();
        }
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
            // console.log("Listing Menu")
            // console.log(allBundles.message.menu);

            for (var i = 0; i < allBundles.message.length; i++) {

                console.log("Listing Menu");
                console.log(allBundles.message[i].menu);
                console.log(allBundles.message[i].menu[0].name);
                bundles.allMenu = allBundles.message;


                $("#bundlesTable").append("<tr>"
                    + "<td class='table_cell_link pointer' onclick='bundles.openModalBundleDetails(\"" + allBundles.message[i]._id + "\",\"" + allBundles.message[i].name + "\",\"" + allBundles.message[i].category_name + "\",\"" + allBundles.message[i].description + "\", \"" + allBundles.message[i].price + "\", \"" + i + "\")'>" + allBundles.message[i].name + "</td>"
                    + "<td>" + allBundles.message[i].category_name + "</td>"
                    + "<td>" + allBundles.message[i].description + "</td>"
                    // + "<td>" + allBundles.message[i].menu[0].partner_name + "</td>"
                    // + "<td>" + allBundles.message[i].price + "</td>"
                    + "<td> NGN " + parseInt(allBundles.message[i].price, 10).toLocaleString() + "</td>"

                    + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='bundles.deleteBundle(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },
    openModalBundleDetails: function (bundleID, name, category, description, price, menuIndex) {
        var menuArray = bundles.allMenu[menuIndex];
        $("#preloaderNav").show();

        console.log("clicked to open Modal");
        console.log(bundleID);
        console.log(name);
        console.log(category);
        console.log(description);
        console.log(price);
        // console.log(menuArray);
        console.log("Passed Menus");
        console.log(menuArray);


        $("#bundleMenusTable").html("");
        var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
            + "<div class='multiList'><strong>Name</strong><p>" + name + " </p></div>"
            + "<div class='multiList'><strong>Category</strong><p>" + category + "</p></div>"
            + "<div class='multiList'><strong>Description</strong><p>" + description + " </p></div>"
            + "<div class='multiList'><strong>Price</strong><p> NGN " + parseInt(price, 10).toLocaleString() + " </p></div>"
            + "<div><strong>Menus</strong><table class='table table-striped'>" +
            "<thead>" +
            "                            <tr>" +
            "                                <th>Menu</th>" +
            "                                <th>Partner</th>" +
            "                                <th>Price</th>" +
            "                            </tr>" +
            "                            </thead>" +
            "                            <tbody id='bundleMenusTable'>" +
            "                            </tbody>" +
            "                        </table></div></div>";

        alertify.alert('Bundle Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
        for (var i = 0; i < menuArray.menu.length; i++) {
            var one = menuArray.menu[i];
            $("#bundleMenusTable").append("<tr>"
                + "<td>" + one.name + "</td>"
                + "<td>" + one.partner_name + "</td>"
                + "<td>NGN " + parseInt(one.price, 10).toLocaleString() + "</td>"
                + "</tr>");
        }


        ///////////////

        // var bundleData = {category_id: categoryID, bundle_id: bundleID}
        // $.ajax({
        //     url: bundles.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
        //     type: "GET",
        //     crossDomain: true,
        //     data: JSON.stringify(bundleData),
        //     contentType: "application/json"
        // }).done(function (bundle) {
        //     $("#preloaderNav").hide();
        //
        //     console.log("One Bundle");
        //     console.log(bundle.message.menu.length);
        //     console.log(bundle);
        //
        //     console.log("Bundle Price");
        //     var total = "12345";
        //     console.log(parseInt(total, 10).toLocaleString());
        //     console.log(parseInt(bundle.message.price, 10).toLocaleString());
        //
        //
        //     var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
        //         + "<div class='multiList'><strong>Name</strong><p>" + bundle.message.name + " </p></div>"
        //         + "<div class='multiList'><strong>Category</strong><p>" + bundle.message.category_name +"</p></div>"
        //         + "<div class='multiList'><strong>Description</strong><p>" + bundle.message.description + " </p></div>"
        //         + "<div class='multiList'><strong>Price</strong><p> NGN " + parseInt(bundle.message.price, 10).toLocaleString() + " </p></div>"
        //         + "<div><strong>Menus</strong><table class='table table-striped'>" +
        //         "<thead>" +
        //         "                            <tr>" +
        //         "                                <th>Menu</th>" +
        //         "                                <th>Partner</th>" +
        //         "                                <th>Price</th>" +
        //         "                            </tr>" +
        //         "                            </thead>" +
        //         "                            <tbody id='bundleMenusTable'>" +
        //         "                            </tbody>" +
        //         "                        </table></div></div>";
        //
        //     alertify.alert('Bundle Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
        //     for (var i = 0; i < bundle.message.menu.length; i++) {
        //
        //         $("#bundleMenusTable").append("<tr>"
        //             + "<td>" + bundle.message.menu[i].name + "</td>"
        //             + "<td>" + bundle.message.menu[i].partner_name + "</td>"
        //             + "<td>NGN " + parseInt(bundle.message.menu[i].price, 10).toLocaleString() + "</td>"
        //             + "</tr>");
        //     }
        // });
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
