var http = require('http'), static = require('node-static'), open = require('open');

var static_server = new static.Server({
    headers : {
        'Connection' : 'close'
    }
});

var http_server = http.createServer(function(req, resp) {
    if (req.url == '/ping') {
        resp.end();
        console.log('Ping received');
        clearTimeout(exit_timer);
        exit_timer = setTimeout(function() {
            console.log('Browser timed out, exiting...')
            http_server.close(function() {
                process.exit(0);
            });
        }, 8000)
        return;
    }
    req.on('end', function() {
        static_server.serve(req, resp);
    })
});

var exit_timer = setTimeout(function() {
    console.log('Browser timed out, exiting...')
    http_server.close(function() {
        process.exit(0);
    });
}, 60000); //When browser is still starting, wait for 1 min.

http_server.on('error', function(err) {
    if (err.code == 'EADDRINUSE') {
        connect();
    }
})
var listen_evt_fired = false;
function connect() {
    var port = Math.round(Math.random() * 2000) + 1024;
    http_server.listen(port, 'localhost', function() {
        if (listen_evt_fired)
            return;
        listen_evt_fired = true;
        var port = this.address().port
        console.log('HTTP server listening on port ' + port);
        console.log('Opening browser...');
        open('http://localhost:' + port);
    });
    prt = port;
    console.log('Trying port ' + port);
}

connect();

