var reports = {
  BASE_URL: "http://staging.nairabox.com/foodhub/",


  init: function () {
    console.log("Reports Page is ready");
    $("#preloaderNav").hide();
    //  reports.getTransactions();
    reports.getPartnerCount();
    reports.getCategoryCount();
    reports.getBundleCount();
    reports.getMonthlyStats();
    reports.getLocationTransaction();
    reports.getLocationCount();
  },

  getLocationTransaction:function(){
    $.ajax({
      url: reports.BASE_URL + "orders/location/transactions",
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
        + "<td>" + locations.message[i].TotalOrders  + "</td>"
        + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + locations.message[i].TotaLocationTransaction.toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        // + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + reports.message.TotalpartnerTransactionRevenue[i].TotalPercentageRevenue.toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        + "</tr>");
      }

    })
  },

  getPartnerCount:function () {

    $.ajax({
      url: reports.BASE_URL + "partners/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (partners) {
      console.log("Partners Count");
      console.log(partners.message.length);
      var partnerCount = partners.message.length;
      $("#partnerCount").html(partnerCount);

    })

  },

  getBundleCount:function () {

    $.ajax({
      url: reports.BASE_URL + "bundles/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (bundles) {
      console.log("Bundle Length");
      console.log(bundles.message.length);
      var bundleCount = bundles.message.length;
      $("#bundleCount").html(bundleCount);

    })
  },

  getCategoryCount:function () {

    $.ajax({
      url: reports.BASE_URL + "categories/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (categories) {
      console.log("Category Length");
      console.log(categories.message.length);
      var categoryCount = categories.message.length;
      $("#categoryCount").html(categoryCount);
    })
  },

  getLocationCount:function () {
    $.ajax({
      url: reports.BASE_URL + "locations/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (locations) {
      console.log("Location Length");
      console.log(locations);
      $("#locationCount").html(locations.message.length);
    })
  },

  getMonthlyStats:function(){
    $.ajax({
      url: reports.BASE_URL + "orders/monthlystats",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (stats) {
      console.log("stats");
      console.log(stats.message);
      var februaryTransaction = stats.message.monthlyrevenue[0];
      console.log("february value");
      console.log(februaryTransaction);
      reports.getTransactions(februaryTransaction);
    })
  },

  getTransactions: function (februaryTransaction) {
    console.log("getTransaction stats");
    console.log(februaryTransaction);
    if ($("#sales-chart").length) {
      var salesChartData = {
        datasets: [{
          data: [0, 0, 0, februaryTransaction, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#CFE795'
        }],
        labels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
      };
      var salesChartOptions = {
        tooltips: {
          enabled: false
        },
        responsive: true,
        // cutoutPercentage: 70,
        legend: false,
        animation: {
          animateScale: true,
          // animateRotate: true
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      };
      var salesChartCanvas = $("#sales-chart").get(0).getContext("2d");
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      });
      $("#sales-chart-legend").html(salesChart.generateLegend());
    }


    //GET TOTAL TRANSACTIONS
    $.ajax({
      url: reports.BASE_URL + "orders/total/reports",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (reports) {
      console.log("Reports");
      console.log(reports);
      console.log("Logging Reports");
      console.log(reports.message.TotalpartnerTransactionRevenue);

      //GET TRANSACTION PER PARTNER
      for (var i = 0; i < reports.message.TotalpartnerTransactionRevenue.length; i++) {

        $("#reportPartners").append("<tr>"
        + "<td class='table_cell_link pointer' onclick='reports.openModalPartnerTransactionDetails(\"" + reports.message.TotalpartnerTransactionRevenue[i].partner_id + "\")'>" + reports.message.TotalpartnerTransactionRevenue[i].partner_name + "</td>"
      //  + "<td>" + reports.message.TotalpartnerTransactionRevenue[i].partner_name + "</td>"
        + "<td>" + reports.message.TotalpartnerTransactionRevenue[i].totalPartnerTransactionsCount + "</td>"
        + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" +parseInt(reports.message.TotalpartnerTransactionRevenue[i].TotalPartnerPercentageRevenue).toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + parseInt(reports.message.TotalpartnerTransactionRevenue[i].TotalPercentageRevenue).toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        // + "<td><span style='font-size:10px; margin-right:4px'>NGN</span>" + reports.message.TotalpartnerTransactionRevenue[i].actuallBundleRevenue.toLocaleString(undefined, {  minimumFractionDigits: 2,  maximumFractionDigits: 2}) + "</td>"
        + "</tr>");
      }


      //GET TOTAL TRANSACTIONS
      var transactionLength = reports.message.TotalpartnerTransactionRevenue.length;
      var transaction =  reports.message.TotalpartnerTransactionRevenue;
      var totalTransactions = 0;
      for (var i = 0; i < transactionLength; i++) {
        console.log("length");
        totalTransactions += transaction[i].totalTransactions;
        //    transactionLength[i];
      }
      console.log("Total Transactions");
      console.log(totalTransactions);
      $("#totalTransactions").html("<span style='font-size:10px; margin-right:4px'>NGN</span>" + totalTransactions.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) );


      //GET TOTAL REVENUES
      var totalRevenue = 0;
      for (var i = 0; i < transactionLength; i++) {
        totalRevenue += parseFloat(transaction[i].TotalPercentageRevenue);
      }

      console.log("Total Revenue");
      console.log(totalRevenue);
      $("#totalRevenue").html("<span style='font-size:10px; margin-right:4px'>NGN</span>" + totalRevenue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) );

    });
  },

  openModalPartnerTransactionDetails:function(partnerID){
    $("#preloaderNav").show();

    console.log(" modal Partner ID");
    console.log(partnerID);
    $.ajax({
      url: reports.BASE_URL + "orders/partners/transactions?partner_id=" + partnerID,
      //  url: bundles.BASE_URL + "bundle?category_id=" + categoryID + "&bundle_id=" + bundleID,
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (transactions) {
      console.log("Transactions");
      console.log(transactions.message.order_details);

      ///////

      $("#preloaderNav").hide();

      console.log(transactions);
      console.log("transaction length");
      console.log(transactions.message.order_details.length);

        $("#partnerTransactionTable").html("");
        var partnerTransactionTemplate = "<div>"
        +"<div><strong>Menus</strong><table class='table table-striped'>" +
        "<thead>" +
        "<tr>" +
        "<th>Time</th>" +
        "<th>Menu</th>" +
        "<th>Location</th>" +
        "<th>City</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='partnerTransactionTable'>" +
        "</tbody>" +
        "</table></div></div>";

        alertify.alert('Transaction Details', partnerTransactionTemplate).set({transition: 'zoom', label: ' OK '}).show();

        for (var i = 0; i < transactions.message.order_details.length; i++) {

console.log(transactions.message.order_details[i].order_created_at);

          $("#partnerTransactionTable").append("<tr>"
          + "<td>" + moment(transactions.message.order_details[i].order_created_at, 'YYYY-MM-DD hh:mm:ss').format('lll')  + "</td>"
          + "<td>" + transactions.message.order_details[i].menu_name + "</td>"
          + "<td>" + transactions.message.order_details[i].order_location + "</td>"
          + "<td>" + transactions.message.order_details[i].order_city + "</td>"
          + "</tr>")}

      })

    }

  }


  reports.init();
