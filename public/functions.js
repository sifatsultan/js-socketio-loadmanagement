var socket = io();
var chartData = [{
    "category": "Sat",
    "column-1": 8
}, {
    "category": "Sun",
    "column-1": 6
}, {
    "category": "Mon",
    "column-1": 2
}, {
    "category": "Tue",
    "column-1": 1
}, {
    "category": "Wed",
    "column-1": 2
}, {
    "category": "Thu",
    "column-1": 3
}, {
    "category": "Fri",
    "column-1": 6
}]

var charConfig = {
    "type": "serial",
    "categoryField": "category",
    "categoryAxis": {
        "gridPosition": "start"
    },
    "trendLines": [],
    "graphs": [{
        "balloonText": "[[value]] Watts",
        "bullet": "round",
        "id": "AmGraph-1",
        "title": "Power",
        "valueField": "column-1"
    }],
    "guides": [],
    "valueAxes": [{
        "id": "ValueAxis-1",
        "title": "Power Consumption"
    }],
    "allLabels": [],
    "balloon": {},
    "legend": {
        "useGraphSettings": true
    },
    "titles": [{
        "id": "Title-1",
        "size": 15,
        "text": "Load Trend"
    }],
    "dataProvider": chartData
}

$('#numbersRequest').click(function() {
    socket.emit('get graph data')
})


socket.on('graph data retrieved', function(data) {
    //    alert(data)
    var jsonArray = JSON.parse(data)
    //    alert(jsonArray[1].category)

    AmCharts.makeChart("chartdiv", charConfig);
})