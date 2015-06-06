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


$('#numbersRequest').click(function() {
    socket.emit('get graph data')
})

socket.on('graph data retrieved', function(data) {
    alert(data)
})

socket.on('show 5th data', function(data) {
    $('#display').empty()
    for (var i = 0; i < data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].note))
})

socket.on('show numbers', function(data) {
    $('#display').empty()
    for (var i = 0; i < data.length; i++)
        $('#display').append($('<li class="list-group-item">').text(data[i].number))
})

socket.on('display average', function(data) {
    $('#display').empty()
    $('#display').append($('<li class="list-group-item">').text(data))
})