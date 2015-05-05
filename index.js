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
    }),
    notes = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

connection.connect(function(err){
    if(err){
        console.error('error connecting to database:'+err.stack)
    }
    
    console.log('connecting as id '+connection.threadID);
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
//    dbconnection.query('INSERT INTO notes (note) VALUES (?)',msg)
    connection.query('insert into notes (note) values (?)', msg)
    connection.query('select * from notes', function(err, rows, fields){
        console.log('did a query')
        if(err)
            console.error('error while performing query '+err.stack);
        console.log('The records are as follows \n')
        for(var i=0; i<rows.length; i++)
            console.log(rows[i].note)
    })
    
  })

    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
