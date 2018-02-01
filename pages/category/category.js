var categories = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        // categories.getAllCategories();
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "5000"};
        categories.checkLogin();
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
            // bundles.getAllbundles();
            //createLocation.getCountries();
            categories.getAllCategories();


        }
    },

    getAllCategories: function () {
        $("#preloaderNav").show();


        $("#categoriesTable").html("");
        console.log("Getting all categories");
        $.ajax({
            url: categories.BASE_URL + "categories/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (cat) {
            $("#preloaderNav").hide();

            console.log(cat);
            console.log("Category Partner Name");
            console.log(cat.message[1].partners);

            for (var i = 0; i < cat.message.length; i++) {

                //categories.allPartners = categories.message;
                //bundles.allMenu = allBundles.message;
                // debugger;
                categories.allMenu = cat.message;


                $("#categoriesTable").append("<tr>"
                    + "<td class='table_cell_link pointer' onclick='categories.openModalCategoryDetails(\"" + cat.message[i].category + "\", \"" + i + "\")'>" + cat.message[i].category + "</td>"

                    + "<td><button class='btn_table' onclick='categories.openModalEditCategoryDetails(\"" + cat.message[i]._id + "\",\"" + cat.message[i].category + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='categories.deleteCategory(\"" + cat.message[i]._id + "\",\"" + cat.message[i].category + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
    },


    openModalCategoryDetails: function (category, partnerIndex) {
        // debugger;
        //var partnerArray = categories.allPartners;
        var partnersArray = categories.allMenu[partnerIndex];


        console.log(category);
        // var menuArray = bundles.allMenu[menuIndex];
        // var menuArray = bundles.allMenu[menuIndex];

        console.log(partnersArray);
        //console.log(partnerArray);
        $("#bundleCategoriesTable").html("");

        var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
            // + "<div class='multiList'><strong>Name</strong><p>" + name + " </p></div>"
            + "<div class='multiList'><strong>Category</strong><p>" + category + "</p></div>"
            // + "<div class='multiList'><strong>Description</strong><p>" + description + " </p></div>"
            // + "<div class='multiList'><strong>Price</strong><p> NGN " + parseInt(price, 10).toLocaleString() + " </p></div>"
            + "<div><strong>Partners</strong><table class='table table-striped'>" +
            "<thead>" +
            "                            <tr>" +
            // "                                <th>Partner</th>" +
            "                                <th>Partner</th>" +
             "                                <th>State</th>" +
            "                                <th>City</th>" +
            "                            </tr>" +
            "                            </thead>" +
            "                            <tbody id='bundleCategoriesTable'>" +
            "                            </tbody>" +
            "                        </table></div></div>";

        alertify.alert('Category Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
        for (var i = 0; i < partnersArray.partners.length; i++) {
            var one = partnersArray.partners[i];
            $("#bundleCategoriesTable").append("<tr>"
                + "<td>" + one.name + "</td>"
                + "<td>" + one.state + "</td>"
                + "<td>" + one.city + "</td>"

                // + "<td>" + one.partner_name + "</td>"
                // + "<td>NGN " + parseInt(one.price, 10).toLocaleString() + "</td>"
                + "</tr>");
        }

    },

    openModalEditCategoryDetails: function (categoryID, category) {
        $("#preloaderNav").show();

        console.log("Edit Modal Clicked");
        console.log(categoryID);

        $.ajax({
            url: categories.BASE_URL + "category?category_id=" + categoryID,
            type: "GET",
            crossDomain: true,
            contentType: "application/json"

        }).done(function (category) {
            $("#preloaderNav").hide();

            console.log("One Category Detail")
            console.log(category.message.partners.length);
            $("#categoriesPartnersTable").html("");

            var globalCategoryID = 123;

            //
            // for (var i = 0; i < category.message.partners.length; i++) {
            //     // $("#categoriesPartnersTable").append("<tr>"
            //     //     + "<td>" + category.message.partners[i].name + "</td>"
            //     //     +"</tr>"
            //     // )
            //
            //     // $("#partnerInput").append("<ul><li>" + category.message.partners[0].name + "<li></ul>" )
            //
            //
            //     var RegionEditDetaillsTemplate = "<div>"
            //         + "<div class='verticalInput'><strong>Category :  </strong><input id='modalCategoryInputCategory' type='text' value='" + category.message.category + "'></div>"
            //         + "<p id='partnerInput'></p>"
            //         + "<div><table class='table table-striped'>"
            //         + "<thead>"
            //         + "<tr class=>"
            //         + "<th>Partners</th>"
            //         + "<th></th>"
            //         + "</tr>"
            //         + "</thead>"
            //         + "<tbody id='categoriesPartnersTable'>"
            //         + "<tr>"
            //         + "<td>" + category.message.partners[i].name + "</td>"
            //         + "<td><button class='btn_table' onclick='categories.deletePartnerCategory(\"" + category.message.partner_id[i] + "\", \"" + category.message._id + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
            //         + "</tr>"
            //         + "</tbody>"
            //         + "</table></div>"
            //         + "</div>";
            //
            // }

            var RegionEditDetaillsTemplate = "<div>"
                + "<div class='verticalInput'><strong>Category :  </strong><input id='modalCategoryInputCategory' type='text' value='" + category.message.category + "'></div>"
                + "</div>";


            alertify.confirm('Edit Category', RegionEditDetaillsTemplate,
                function () {
                    console.log("Category Modal ok clicked");
                    //categories.updateCategory(categoryID);
                    categories.validateInput(categoryID);
                },
                function () {

                }
            ).set({transition: 'zoom', label: ' UPDATE '}).show();
        });


    },

    updateCategory: function (categoryID, category) {
        $("#preloaderNav").show();

        var updateCategory = $("#modalCategoryInputCategory").val();

        var categoryData = {category_id: categoryID, category: updateCategory};
        $.ajax({
            url: categories.BASE_URL + "category/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(categoryData),
            contentType: "application/json"
        }).done(function (category) {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            categories.getAllCategories();

            if (category.error_code === 1) {
                toastr.error(category.message);
            } else {
                toastr.success(category.message);
            }
        });

    },
    deleteCategory: function (categoryID, category) {


        var deleteCategoryData = {category_id: categoryID};

        //  var deleteCategoryTemplate = "<p>Confi</p><h5>" + category + "</h5>";


        var deleteCategoryTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Are you sure you want to delete this ?</h6>"
            + "<div style='display: flex; flex-direction: column'>"
            // + "<img style='width: 100px' src='" + image + "'> "
            // + "<div class='file_name'>"
            + "<h6>Category </h6>"
            + "<p>" + category + "</p>"
            // + "</div>"
            + "</div>"
            + "</div>";


        alertify.confirm("Conform delete action", deleteCategoryTemplate,
            function () {
                $("#preloaderNav").show();

                $.ajax({
                    url: categories.BASE_URL + "category/delete",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(deleteCategoryData),
                    contentType: "application/json"
                }).done(function (category) {
                    $("#preloaderNav").hide();

                    console.log("Value Deleted");
                    categories.getAllCategories();
                    if (category.error_code === 1) {
                        toastr.error(category.message);
                    } else {
                        toastr.success(category.message);
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            }).set({transition: 'zoom', label: ' DELETE '}).show();
    },

    deletePartnerCategory: function (partnerID, categoryID) {
        $("#preloaderNav").show();

        console.log("Deleting partner from category");
        console.log("Deleting with Partner ID");
        console.log(partnerID);

        console.log("Deleting with Category ID");
        console.log(categoryID);

        var deleteCategoryPartnerData = {partner_id: partnerID, category_id: categoryID};


        $.ajax({
            url: categories.BASE_URL + "category/del/partner",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(deleteCategoryPartnerData),
            contentType: "application/json"
        }).done(function (message) {
            $("#preloaderNav").hide();

            console.log(message);
        })
    },

    validateInput: function (categoryID) {
        var category = $("#modalCategoryInputCategory").val();

        if (category === "") {
            $("#modalCategoryInputCategory").addClass("error_input");
            toastr.warning("Invalid Input Values");

        } else {
            $("#modalCategoryInputCategory").removeClass("error_input");
            categories.updateCategory(categoryID);
        }
    }

}

categories.init();