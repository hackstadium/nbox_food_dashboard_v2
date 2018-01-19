//const BASE_URL = "http://staging.nairabox.com/foodhub/";

//  getAllBundles();
var bundles = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        bundles.getAllbundles();
    },
    getAllbundles: function () {
        $.ajax({
            url: bundles.BASE_URL + "bundles/all",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (allBundles) {
            console.log(allBundles);
            console.log(allBundles.message[0].name);
            console.log(allBundles.message[0].category_name);
            console.log(allBundles.message[0].menu[0].name);
            console.log(allBundles.message[0].menu[0].options[0]);
            console.log(allBundles.message[0].menu[0].options[1]);
            console.log(allBundles.message[0].description);
            console.log(allBundles.message[0].menu[0].partner_name);
            console.log(allBundles.message[0].price);


            // resultTemplate += "<"


            for (var i = 0; i < allBundles.message.length; i++) {

                // var bundleID = 92777711;

                $("#bundlesTable").append("<tr>"
                    + "<td class='table_cell_link pointer' onclick='bundles.openModalBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'>" + allBundles.message[i].name + "</td>"
                    + "<td>" + allBundles.message[i].category_name + "</td>"
                    // + "<td>" + allBundles.message[i].menu[0].name + "</td>"
                    // + "<td>" + allBundles.message[i].menu[0].options + "</td>"
                    + "<td>" + allBundles.message[i].description + "</td>"
                    + "<td>" + allBundles.message[i].menu[0].partner_name + "</td>"
                    + "<td>" + allBundles.message[i].price + "</td>"
                    + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },
    openModalBundleDetails: function (categoryID, bundleID) {
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
            console.log("One Bundle");
            console.log(bundle.message.menu.length);
            console.log(bundle);
            var bundleDetailsTemplate = "<div id='modalBundleDetails'><p>Bundle ID is - " + bundleID + "</p>"
                + "<p>Category ID is - " + categoryID + "</p>"
                + "<h3>Bundle Details</h3>"
                + "<p><strong>Name - </strong>" + bundle.message.name + " </p>"
                + "<p><strong>Menus </strong><ul id='bundleDetailsMenus'></ul></p>"
                + "<p><strong>Options </strong><ul id='bundleDetailsOptions'></ul></p>"
                // +"<p><strong>Partners </strong><ul id='bundleDetailsPartners'></ul></p>"
                + "<p><strong>Description - </strong>" + bundle.message.description + " </p></div>"
                + "<p><strong>Price - </strong>" + bundle.message.price + " </p></div>";


            alertify.alert(bundleDetailsTemplate);
            for (var i = 0; i < bundle.message.menu.length; i++) {
                $('#bundleDetailsMenus').html("");
                $('#bundleDetailsOptions').html("");

                $('#bundleDetailsMenus').append("<li>" + bundle.message.menu[i].name + "</li>");
                $('#bundleDetailsOptions').append("<li>" + bundle.message.menu[i].options + "</li>");
                // $('#bundleDetailsPartners').append("<li>"+bundle.message.menu[i].part)
                console.log("listing menu");
            }

            // for (var i = 0; i < bundle.message.menu.options.length; i++) {
            //     $('#bundleDetailsOptions').append("<li>" + bundle.message.menu[0].options[i] + "</li>");
            //     console.log("listing options");
            // }
        });

    },
    openModalEditBundleDetails: function (categoryID, bundleID) {
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
            var bundleEditDetaillsTemplate = "<div>"
                + "<p><strong>Name :  </strong><input type='text' value='" + bundle.message.name + "'>" + "</span></p>"
                + "<p><strong>Description :  </strong><input type='text' value='" + bundle.message.description + "'>" + "</span></p>"
                + "<p><strong>Price :  </strong><input type='text' value='" + bundle.message.price + "'>" + "</span></p>"
                + "</div>";

            alertify.alert(bundleEditDetaillsTemplate);

        })
    }
}
bundles.init();

// function getAllBundles() {
//     $.ajax({
//         url: BASE_URL + "bundles/all",
//         type: "GET",
//         crossDomain: true,
//         // data: JSON.stringify(countryData),
//         contentType: "application/json"
//     }).done(function (allBundles) {
//         console.log(allBundles);
//         console.log(allBundles.message[0].name);
//         console.log(allBundles.message[0].category_name);
//         console.log(allBundles.message[0].menu[0].name);
//         console.log(allBundles.message[0].menu[0].options[0]);
//         console.log(allBundles.message[0].menu[0].options[1]);
//         console.log(allBundles.message[0].description);
//         console.log(allBundles.message[0].menu[0].partner_name);
//         console.log(allBundles.message[0].price);
//
//
//         // resultTemplate += "<"
//
//
//         for (var i = 0; i < allBundles.message.length; i++) {
//             $("#bundlesTable").append("<tr>"
//                 + "<td onclick='openModalBundleDetail()'>" + allBundles.message[i].name + "</td>"
//                 + "<td>" + allBundles.message[i].category_name + "</td>"
//                 + "<td>" + allBundles.message[i].menu[0].name + "</td>"
//                 + "<td>" + allBundles.message[i].menu[0].options + "</td>"
//                 + "<td>" + allBundles.message[i].description + "</td>"
//                 + "<td>" + allBundles.message[i].menu[0].partner_name + "</td>"
//                 + "<td>" + allBundles.message[i].price + "</td>"
//                 + "<td><button class='btn_table'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
//                 + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
//                 + "</tr>");
//         }
//
//     });
//
//     function openModalBundleDetail() {
//         console.log("clicked to open Modal");
//     }
// }
//
//
// $('#showModal').click(function () {
//     var bundleDetailsTemplate = "<p>Hello I am a template</p>" + "<p>Another line in that template</p>"
//     alertify.alert(bundleDetailsTemplate);
//
// });


