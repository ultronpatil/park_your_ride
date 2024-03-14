var http = require('http');
var fs = require('fs');
var SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var app = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    res.end(fs.readFileSync('index.html'));
});

var io = require('socket.io')(app, {
    cors: {
        origin: '*'
    }
});

io.on('connection', function (socket) {
    console.log('Client connected');
});

var port = new SerialPort('COM5', {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

parser.on('data', function (data) {
    console.log(data);
    io.emit('data', data);
});

app.listen(5500, function () {
    console.log('Server listening on port 5500');
});
