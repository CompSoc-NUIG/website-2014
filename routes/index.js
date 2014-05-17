/*
Routing Handler
*/

exports.homepage = function(req, res){
  res.sendfile('./views/index.html');
};

exports.partials = function(req, res){
  res.sendfile('./views/partials/' + req.params.name + '.html');
};

exports.api = function(req, res){
  res.send("API not yet implemented");
};
