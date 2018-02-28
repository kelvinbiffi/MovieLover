module.exports = function(app){
  var serv = {req: null, res: null};

  callbackSuccess = function(connection){
    var sql = "SELECT codigo, categoria FROM categoria";
    connection.query(sql, function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: errorMessageLogin });
      };
      if(result.length > 0){
        serv.res.status(200).json({ categorias: result });
      }else{
        serv.res.status(400).json({ error: "Não há categorias!" });
      }
    });
  };

  callbackError = function(err){
    serv.res.status(500).json({ error: "Erro ao carregar categorias" });
  };

  app.get('/api/categorias', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccess, callbackError);
  });

};
