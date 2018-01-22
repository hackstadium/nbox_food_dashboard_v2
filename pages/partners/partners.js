var partners = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",


    init: function () {
        partners.getAllPartners();

    },

    getAllPartners: function () {

        $("#partnersTable").html("");
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
                    + "<td><button class='btn_table' onclick='partners.openModalEditPartnerDetails(\"" + partners.message[i]._id + "\",\"" + partners.message[i].name + "\",\"" + partners.message[i].address + "\",\"" + partners.message[i].email + "\",\"" + partners.message[i].phone_number + "\",\"" + partners.message[i].commission + "\" )'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    + "<td><button class='btn_table' onclick='partners.deletePartner(\"" + partners.message[i]._id + "\",\"" + partners.message[i].name + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"

                    // + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    // + "<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    + "</tr>");
            }


        });
    },


    openModalEditPartnerDetails: function (partnerID, name, address, email, phone, commission) {
        console.log("Edit Partner Details");
        console.log(partnerID);
        console.log(name);
        console.log(address);
        console.log(email);
        console.log(phone);
        console.log(commission);


        var PartnerEditDetailsTemplate = "<div>"
            + "<div class='verticalInput'><strong>Name :  </strong><input id='modalPartnerInputName' type='text' value='" + name + "'></div>"
            + "<div class='verticalInput'><strong>Address :  </strong><input id='modalPartnerInputAddress' type='text' value='" + address + "'></div>"
            + "<div class='verticalInput'><strong>Email :  </strong><input id='modalPartnerInputEmail' type='text' value='" + email + "'></div>"
            + "<div class='verticalInput'><strong>Phone :  </strong><input id='modalPartnerInputPhone' type='text' value='" + phone + "'></div>"
            + "<div class='verticalInput'><strong>Commission :  </strong><input id='modalPartnerInputCommission' type='text' value='" + commission + "'></div>"
            + "</div>";


        alertify.confirm('Edit Partner', PartnerEditDetailsTemplate,
            function () {
                //alertify.success('UPDATE');
                console.log("Partner Modal ok clicked");
                partners.updatePartner(partnerID);
            },
            function () {

            }
        ).set({transition: 'zoom', label: ' UPDATE '}).show();
    },
    updatePartner: function (partnerID) {

        var updateName = $("#modalPartnerInputName").val();
        var updateAddress = $("#modalPartnerInputAddress").val();
        var updateEmail = $("#modalPartnerInputEmail").val();
        var updatePhone = $("#modalPartnerInputPhone").val();
        var updateCommission = $("#modalPartnerInputCommission").val();

        var partnerData = {partner_id: partnerID,address:updateAddress,email:updateEmail,phone_number:updatePhone,commission:updateCommission};

        $.ajax({
            url: partners.BASE_URL + "partner/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(partnerData),
            contentType: "application/json"
        }).done(function () {
            console.log("Value Updated");
            partners.getAllPartners();
        });


    },
    deletePartner:function (partnerID,name) {
        console.log("Delete Bundle with ID")
        console.log(partnerID);

        var deletePartnerData = {partner_id:partnerID};

        var deletePartnerTemplate = "<p>Delete</p><h5>" + name + "</h5>";


        alertify.confirm("Conform delete action", deletePartnerTemplate,
            function () {
                // alertify.success('Ok');
                $.ajax({
                    url: partners.BASE_URL + "partner/delete",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(deletePartnerData),
                    contentType: "application/json"
                }).done(function () {
                    console.log("Value Deleted");
                    partners.getAllPartners();
                });
            },
            function () {
                //alertify.error('Cancel');
            }).set({transition: 'zoom', label: ' DELETE '}).show();



    }

}

partners.init();