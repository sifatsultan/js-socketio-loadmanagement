var rand = [],
    xaxis = [],
    data = [];




for (var i = 0; i < 100; i++)
    rand[i] = Math.ceil(Math.random() * 9);


for (var i = 0; i < rand.length; i++)
    $('#display').append($('<li class="list-group-item">').text(rand[i]))
xaxis[i] = i;





for (var i = 0; i < rand.length; i++)
    data[i] = '{x: ' + x[i]+', y: ' + y[i]+', marker: {enabled: false}}, [' + x[i]+',' + rand[i]+'], null';


$(function () {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'scatter'
        },
        plotOptions: {
            scatter: {
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                }
            }
        },
        series: [{
            data: [data]
        }]
    });
});