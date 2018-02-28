module.exports = function(__dirname, app){

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
  });

};
