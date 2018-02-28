var express = require('express');
var app = express();
require('./config/env.js')(__dirname, app, express);

var port = (process.env.PORT || 8000);

app.listen(port, function(){
  console.log('Server running at port ' + port);
});
