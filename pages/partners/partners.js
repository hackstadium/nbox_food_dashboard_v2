var partners = {

    BASE_URL: "http://staging.nairabox.com/foodhub/",


    init: function () {
        toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};
        partners.checkLogin();

    },


    checkLogin: function () {
        console.log("Nav to dashboard page");
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
            window.location.href = "../../pages/login/login.html";
            console.log("Not Logged In");
        } else {
            console.log("logged In");
            partners.getAllPartners();

        }
    },

    getAllPartners: function () {
        $("#preloaderNav").show();

        $("#partnersTable").html("");
        console.log("Getting all patners");
        $.ajax({
            url: partners.BASE_URL + "partners/all",
            type: "GET",
            crossDomain: true,
            contentType: "application/json"
        }).done(function (partners) {
            $("#preloaderNav").hide();

            console.log(partners);

            for (var i = 0; i < partners.message.length; i++) {

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
                console.log("Partner Modal ok clicked");
                //partners.updatePartner(partnerID);
                partners.validateInput(partnerID);
            },
            function () {

            }
        ).set({transition: 'zoom', labels: {ok: 'UPDATE', cancel: 'CANCEL'}}).show();
    },
    updatePartner: function (partnerID) {
        $("#preloaderNav").show();


        var updateName = $("#modalPartnerInputName").val();
        var updateAddress = $("#modalPartnerInputAddress").val();
        var updateEmail = $("#modalPartnerInputEmail").val();
        var updatePhone = $("#modalPartnerInputPhone").val();
        var updateCommission = $("#modalPartnerInputCommission").val();

        var partnerData = {
            partner_id: partnerID,
            name: updateName,
            address: updateAddress,
            email: updateEmail,
            phone_number: updatePhone,
            commission: updateCommission
        };

        $.ajax({
            url: partners.BASE_URL + "partner/update",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(partnerData),
            contentType: "application/json"
        }).done(function (partner) {
            $("#preloaderNav").hide();

            console.log("Value Updated");
            partners.getAllPartners();

            if (partner.error_code === 1) {
                toastr.error(partner.message);
            } else {
                toastr.success(partner.message);
            }
        });


    },
    deletePartner: function (partnerID, name) {

        console.log("Delete Bundle with ID")
        console.log(partnerID);

        var deletePartnerData = {partner_id: partnerID};

        var screensaverDeleteModalTemplate = "<div>"
            + "<h6 style='margin-bottom: 32px'>Are you sure you want to delete this ?</h6>"
            + "<div style='display: flex; align-items: center'>"
            + "<div class='file_name'>"
            + "<h6>Delete</h6>"
            + "<p>" + name + "</p>"
            + "</div>"
            + "</div>"
            + "</div>";

        alertify.confirm("Confirm Delete Action", screensaverDeleteModalTemplate,
            function () {
                $("#preloaderNav").show();
                $.ajax({
                    url: partners.BASE_URL + "partner/delete",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(deletePartnerData),
                    contentType: "application/json"
                }).done(function (partner) {
                    $("#preloaderNav").hide();

                    console.log("Value Deleted");
                    partners.getAllPartners();

                    if (partner.error_code === 1) {
                        toastr.error(partner.message);
                    } else {
                        toastr.success(partner.message);
                    }

                });
            }, function () {

            }
        ).set({transition: 'zoom', labels: {ok: 'DELETE', cancel: 'CANCEL'}}).show();


    },
    validateEmail: function (inputtext) {
        var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (inputtext.match(emailExp)) {
            return true;
        } else {
            return false;
        }

    },
    validateNumeric: function (inputtext) {
        var numericExpression = /^[0-9]+$/;
        if (inputtext.match(numericExpression)) {
            return true;
        } else {
            return false;
        }
    },

    validateInput: function (partnerID) {

        var updateName = $("#modalPartnerInputName").val();
        var updateAddress = $("#modalPartnerInputAddress").val();
        var updateEmail = $("#modalPartnerInputEmail").val();
        var updatePhone = $("#modalPartnerInputPhone").val();
        var updateCommission = $("#modalPartnerInputCommission").val();

        var emailisValid = partners.validateEmail(updateEmail);
        var phoneisValid = partners.validateNumeric(updatePhone);
        var commissionisValid = partners.validateNumeric(updateCommission);

        if (updateName !== "" && updateAddress !== "" && emailisValid && phoneisValid && commissionisValid) {
            console.log("All Data is correct");
            partners.updatePartner(partnerID);

        } else {
            toastr.warning("Invalid Input Values");
        }

    }

}

partners.init();
