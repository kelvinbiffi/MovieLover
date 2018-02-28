module.exports = function(__dirname, app, express){
  var multer  =   require('multer');
  var mime    =   require('mime');
  var bodyParser =    require("body-parser");

  app.use(bodyParser.json({limit: "80mb"}));
  app.use(bodyParser.urlencoded({limit: "80mb", extended: true, parameterLimit:80000}));

  require('./routes')(__dirname, app, express);

  require('./api')(app);
};
