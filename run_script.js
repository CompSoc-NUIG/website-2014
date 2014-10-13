// 
var forever = require('forever-monitor');
var exec = require('child_process').exec;
var child = new (forever.Monitor)('server.js', {
  max: 3,
  silent: true,
  options: []
});

child.on('exit', function () {
  console.log('server.js has exited after 3 restarts');
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("scripts/revert.sh", puts);
});

child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.start();