var orders={

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init:function () {
    orders.checkLogin();
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
      orders.getAllLocation();
    }
  },

  getAllLocation:function () {
    $.ajax({
      url: orders.BASE_URL + "locations/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (locations) {
      $("#preloaderNav").hide();

      console.log(locations);

      $("#orderSelectLocation").html("");
      $("#orderSelectLocation").append("<option>Select a location</option>");

      for (i = 0; i < locations.message.length; i++) {
        $("#orderSelectLocation").append("<option data-alias_id=" + locations.message[i].alias_id + ">" + locations.message[i].location + "</option>");

        console.log("adding countries");
      }
    });
  },

  validateSearchParams:function () {
    var selectedLocationAliasID = $("#orderSelectLocation").find(":selected").data("alias_id");
    console.log("validateSearchParams");
    console.log(selectedLocationAliasID);
    if (selectedLocationAliasID === undefined) {
      $("#categorySelectCountryContainer").addClass("error_input");
    } else {
      $("#categorySelectCountryContainer").removeClass("error_input");
    }

    if ( selectedLocationAliasID !== undefined) {
      orders.getAllOrders(selectedLocationAliasID)
    }
  },

  getAllOrders:function (selectedLocationAliasID) {
    console.log("getAllOrders");
    console.log(selectedLocationAliasID);
    //  JSON.stringify()
    var orderData = {alias_id: selectedLocationAliasID.toString()};
    $("#preloaderNav").show();


    //debugger;
    $.ajax({
      url: orders.BASE_URL + "orders/location",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(orderData),
      contentType: "application/json"
    }).done(function (orders) {
      console.log(orders);
      $("#preloaderNav").hide();
      // debugger;
      for ( x in orders.message ) {
        var keys = Object.keys(orders.message[x]);
        var orderLength = orders.message[x].details.length;
        var order = orders.message[x].details;
        var location = orders.message[x].location;
        var status = orders.message[x].status;
        var orderID = orders.message[x]._id;
        var terminalID = orders.message[x].terminal_id;
        var phone = orders.message[x].phone;
        var userName = orders.message[x].username;


        for (var i = 0; i < orderLength; i++) {
          var singleOrder = order[i].bundleDetails;
          var bundleName = singleOrder.name;
          var bundlePrice = singleOrder.price;
          var timeOfOrder = singleOrder.created_at;
          var quantity = order[i].quantity;
          var bundleID = singleOrder._id;
          var categoryID = singleOrder.category_id;
          orders.allMenu = singleOrder.menu;
//debugger;

          console.log("singleOrder menu");
          $("#ordersTable").append("<tr>"
          + "<td>" + orderID + "</td>"
          + "<td>" + moment(timeOfOrder, 'DD-MM-YYYY').format('lll') + "</td>"
          + "<td>" + terminalID + "</td>"
          + "<td>" + userName + "</td>"
          + "<td>" + phone + "</td>"
          + "<td class='table_cell_link pointer' onclick='orders.showModalBundle(\"" + bundleName + "\", \"" + bundlePrice + "\", \"" + categoryID + "\", \"" + bundleID + "\")'>" + bundleName + "</td>"
          + "<td>" + quantity + "</td>"
          + "<td>" + bundlePrice + "</td>"
          + "<td>" + status + "</td>"
          + "<td class='btn_table_container'><button class='btn_table' onclick='orders.editOrderStatus(\"" + orderID + "\", \"" + phone + "\", \"" + bundleName + "\")'><i class='fa fa-pencil icon_green' aria-hidden='true'></i></button></td>"
          + "</tr>");

        }
      }

    })
  },

  showModalBundle:function (name, price, categoryID, bundleID) {
    console.log("bundleID");
    console.log(bundleID);
    console.log("orders.allMenu");
console.log(orders.allMenu);
    $("#preloaderNav").show();

    // $.ajax({
    //   url: orders.BASE_URL + "bundle?category_id=" + categoryID + "&" + "bundle_id=" + bundleID,
    //   type: "GET",
    //   crossDomain: true,
    //   contentType: "application/json"
    // }).done(function (bundle) {
    //   $("#preloaderNav").hide();
    //
    //   console.log(bundle);
    //
    //
    //
    // })


    /////////////////////////

    //var menuArray = bundles.allMenu[menuIndex];
    // console.log("clicked to open Modal");
    // console.log(bundleID);
    // console.log(name);
    // console.log(category);
    // console.log(description);
    // console.log(price);
    // console.log("Passed Menus");
    // console.log(menuArray);




    $("#bundleMenusTable").html("");
    var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
    + "<div class='multiList'><strong>Name</strong><p>" + name + " </p></div>"
    // + "<div class='multiList'><strong>Category</strong><p>" + category + "</p></div>"
    // + "<div class='multiList'><strong>Description</strong><p>" + description + " </p></div>"
    + "<div class='multiList'><strong>Price</strong><p> NGN " + parseInt(price, 10).toLocaleString() + " </p></div>"
    + "<div>"
    +"<strong>Menus</strong>"
    +"<table class='table table-striped'>" +
    "<thead>" +
    "<tr>" +
    "<th>Menu</th>" +
    "<th>Partner</th>" +
    "<th>Price</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody id='bundleMenusTable'>" +
    "</tbody>" +
    "</table>"+
    "</div>"+
    "<div>"+
    "<strong>Options</strong>"+
    "<p id='options_message'>LOADING OPTIONS...</p>"+
    "<table class='table table-striped'>"+
    "<thead>"+
    "<tr>"+
    "<th>Options</th>"+
    "<th>Price</th>"+
    "</tr>"+
    "</thead>"+
    "<tbody id='bundleOptionsTable'>"+
    "</tbody>"+
    "</table>"+
    "</div>"+
    "</div>";

    alertify.alert('Bundle Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();


    // for (var i = 0; i < menuArray.menu.length; i++) {
    //   var one = menuArray.menu[i];
    //   $("#bundleMenusTable").append("<tr>"
    //   + "<td>" + one.name + "</td>"
    //   + "<td>" + one.partner_name + "</td>"
    //   + "<td>NGN " + parseInt(one.price, 10).toLocaleString() + "</td>"
    //   + "<td><button class='btn_table' onclick='bundles.openModalEditBundleMenu(\"" + bundleID + "\",\"" + i + "\",\"" + one.partner_id + "\",\"" + one.name + "\",\"" + one.price + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
    //   + "</tr>");
    // }


    //FETCH ALL OPTIONS
    // var optionsData = {bundle_id : bundleID};
    //
    // $.ajax({
    //   url: bundles.BASE_URL + "bundle/option/all",
    //   type: "POST",
    //   crossDomain: true,
    //   data: JSON.stringify(optionsData),
    //   contentType: "application/json"
    // }).done(function (options) {
    //
    //   $("#options_message").html("");
    //   $("#bundleOptionsTable").html("");
    //
    //   for (var i = 0; i < options.message.length; i++) {
    //     $("#bundleOptionsTable").append(
    //       "<tr>"
    //       +"<td>"+ options.message[i].name +"</td>"
    //       +"<td>NGN "+ parseInt(options.message[i].price, 10).toLocaleString() +"</td>"
    //       +"<td><button class='btn_table' onclick='bundles.openModalEditBundleOptions(\"" + options.message[i]._id + "\", \"" + options.message[i].name + "\", \"" + options.message[i].price + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
    //       +"<td><button class='btn_table' onclick='bundles.deleteBundleOptions(\"" + options.message[i]._id + "\", \"" + options.message[i].name + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
    //       +"</tr>"
    //     );
    //   }
    //
    //
    //   var extrasLength = options.message.length;
    //   if (extrasLength === 0) {
    //     $("#bundleOptionsTable").append("No options available");
    //     console.log("No options here");
    //   }
    //
    // })

    /////////////////////


  },

  editOrderStatus:function (orderID, phone, bundleName) {
    console.log("editOrderStatus");
    console.log(orderID);
    var orderDetailTemplate = "<div id='orderDetail'>"
    + "<div class='multiList'><strong>Order ID</strong><p>" + orderID + " </p></div>"
    + "<div class='multiList'><strong>Bundle Name</strong><p>" + bundleName + " </p></div>"
    + "<div class='multiList'><strong>Customer</strong><p>" + phone + "</p></div>"
    +"<div class='styled-select inline-select'>"
    + "<select id='selectOrderStatus'>"
    +"<option data-value='PENDING'>Pending</option>"
    +"<option data-value='IN_TRANSIT'>In-transit</option>"
    +"<option data-value='DELIVERED'>Delivered</option>"
    +"</select>"
    +"</div>"
    + "</div>";

    alertify.confirm('Update Order details', orderDetailTemplate,
    function () {
      var status = $("#selectOrderStatus").find(":selected").data("value");
      orders.updateOrder(orderID, status);
    },
    function () {
    }
  ).set({transition: 'zoom', labels: {ok: 'UPDATE ORDER', cancel: 'CANCEL'}}).show();
},

updateOrder:function (orderID, status) {
  console.log("updateOrder");
  console.log(orderID);
  //  foodhub/
  $("#preloaderNav").show();

  var updateOrderData = {order_id : orderID, status : status};
  $.ajax({
    url: orders.BASE_URL + "order/update",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(updateOrderData),
    contentType: "application/json"
  }).done(function (order) {
    $("#preloaderNav").hide();
    // $('ordersTable')
    window.location.href = "orders.html";
    console.log("updateOrder");
    console.log(order);

  });
},

showOrderMenu:function (bundleName, bundlePrice, index) {
  var orderMenu = orders.allOrderMenu;
  //  var newOrderMenu =  orders.NewAllOrderMenu;
  //debugger;
  console.log("showOrderMenu");
  console.log(orderMenu);
  console.log(index);
}
}

orders.init();
