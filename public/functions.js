var socket = io(),
    chartData = [{
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
    }],
    data,
    chartConfig = {
        "type": "serial",
        "categoryField": "day",
        "categoryAxis": {
            "gridPosition": "start"
        },
        "trendLines": [],
        "graphs": [{
            "balloonText": "[[value]] Watts",
            "bullet": "round",
            "id": "AmGraph-1",
            "title": "Power",
            "valueField": "value"
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
        "dataProvider": data
    };

function parseDate(date) {
    var dateTimeSplit = date.split('T')
    var date = dateTimeSplit[0]
    var dateSplit = date.split('-')
    var year = dateSplit[0]
    var month = dateSplit[1]
    var day = dateSplit[2]

    return {
        day: parseInt(day),
        month: month,
        year: year
    };
};

function getWeekDayName(date) {
    var dateTimeSplit = date.split('T')
    var date = dateTimeSplit[0]

    var d = new Date(date)

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()]

};


function loadGraph(json) {
    chartConfig.dataProvider = json
    AmCharts.makeChart("chartdiv", chartConfig)
};


$('#numbersRequest').click(function() {
    socket.emit('get graph data')
})


socket.on('graph data retrieved', function(data) {

    //parse the json string response into json object 
    var jsonObject = JSON.parse(data)
    var category = [];
    var value = [];
    var day = [];

    //getting the  date(included inside category) from the jsonObject and putting it inside catogory[]
    for (var i in jsonObject) {
        category[i] = jsonObject[i].category
        value[i] = jsonObject[i].value1
    }
    
    var objectArray = []
    for(var i in category){
        var singleObject={
            day: "",
            value:0
        }
        singleObject["day"] = getWeekDayName(category[i])
        singleObject["value"] = value[i]
        objectArray.push(singleObject)
    }


//    console.log('Calender Date: ' + category[1] + '\nWeek Day Name: ' + getWeekDayName(category[1]))
//    console.log(objectArray)
    loadGraph(objectArray)


})