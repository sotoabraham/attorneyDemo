function setupDateRangeSelector() {

    $('.daterange').daterangepicker(
        {
            ranges: {
                'Last 30 Days': [moment().subtract('days', 29).startOf('day'), moment()],
                'Last 60 Days': [moment().subtract('days', 59).startOf('day'), moment()],
                'Last 90 Days': [moment().subtract('days', 89).startOf('day'), moment()],
            },
            format: 'YYYY-MM-DD',
            //dateLimit: { days: 365 },
            showDropdowns: true,
            startDate: moment().subtract('days', 89).startOf('day'),
            endDate: moment().endOf('day').format(),
            minDate: '2008-01-01'
        },
        function (start, end) {
            $(this.element).children('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            var fromDate = start._d.toDateString();
            var toDate = end._d.toDateString();

            //updateGraphsAndStats(fromDate, toDate);
            //console.log(start, end);
        }
    );

    $('.daterange span').html(moment().subtract('days', 89).startOf('day').format('MMMM D, YYYY') + ' - ' + moment($('input[name="date-end"]').val()).format('MMMM D, YYYY'));
}

function formatData(data) {
    
    data = eval(data);     

    var salesvolume = [];
    var commissions = [];

    var i;
    for (i = 0; i < data.length; ++i) {

        //for dates use date.parse like show in commented lines below
        //salesvolume.push({ x: Date.parse(data[i].Day), y: data[i].SalesVolume });
        //commissions.push({ x: Date.parse(data[i].Day), y: data[i].Commissions });

        salesvolume.push({ x: data[i].Day, y: data[i].SalesVolume });
        commissions.push({ x: data[i].Day, y: data[i].Commissions });
    }

    return [
        {
            bar: true,
            yAxis: 1,
            key: 'Billable Hours',
            values: salesvolume
        },
        {
            bar: true,
            yAxis: 1,
            key: 'Rate',
            values: commissions
        }
    ];
}

function applyFormattedDataToChart(container, formattedData, chartColor) {

    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
                        .x(function (d) { return d.x })
                        .y(function (d) { return d.y })
                        .color(chartColor);

        chart.multibar.stacked(true);
        chart.showControls(false);

        chart.xAxis
            .tickFormat(function (d) { return d3.time.format('%a %b %e')(new Date(d)) });

        chart.yAxis
            .tickFormat(d3.format(' > $0,g2'));

        d3.select(container + ' svg')
           .datum(formattedData)
           .transition()
           .duration(500)
           .call(chart);

        nv.utils.windowResize(chart.update);

        $('.tab').on('click', function (e) {
            window.setTimeout(chart.update, 500);
        });

        return chart;
    });
}

function getData(methodName, fromDate, toDate, chart, chartColor) {
    var data = "{'fromDate': '" + fromDate + "', 'toDate': '" + toDate + "'}";

    $.ajax({
        type: 'POST',
        url: 'Default.aspx/' + methodName,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data
    })
    .done(function (response, textStatus, jqXHR) {
        var data = response.d;
        var formattedData = formatData(data);
        applyFormattedDataToChart(chart, formattedData, chartColor);
    })
    .fail(function (jqXHR, textStatus) {
    });
}

$(document).ready(function () {
    var colorScale = {
        Green: ["#b5cf6b", "#8ca252", "#637939"],
        Yellow: ["#e7ba52", "#bd9e39", "#8c6d31"],
        Orange: ["#fdae6b", "#fd8d3c", "#e6550d"],
        BuGn: ["#3182bd", "#31a354", "#6baed6", "#74c476", "#9ecae1", "#a1d99b"],
        Custom: ["#3182bd", "#31a354", "#fdae6b", "#e7ba52"]
    };

    setupDateRangeSelector();

    var toDate = new Date().toDateString();
    var fromDate = new Date();
    
    fromDate.setDate(fromDate.getDate() - 90);
    fromDate = fromDate.toDateString();

    getData('webMethodTest', fromDate, toDate, '#tabChart1', colorScale.Green);
    getData('webMethodTest', fromDate, toDate, '#tabChart2', colorScale.BuGn);
    getData('webMethodTest', fromDate, toDate, '#tabChart3', colorScale.Orange);

});

