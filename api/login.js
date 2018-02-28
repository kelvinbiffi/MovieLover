module.exports = function(app){
  var bcrypt = require('bcrypt-nodejs');

  var serv = {req: null, res: null};
  var errorMessageLogin = "Houve algum erro durante o processo de login, por favor tente novamente mais tarde!";


  var generateToken = function(connection){
    var date = new Date();
    var token = bcrypt.hashSync(date.getTime());
    var sql = "INSERT INTO token (user, token) values (?, ?)";
    connection.query(sql, [serv.req.body.user, token], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessageLogin });
      };
      serv.res.status(200).json({token: token, msg: "Login efetuado com sucesso!"});
    });
  }

  var checkHash = function(connection, hash){
    if(!bcrypt.compareSync(serv.req.body.pass, hash)){
      serv.res.status(400).json({ error: "Senha inválida!" });
    }else{
      generateToken(connection);
    }
  };

  var callbackSuccess = function(connection){
    var sql = "SELECT user, pass FROM user where user = ?";
    connection.query(sql, [serv.req.body.user], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessageLogin });
      };
      if(result.length > 0){
        checkHash(connection, result[0].pass);
      }else{
        serv.res.status(400).json({ error: "Usuário não encontrado!" });
      }
    });
  };

  var callbackError = function(err){
    serv.res.status(500).json({ error: errorMessageLogin });
  };

  app.post('/api/login', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccess, callbackError);
  });

  //-----------------------

  var callbackSuccessToken = function(connection){
    var sql = "DELETE FROM token where token = ?";
    connection.query(sql, [serv.req.body.token], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: "Erro ao tentar excluir token"});
      };
      serv.res.status(200).json({success: true});
    });
  };

  var callbackErrorToken = function(err){
    serv.res.status(500).json({ error: "Erro ao tentar excluir token"});
  };

  app.delete('/api/token', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccessToken, callbackErrorToken);
  });

};
