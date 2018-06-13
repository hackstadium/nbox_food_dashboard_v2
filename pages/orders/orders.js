var orders={

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init:function () {
    orders.checkLogin();
    orders.showOrdersTimePicker();

  },

  checkLogin: function () {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    //  console.log(isLoggedIn);

    if (isLoggedIn !== "true") {
      window.location.href = "../../pages/login/login.html";
      //  console.log("Not Logged In");
    } else {
      //  console.log("logged In");
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

      //  console.log(locations);

      $("#orderSelectLocation").html("");
      $("#orderSelectLocation").append("<option>Select a location</option>");

      for (i = 0; i < locations.message.length; i++) {
        $("#orderSelectLocation").append("<option data-alias_id=" + locations.message[i].alias_id + ">" + locations.message[i].location + "</option>");

        //  console.log("adding countries");
      }
    });
  },

  validateSearchParams:function () {
    var selectedLocationAliasID = $("#orderSelectLocation").find(":selected").data("alias_id");
    var selectedDatepicker = $("#ordersTimepicker").val();
    //  console.log("validateSearchParams");
    //console.log(selectedLocationAliasID);
    if (selectedLocationAliasID === undefined) {
      $("#categorySelectCountryContainer").addClass("error_input");
    } else {
      $("#categorySelectCountryContainer").removeClass("error_input");
    }

    if (selectedDatepicker === "") {
      $("#ordersTimepicker").addClass("error_input");
    } else {
      $("#ordersTimepicker").removeClass("error_input");
    }

    if ( selectedLocationAliasID !== undefined && selectedDatepicker !== "") {
      orders.getAllOrders(selectedLocationAliasID, selectedDatepicker)
    }
  },

  getAllOrders:function (selectedLocationAliasID, selectedDatepicker) {
    //  console.log("getAllOrders");
    //console.log(selectedLocationAliasID);
    //console.log(selectedDatepicker);
    //  JSON.stringify()
    var orderData = {alias_id: selectedLocationAliasID.toString(), date: selectedDatepicker};
    $("#preloaderNav").show();



    $.ajax({
      url: orders.BASE_URL + "orders/location",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(orderData),
      contentType: "application/json"
    }).done(function (orders) {
      console.log(orders);
      $("#preloaderNav").hide();

      //EMPTY THE TABLE
      $("#ordersTable").html("");


      var orderCounter = 0;
      var menuCounter = 0;
      orders.ordersMenu = [];

      for ( x in orders.message ) {
        var keys = Object.keys(orders.message[x]);
        var orderLength = orders.message[x].details.length;
        var order = orders.message[x].details;
        var location = orders.message[x].location;
        var status = orders.message[x].status;
        var orderID = orders.message[x]._id;
        // var terminalID = orders.message[x].terminal_id;
        var phone = orders.message[x].phone;
        var userName = orders.message[x].username;
        var timeOfOrder = orders.message[x].created_at;
        var address = orders.message[x].address;
        var location = orders.message[x].location;

        // INCREMENT ORDER COUNTER
        orderCounter ++;


        //  orders.allOrdersMenu = [];


        for (var i = 0; i < orderLength; i++) {
          var singleOrder = order[i].bundleDetails;
          var singleOption = order[i].options;
          var bundleName = singleOrder.name;
          var bundlePrice = singleOrder.price;
          var bundleMenu = order[i].bundleDetails.menu;
          var quantity = order[i].quantity;
          var bundleID = singleOrder._id;
          var categoryID = singleOrder.category_id;
          var bundleID = singleOrder._id;

          //  app.allOrdersMenu = singleOrder.menu;
          orders.ordersMenu.push(bundleMenu);

          console.log("categoryID");
          console.log(categoryID);
          console.log("bundleID");
          console.log(bundleID);


          console.log("singleOrder menu");
          $("#ordersTable").append("<tr>"
          + "<td>" + orderID + "</td>"
          + "<td>" + moment(timeOfOrder, 'YYYY-MM-DD hh:mm:ss').format('lll') + "</td>"
          + "<td class='table_cell_link pointer' onclick='orders.showModalClientDetails(\"" + userName + "\", \"" + phone + "\", \"" + location + "\", \"" + address + "\")'>" + userName + "</td>"
          + "<td id='orderedItem-" + orderCounter +"' class='table_cell_link pointer' onclick='orders.showOrderMenu(\"" + bundleID + "\", \"" + categoryID + "\")' >" + bundleName +" (NGN "+ parseInt(bundlePrice, 10).toLocaleString() + ")"+"</td>"
          + "<td>" + quantity + "</td>"
          + "<td>" + status + "</td>"
          + "<td class='btn_table_container'><button class='btn_table' onclick='orders.editOrderStatus(\"" + orderID + "\", \"" + phone + "\", \"" + bundleName + "\")'><i class='fa fa-pencil icon_green' aria-hidden='true'></i></button></td>"
          + "</tr>");

          menuCounter ++;
          console.log("singleOption");
          console.log(singleOption);

          for (var i = 0; i < singleOption.length; i++) {
            //  array[i]
            $("#orderedItem-" + orderCounter).append(" ,  " + singleOption[i].option.name + "(NGN "+ parseInt(singleOption[i].option.price, 10).toLocaleString()+")")
          }

        }

        console.log("orders.ordersMenu");
        console.log(orders.ordersMenu);
      }

    })
  },

  showModalClientDetails:function (username, phone, location, address) {

    var orderClientTemplate = "<div id='modalBundleDetails'>"
    + "<div class='multiList'><strong>Client Name</strong><p>" + username + " </p></div>"
    + "<div class='multiList'><strong>Phone Number</strong><p>" + phone + " </p></div>"
    + "<div class='multiList'><strong>Company</strong><p>" + location + " </p></div>"
    + "<div class='multiList'><strong>Address</strong><p>" + address + " </p></div>"
    "</div>";

    alertify.alert('Client Record', orderClientTemplate).set({transition: 'zoom', label: ' OK '}).show();

  },

  showModalBundle:function (name, price, categoryID, bundleID) {
    console.log("bundleID");
    console.log(bundleID);
    console.log("orders.allMenu");
    console.log(orders.allMenu);
    $("#preloaderNav").show();



    $("#bundleMenusTable").html("");
    var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
    + "<div class='multiList'><strong>Name</strong><p>" + name + " </p></div>"
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

  },

  editOrderStatus:function (orderID, phone, bundleName) {
    //console.log("editOrderStatus");
    //  console.log(orderID);
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
  //  console.log("updateOrder");
  //console.log(orderID);
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
    //  console.log("updateOrder");
    //console.log(order);

  });
},

