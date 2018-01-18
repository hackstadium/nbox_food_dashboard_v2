$(function () {

    const BASE_URL = "http://staging.nairabox.com/foodhub/";

    getAllBundles();

    function getAllBundles() {
        $.ajax({
            url: BASE_URL + "bundles/all",
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


            for(i = 0; i < allBundles.message.length; i++){
                $("#bundlesTable").append("<tr>"
                    +"<td>" + allBundles.message[i].name+ "</td>"
                    +"<td>" + allBundles.message[i].category_name+ "</td>"
                    +"<td>" + allBundles.message[i].menu[0].name+ "</td>"
                    +"<td>" + allBundles.message[i].menu[0].options+ "</td>"
                    +"<td>" + allBundles.message[i].description+ "</td>"
                    +"<td>" + allBundles.message[i].menu[0].partner_name+ "</td>"
                    +"<td>" + allBundles.message[i].price+ "</td>"
                    +"<td><button class='btn_table'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
                    +"<td><button class='btn_table'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
                    +"</tr>");
            }

        });
    }



    $('#showModal').click(function () {
       var bundleDetailsTemplate = "<p>Hello I am a template</p>" + "<p>Another line in that template</p>"
        alertify.alert(bundleDetailsTemplate);

    });
});