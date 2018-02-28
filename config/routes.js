module.exports = function(__dirname, app, express){
  app.use("/js", express.static(__dirname + '/public/js'));
  app.use("/images", express.static(__dirname + '/public/images'));
  app.use("/style", express.static(__dirname + '/public/style'));

  require('../routes/index')(__dirname, app);

};