showOrderMenu:function (bundleID, categoryID) {
  //  var orderMenu = orders.allOrderMenu;
  console.log(bundleID);
  console.log(categoryID);
  $("#preloaderNav").show();

  $.ajax({
    url: orders.BASE_URL +"bundle?bundle_id="+ bundleID + "&category_id=" + categoryID,
    type: "GET",
    crossDomain: true,
    contentType: "application/json",
    success: function(response){

      $("#preloaderNav").hide();

      console.log("response");
      console.log(response.message);

      $("#bundleMenusTable").html("");

      var OrderDetailsTemplate = "<div id='modalBundleDetails'>"
      + "<div class='multiList'><strong>Name</strong><p>" + response.message.name + " </p></div>"
      + "<div class='multiList'><strong>Price</strong><p> NGN " + parseInt(response.message.price, 10).toLocaleString() + " </p></div>"
      + "<div>"
      +"<strong>Menus</strong>"
      +"<table class='table table-striped'>" +
      "<thead>" +
      "<tr>" +
      "<th>Menu</th>" +
      "<th>Price</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody id='bundleMenusTable'>" +
      "</tbody>" +
      "</table>"+
      "</div>"+
      "</div>";


      alertify.alert('Bundle Menu', OrderDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();

      for (var i = 0; i < response.message.menu.length; i++) {
        $("#bundleMenusTable").append("<tr>"
        + "<td>" + response.message.menu[i].name + "</td>"
        + "<td>NGN " + parseInt(response.message.menu[i].price, 10).toLocaleString() + "</td>"
        + "</tr>");
      }

    },
    error: function(response){
      $("#preloaderNav").hide();
      toastr.error("An error occurred. Try Again");
      console.log("failed to fetch bundle");
      console.log(response.message);
    }
  })

},

showOrdersTimePicker:function () {
  //  console.log("showOrdersTimePicker");
  $('#ordersTimepicker').datepicker({
    dateFormat: "yyyy-mm-dd",
    onSelect: function (date) {
      //  console.log(date);

    }
  });
}
}

orders.init();
