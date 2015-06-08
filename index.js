var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'nbuser',
        database: 'node'
    });


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

connection.connect(function(err) {
    if (err) {
        console.error('error connecting to database:' + err.stack)
    }
    console.log('Database succesfully connected!');
});


io.on('connection', function(socket) {
    console.log('got a device connected to me')

    socket.on('disconnect', function() {
        console.log('and it got disconnected')
    })

    socket.on('get graph data', function() {
        connection.query('select * from my_chart_data', function(err, rows, fields) {
            for (var i in rows)
                console.log(rows[i]);
            var json = JSON.stringify(rows);
            socket.emit('graph data retrieved',json)
            console.log(json);
        })
    })
});


http.listen(3000, function() {
    console.log('Server listening on port: 3000');
});