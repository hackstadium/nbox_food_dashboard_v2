var partners = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",


    init: function () {
        partners.getAllPartners();

    },

    getAllPartners: function () {
        console.log("Getting all patners");
       // app.showNotification("hello from partners JS");
        $.ajax({
            url: partners.BASE_URL + "partners/all",
            type: "GET",
            crossDomain: true,
            // data: JSON.stringify(countryData),
            contentType: "application/json"
        }).done(function (partners) {
            console.log(partners);
            console.log(partners.message[0].name);
            console.log(partners.message[0].address);
            console.log(partners.message[0].country);
            console.log(partners.message[0].city);
            console.log(partners.message[0].state);
            console.log(partners.message[0].email);
            console.log(partners.message[0].phone_number);
            console.log(partners.message[0].commission);


            for (var i = 0; i < partners.message.length; i++) {

                // var bundleID = 92777711;

                $("#partnersTable").append("<tr>"
                    + "<td>" + partners.message[i].name + "</td>"
                    + "<td>" + partners.message[i].address + "</td>"
                    + "<td>" + partners.message[i].country + "</td>"
                    + "<td>" + partners.message[i].state + "</td>"
                    + "<td>" + partners.message[i].city + "</td>"
                    + "<td>" + partners.message[i].email + "</td>"
                    + "<td>" + partners.message[i].phone_number + "</td>"
                    + "<td>" + partners.message[i].commission + "</td>"
                    // + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }


        });
    },

}

partners.init();