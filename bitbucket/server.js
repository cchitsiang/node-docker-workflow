var express = require('express'),
    http = require('http');

var app = express();

app.post('/deploy/:branch', function(req, res) {
    var branch = req.params.branch || 'master';
    var spawn = require('child_process').spawn,
        deploy = spawn('sh', ['./deploy.sh', branch]);

    deploy.stdout.on('data', function(data) {
        console.log('' + data);
    });

    deploy.on('close', function(code) {
        console.log('Child process exited with code ' + code);
    });
    res.status(200).json({ message: 'Deployed ' + branch })
});

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + (process.env.PORT || 3000));
});
