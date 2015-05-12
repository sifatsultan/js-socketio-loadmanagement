var socket = io();

$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
})

$('#submit').click(function() {
    socket.emit('chat message', $('#msg').val());
    $('#msg').val('');
    return false;
})

$('#show').click(function() {
    socket.emit('get data');
})

$('#show5').click(function() {
    socket.emit('get 5th data');
})

$('#numbers').click(function() {
    socket.emit('get numbers');
})

$('#average').click(function(){
    socket.emit('do average')
})

socket.on('chat message', function(msg) {
    $('#messages').append($('<li class="list-group-item">').text(msg));
})

socket.on('show data', function(data) {
    $('#display').empty()
    console.log('so I got the following data from the back end\n')
    for(var i=0; i<data.length; i++) 
        console.log(data[i].note);
    
    //show the last two data
    for (var i = 0; i < data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].note))

})

socket.on('show 5th data', function(data){
    $('#display').empty()
    for(var i=0; i<data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].note))
})

socket.on('show numbers', function(data){
    $('#display').empty()
    for(var i=0; i<data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].number))
})

socket.on('display average', function(data){
    $('#display').empty()
    $('#display').append($('<li class="list-group-item">').text(data))    
})

