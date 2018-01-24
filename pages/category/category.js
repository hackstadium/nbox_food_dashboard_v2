var categories = {
    BASE_URL: "http://staging.nairabox.com/foodhub/",
    init: function () {
        categories.getAllCategories();
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
        }).done(function (categories) {
            $("#preloaderNav").hide();

            console.log(categories);
            console.log("Category Partner Name");

            for (var i = 0; i < categories.message.length; i++) {

                $("#categoriesTable").append("<tr>"
                    + "<td>" + categories.message[i].category + "</td>"

                    + "<td><button class='btn_table' onclick='categories.openModalEditCategoryDetails(\"" + categories.message[i]._id + "\",\"" + categories.message[i].category + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='categories.deleteCategory(\"" + categories.message[i]._id + "\",\"" + categories.message[i].category + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }

        });
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
                    categories.updateCategory(categoryID);
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
        }).done(function () {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            categories.getAllCategories();
        });

    },
    deleteCategory: function (categoryID, category) {


        var deleteCategoryData = {category_id: categoryID};

        var deleteCategoryTemplate = "<p>Delete</p><h5>" + category + "</h5>";


        alertify.confirm("Conform delete action", deleteCategoryTemplate,
            function () {
                $("#preloaderNav").show();

                $.ajax({
                    url: categories.BASE_URL + "category/delete",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(deleteCategoryData),
                    contentType: "application/json"
                }).done(function () {
                    $("#preloaderNav").hide();

                    console.log("Value Deleted");
                    categories.getAllCategories();
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
    }

}

categories.init();