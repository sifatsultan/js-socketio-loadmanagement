var socket = io();
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});





$('#submit').click(function() {
    socket.emit('chat message', $('#msg').val());
    $('#msg').val('');
    return false;
});


socket.on('chat message', function(msg) {
    $('#messages').append($('<li class="list-group-item">').text(msg));
});