var reports = {
    init: function () {
        console.log("Reports Page is ready");
        $("#preloaderNav").hide();
        reports.getTransactions();
    },


    getTransactions: function () {

        if ($("#sales-chart").length) {
            var salesChartData = {
                datasets: [{
                    data: [30, 40, 50, 34, 50, 75, 55, 45, 68, 50, 53, 40],
                    backgroundColor: [
                        '#CFE795'
                    ]
                }],
                labels: [
                    'JAN',
                    'FEB',
                    'MAR',
                    'APR',
                    'MAY',
                    'JUN',
                    'JUL',
                    'AUG',
                    'SEP',
                    'OCT',
                    'NOV',
                    'DEC',

                ]
            };
            var salesChartOptions = {
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
                type: 'line',
                data: salesChartData,
                options: salesChartOptions
            });
            $("#sales-chart-legend").html(salesChart.generateLegend());
        }
    }

}


reports.init();

