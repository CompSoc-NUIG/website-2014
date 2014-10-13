// 
var forever = require('forever-monitor');
var sys = require('sys')
var exec = require('child_process').exec;
var child = new (forever.Monitor)('server.js', {
  max: 3,
  silent: true,
  options: []
});

child.on('exit', function () {
  console.log('server.js has exited after 3 restarts');
  exec("scripts/revert.sh");
});

child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
  console.error('Forever restarting script for ' + child.times + ' time');
  exec("s");
  exec("./scripts/revert.sh", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  console.error('after script');

});

child.start();