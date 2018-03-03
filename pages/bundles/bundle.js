var bundles = {
  BASE_URL: "http://staging.nairabox.com/foodhub/",
  init: function () {
    bundles.checkLogin();
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};

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

      for (var i = 0; i < allBundles.message.length; i++) {

        console.log("Listing Menu");
        console.log(allBundles.message[i].menu);
        //  console.log(allBundles.message[i].menu[0].name);
        bundles.allMenu = allBundles.message;


        $("#bundlesTable").append("<tr>"
        + "<td><img src='" + allBundles.message[i].image + "' style='width: 70px;margin-left: 32px'></td>"
        + "<td class='table_cell_link pointer' onclick='bundles.openModalBundleDetails(\"" + allBundles.message[i]._id + "\",\"" + allBundles.message[i].name + "\",\"" + allBundles.message[i].category_name + "\",\"" + allBundles.message[i].description + "\", \"" + allBundles.message[i].price + "\", \"" + i + "\")'>" + allBundles.message[i].name + "</td>"
        + "<td>" + allBundles.message[i].category_name + "</td>"
        + "<td>" + allBundles.message[i].description + "</td>"
        + "<td> NGN " + parseInt(allBundles.message[i].price, 10).toLocaleString() + "</td>"
        + "<td><button class='btn_table' onclick='bundles.openModalEditBundleDetails(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
        + "<td><button class='btn_table' onclick='bundles.deleteBundle(\"" + allBundles.message[i].category_id + "\",\"" + allBundles.message[i]._id + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
        + "</tr>");
      }

    });
  },
  openModalBundleDetails: function (bundleID, name, category, description, price, menuIndex) {
    var menuArray = bundles.allMenu[menuIndex];
    console.log("clicked to open Modal");
    console.log(bundleID);
    console.log(name);
    console.log(category);
    console.log(description);
    console.log(price);
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
    "<tr>" +
    "<th>Menu</th>" +
    "<th>Partner</th>" +
    "<th>Price</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody id='bundleMenusTable'>" +
    "</tbody>" +
    "</table></div></div>";

    alertify.alert('Bundle Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
    for (var i = 0; i < menuArray.menu.length; i++) {
      var one = menuArray.menu[i];
      $("#bundleMenusTable").append("<tr>"
      + "<td>" + one.name + "</td>"
      + "<td>" + one.partner_name + "</td>"
      + "<td>NGN " + parseInt(one.price, 10).toLocaleString() + "</td>"
      + "<td><button class='btn_table' onclick='bundles.openModalEditBundleMenu(\"" + bundleID + "\",\"" + i + "\",\"" + one.partner_id + "\",\"" + one.name + "\",\"" + one.price + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
      + "</tr>");
    }

  },

  openModalEditBundleMenu:function (bundleID, menuID, partnerID, name, price) {
    console.log("openModalEditBundleMenu");
    console.log(bundleID);
    console.log(menuID);




          var bundleMenuEditsTemplate = "<div>"
          + "<div class='verticalInput'><strong>Menu Name :  </strong><input id='bundleMenuName' type='text' value='" + name + "'></div>"
          + "<div class='verticalInput'><strong>Price :  </strong><input id='bundleMenuPrice' type='text' value='" + price + "'></div>"
          + "</div>";


          alertify.confirm('Edit Menu', bundleMenuEditsTemplate,
          function () {
bundles.updateBundleMenu(bundleID,menuID,partnerID);
          },
          function () {

          }
        ).set({transition: 'zoom', labels: {ok: 'UPDATE', cancel: 'CANCEL'}}).show();





  },

  updateBundleMenu:function (bundleID,menuID,partnerID) {
    var updateMenuName = $("#bundleMenuName").val();
    var updateMenuPrice = $("#bundleMenuPrice").val();

    console.log("updateBundleMenu");
    console.log(updateMenuName);
    console.log(updateMenuPrice);
    console.log(bundleID);
    console.log(menuID);
    console.log(partnerID);

    var menuData =  {
            bundle_id : bundleID,
            menu_id : menuID,
            menu :  {
                   name : updateMenuName,
                   price :updateMenuPrice,
                   partner_id : partnerID,
                   options : [ ]
               }
        };

        $.ajax({
            url: bundles.BASE_URL + "menu/edit",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(menuData),
            contentType: "application/json"
        }).done(function (menus) {
          if (menus.status === 200) {
            toastr.success(menus.message);
          //  bundles.getAllbundles();
          //  window.location.href = ""
          window.location.href = "../../pages/bundles/bundles.html";

          } else {
            toastr.error(menus.message);
          }
            console.log(menus);
        })
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
    ).set({transition: 'zoom', labels: {ok: 'UPDATE', cancel: 'CANCEL'}}).show();


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
  }).done(function (bundle) {

    if (bundle.status === 200) {
      toastr.success(bundle.message);
      bundles.getAllbundles();
    } else {
      toastr.error(bundle.message);
    }

    console.log(bundle);
    $("#preloaderNav").hide();

    console.log("Value Updated");
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
      }).done(function (bundle) {

        console.log(bundle);

        if (bundle.status === 200) {
          toastr.success(bundle.message);
          bundles.getAllbundles();
        } else {
          toastr.error(bundle.message);
        }
        console.log("Value Deleted");
      });
    },
    function () {
    }).set({transition: 'zoom', labels: {ok: 'DELETE', cancel: 'CANCEL'}}).show();
  });


}
}
bundles.init();
