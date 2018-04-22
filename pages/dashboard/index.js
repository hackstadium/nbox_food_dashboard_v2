var dashboard = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",

  init: function () {
    dashboard.checkLogin();
    $("#preloaderNav").hide();
    dashboard.getTodayPending();
    dashboard.getLocationTransaction();
    dashboard.getBundlePurchased();
    dashboard.getTodayTransit();
    dashboard.getTodayDelivered();
    dashboard.getTodayCancelled();
    dashboard.allTotal = 0;
    //dashboard.getAllOrders();
    dashboard.getTotalSales();
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

      $("#today-pending").text(orders.pending_count);
      $("#all-pending").text(orders.overall_pending_count);
      dashboard.allTotal += orders.overall_pending_count;
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

      $("#today-transit").text(orders.transit_count);
      $("#all-transit").text(orders.overall_transit_count);

      dashboard.allTotal += orders.overall_transit_count;


      console.log(orders);

    });
  },

  getTodayDelivered:function () {

    $.ajax({
      url: dashboard.BASE_URL + "orders/delivered",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (orders) {
      $("#preloaderNav").hide();

      $("#today-delivered").text(orders.delivered_count);
      $("#all-delivered").text(orders.overall_delivered_count);

      dashboard.allTotal += orders.overall_delivered_count;


      console.log(orders);

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

      $("#today-cancelled").text(orders.cancelled_count);
      $("#all-cancelled").text(orders.overall_cancelled_count);

      dashboard.allTotal += orders.overall_cancelled_count;

      console.log(orders);

    });
  },

  getLocationTransaction:function(){
    $.ajax({
      url: dashboard.BASE_URL + "orders/location/transactions",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (locations) {

      locations.message.sort(function(a, b) {
        return parseFloat(b.TotalOrders) - parseFloat(a.TotalOrders);
      });

      var locationsCount = 6;

      for (var i = 0; i < locationsCount; i++) {
        $("#reportLocations").append("<tr>"
        + "<td>" + locations.message[i].location + "</td>"
        + "<td class='text-right'>" + locations.message[i].TotalOrders  + "</td>"
        + "</tr>");
      }

    })
  },


  getBundlePurchased:function () {
    $.ajax({
      url: dashboard.BASE_URL + "orders/bundlepurchased",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (bundles) {

      bundles.message.sort(function(a, b) {
        return parseFloat(b.quantity) - parseFloat(a.quantity);
      });

      var bundlesCount = 6;

      for (var i = 0; i < bundlesCount; i++) {

        $("#dashboardBundlesPurchased").append("<tr>"
        + "<td>" + bundles.message[i].name + "</td>"
        + "<td class='text-right'>" + bundles.message[i].quantity  + "</td>"
        + "</tr>");
      }

    })
  },

  getAllOrders:function () {

    $("#all-orders").text(dashboard.allTotal);
    //  console.log(dashboard.allTotal);

  },

  getTotalSales:function () {
    var allPending = 0;
    var allCancelled = 0;
    var allDelivered = 0;

    $.ajax({
      url: dashboard.BASE_URL + "orders/pending",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (pending) {

      allPending = pending.overall_pending_count;
      todayPending = pending.pending_count;

      $.ajax({
        url: dashboard.BASE_URL + "orders/cancelled",
        type: "GET",
        crossDomain: true,
        contentType: "application/json"
      }).done(function (transit) {

        allCancelled = transit.overall_cancelled_count;
        todayCancelled = transit.cancelled_count;

        $.ajax({
          url: dashboard.BASE_URL + "orders/delivered",
          type: "GET",
          crossDomain: true,
          contentType: "application/json"
        }).done(function (delivered) {

          allDelivered = delivered.overall_delivered_count;
          todayDelivered = delivered.delivered_count;

          console.log(allPending);
          console.log(allCancelled);
          console.log(allDelivered);

          var allTotal = allPending + allCancelled + allDelivered;
          var todayTotal = todayPending + todayCancelled + todayDelivered;
          $("#all-orders").text(allTotal);
          $("#today-orders").text(todayTotal);

          document.getElementById("loading-chart-message").style.display = "none";


          if ($("#sales-chart").length) {
            var salesChartData ={
              datasets: [{
                data: [allDelivered, allCancelled, allPending],
                backgroundColor: [
                  '#3C7AC9',
                  '#FF5C5C',
                  '#fecb01'
                ]
              }],
              labels: [
                'Delivered',
                'Cancelled',
                'Pending',

              ]
            };
            var salesChartOptions = {
              responsive: true,
              cutoutPercentage: 70,
              legend : false,
              animation: {
                animateScale: true,
                animateRotate: true
              }
            };
            var salesChartCanvas = $("#sales-chart").get(0).getContext("2d");
            var salesChart = new Chart(salesChartCanvas, {
              type: 'doughnut',
              data: salesChartData,
              options: salesChartOptions
            });
            $("#sales-chart-legend").html(salesChart.generateLegend());
          }
        })
      })
    })

  }

};

dashboard.init();
