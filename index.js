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


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

connection.connect(function(err) {
    if (err) {
        console.error('error connecting to database:' + err.stack)
    }

    console.log('connecting as id ' + connection.threadID);
});


io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg)
        //    dbconnection.query('INSERT INTO notes (note) VALUES (?)',msg)
        connection.query('insert into notes (note) values (?)', msg)
//        connection.query('select * from notes', function(err, rows, fields) {
//            console.log('did a query')
//            if (err)
//                console.error('error while performing query ' + err.stack);
//            console.log('The records are as follows \n')
//            for (var i = 0; i < rows.length; i++)
//                console.log(rows[i].note)
//        })
    })
    
    socket.on('get data', function() {
        console.log('I got your event from the front')
        connection.query('select * from notes', function(err, rows, fields){
            console.log('retrieved all the data from the notes table')
            for(var i=0; i<rows.length; i++)
                console.log(rows[i].note)
            notes.push(rows)
            console.log('Just pushed all the retrieved data into the array notes')
            console.log('Data in my notes\n')
            for(var i=0; i<notes.length; i++)
                console.log(notes[i].note)
            socket.emit('show data', rows)
            console.log('pushed notes array to front end with the event "show data" ')
        })
        
    })

    socket.on('get 5th data', function() {
        console.log('I am about to do a query')
        connection.query('select * from notes LIMIT 4,1', function(err, rows, fields){
            console.log('I just finished my query')
            for(var i=0;i<rows.length; i++)
                console.log('I just got the 5th data: '+rows[i].note);
            socket.emit('show 5th data', rows)
        })        
    })
    
    /*
CREATE TABLE pet (
    name VARCHAR(20), 
    owner VARCHAR(20),
    species VARCHAR(20), 
    sex CHAR(1), 
    birth DATE, 
    death DATE
);    
    */
    
    
    /*
connection.query('select * from notes LIMIT 4,1', function(err, rows, fields){    
    
    */
    
    var sqlCreateNumber = 'create table numbers(number int(8));'
    var sqlGetNumbers= 'select * from numbers'
    var sqlGet5thNumber = 'select * from numbers limit 4,1' 
    var sqlGet1stNumber = 'select * from numbers limit 0,1'

    var orderedNumbers = [];
    for(var i=0; i<100; i++)
        orderedNumbers[i] = i;
    
    socket.on('create new table', function(){
    })
    
    /*connection.query('insert into notes (note) values (?)', msg)*/
    socket.on('get numbers',function(){
        connection.query(sqlCreateNumber)
        console.log('btw I just created a new table called numbers')
        for(var i=0; i<orderedNumbers.length; i++)
            connection.query('insert into numbers (number) values(?)', orderedNumbers[i]);
        
        connection.query(sqlGetNumbers, function(err, rows, fields){
            socket.emit('show numbers', rows)
        })
    })

    
    socket.on('do average', function(){
        var firstNumber,
            secondNumber;
        
        connection.query(sqlGet1stNumber, function(err, rows, fields){
            firstNumber = rows.number
            console.log('I just saved the first number')
            
            connection.query(sqlGet5thNumber, function(err, rows, fields){
                secondNumber = rows.number
                console.log('I just saved the fifth number')
            
                var average = (firstNumber + secondNumber)/2
                console.log('done with averaging')
        
                socket.emit('display average', average)
                console.log('threw an event to front end called "display average"')
            })
        })

        
        
    })


});

http.listen(3000, function() {
    console.log('listening on *:3000');
});