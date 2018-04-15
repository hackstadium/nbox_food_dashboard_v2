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

    // $.ajax({
    //   url: orders.BASE_URL + "orders/location",
    //   type: "POST",
    //   crossDomain: true,
    //   data: JSON.stringify(orderData),
    //   contentType: "application/json"
    // }).done(function (orders) {
    //   console.log("orders loaded");
    //   console.log(orders);
    // });



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

      //  orders.allOrders =

          console.log("singleOrder menu");
          $("#ordersTable").append("<tr>"
          + "<td>" + orderID + "</td>"
          + "<td>" + moment(timeOfOrder, 'DD-MM-YYYY').format('lll') + "</td>"
          + "<td>" + terminalID + "</td>"
          + "<td>" + userName + "</td>"
          + "<td>" + phone + "</td>"
          // + "<td>" + bundleName + "</td>"
          //  + "<td class='table_cell_link pointer' onclick='orders.showOrderMenu(\"" + bundleName + "\", \"" + bundlePrice + "\", \"" + i + "\")'>" + bundleName + "</td>"
          + "<td class='table_cell_link pointer' onclick='orders.showMenus(\"" + bundleID + "\")'>" + bundleName + "</td>"

        //  + "<td>" + bundleName + "</td>"
          + "<td>" + quantity + "</td>"
        //  + "<td><a onclick 'orders.showMenus(\"" + i + "\")" + bundlePrice + "</td>"
          + "<td>" + bundlePrice + "</td>"

          // + "<td>" + "PARTNER HERE" + "</td>"
          // + "<td>" + "ADDRESS" + "</td>"
          + "<td>" + status + "</td>"
          + "<td class='btn_table_container'><button class='btn_table' onclick='orders.editOrderStatus(\"" + orderID + "\", \"" + phone + "\", \"" + bundleName + "\")'><i class='fa fa-pencil icon_green' aria-hidden='true'></i></button></td>"
          + "</tr>");

        }
      }

    })
  },

  showMenus:function (bundleID) {
console.log("bundleID");
console.log(bundleID);
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
