module.exports = function(app){
  var bcrypt = require('bcrypt-nodejs');

  var serv = {req: null, res: null};
  var errorMessage = "Houve algum erro durante o processo de registro, por favor tente novamente mais tarde!";

  var generateToken = function(connection){
    var date = new Date();
    var token = bcrypt.hashSync(date.getTime());
    var sql = "INSERT INTO token (user, token) values (?, ?)";
    connection.query(sql, [serv.req.body.user, token], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessage });
      };
      serv.res.json(200, {token: token, msg: "Registro efetuado com sucesso!"});
    });
  }

  var registerUser = function(connection){
    var hash = bcrypt.hashSync(serv.req.body.pass);
    var sql = "INSERT INTO user (user, pass) values (?, ?)";
    connection.query(sql, [serv.req.body.user, hash], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessage });
      };
      generateToken(connection);
    });
  };

  var callbackSuccess = function(connection){
    var sql = "SELECT user FROM user where user = ?";
    connection.query(sql, [serv.req.body.user], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessage });
      };
      if(result.length > 0){
        serv.res.status(400).json({ error: "Já existe um conta referente a este usuário!" });
      }else{
        registerUser(connection);
      }
    });
  };

  var callbackError = function(err){
    serv.res.status(500).json({ error: errorMessage });
  };

  app.post('/api/register', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccess, callbackError);
  });

};
