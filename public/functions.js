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

socket.on('chat message', function(msg) {
    $('#messages').append($('<li class="list-group-item">').text(msg));
})

socket.on('show data', function(data) {
    $('#display').empty()
    console.log('so I got the following data from the back end\n')
    for(var i=0; i<data.length; i++) 
        console.log(data[i].note)
    for (var i = 0; i < data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].note))
})