var dashboard = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init: function () {
    dashboard.checkLogin();
    $("#preloaderNav").hide();
    dashboard.getTodayPending();
    dashboard.getLocationTransaction();
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
    }
  },

  logout: function () {
    sessionStorage.clear();
    window.location.href = "../../pages/login/login.html";
  },

  getTodayPending:function () {

    $.ajax({
      url: dashboard.BASE_URL + "orders/pending",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (orders) {
      $("#preloaderNav").hide();

      $("#today-pending").text(orders.message.length);

      console.log(orders);

    });

  },

  getTodayTransit:function () {

    $.ajax({
      url: dashboard.BASE_URL + "orders/transit",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (orders) {
      $("#preloaderNav").hide();

      $("#today-pending").text(orders.message.length);

      console.log(locations);

    });
  },

  getTodayDeliverd:function () {

    $.ajax({
      url: dashboard.BASE_URL + "orders/delivered",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (orders) {
      $("#preloaderNav").hide();

      $("#today-pending").text(orders.message.length);

      console.log(locations);

    });
  },

  getTodayCancelled:function () {

    $.ajax({
      url: dashboard.BASE_URL + "orders/cancelled",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (orders) {
      $("#preloaderNav").hide();

      $("#today-pending").text(orders.message.length);

      console.log(locations);

    });
  },

  getLocationTransaction:function(){
    $.ajax({
      url: dashboard.BASE_URL + "orders/location/transactions",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (locations) {
      console.log("Locations Count");
      console.log(locations.message.length);
      var locationsCount = locations.message.length;
      //  $("#partnerCount").html(partnerCount);

      for (var i = 0; i < locationsCount; i++) {

        $("#reportLocations").append("<tr>"
        + "<td>" + locations.message[i].location + "</td>"
        + "<td class='text-right'>" + locations.message[i].TotalOrders  + "</td>"
        // + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + locations.message[i].TotaLocationTransaction.toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        // + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + reports.message.TotalpartnerTransactionRevenue[i].TotalPercentageRevenue.toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        + "</tr>");
      }

    })
  },

  getTodayTotal:function () {

  }

};

dashboard.init();
