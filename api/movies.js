module.exports = function(app){
  var serv = {req: null, res: null};
  var movie = [];
  var field = [];
  var file = "";
  var messageErrorSaveMovie = "Houve algum erro ao tentar salvar o filme, tente novamente mais tarde!";

  var updateMovie = function(connection){
    movie = [];
    field = [];
    Object.keys(serv.req.body).map(function(k) {
      if(k != "codigo"){
        field.push(k + " = ?");
        movie.push(serv.req.body[k]);
      }
    });
    movie.push(serv.req.body.codigo);
    var sql = "UPDATE movie SET " + field.join(",") + " WHERE codigo = ?";
    connection.query(sql, movie, function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: messageErrorSaveMovie });
      }else{
        serv.res.status(200).json({msg: "Filme atualizado com sucesso!"});
      }
    });
  };

  var registerMovie = function(connection){
    movie = [];
    field = [];
    Object.keys(serv.req.body).map(function(k) {
      if(k != "codigo"){
        field.push(k);
        movie.push(serv.req.body[k]);
      }
    });
    var sql = "INSERT INTO movie (" + field.join(",") + ") VALUES (" + Array(field.length+1).join("?").split("").join(",") + ")";
    connection.query(sql, movie, function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: messageErrorSaveMovie });
      };
      serv.res.status(200).json({msg: "Filme registrado com sucesso!"});
    });
  };

  var handleReq = function(){
    //data:image/png;base64,
    var info = serv.req.body.img.split(";base64,");
    var img = info[1];
    var img_type = info[0].split("/")[1];
    serv.req.body.img = new Buffer(img, 'base64');
    serv.req.body.img_type = img_type;
    // file = fs.writeFile
  };

  var callbackSuccess = function(connection){
    handleReq();
    if(serv.req.body.codigo){
      var sql = "SELECT codigo FROM movie where codigo = ?";
      connection.query(sql, [serv.req.body.codigo], function (err, result) {
        if (err) {
          serv.res.status(500).json({ error: messageErrorSaveMovie });
        };
        if(result.length > 0){
          updateMovie(connection);
        }else{
          registerMovie(connection);
        }
      });
    }else{
      registerMovie(connection);
    }
  };

  var callbackError = function(err){
    serv.res.status(500).json({ error: messageErrorSaveMovie });
  };

  /**
   * ENDPOINT to save movie data
   *
   * @param req {object}
   * @param res {object}
   */
  app.post('/api/movie', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccess, callbackError);
  });


  //------------------------- DELETE ------------------------
  var deleteMovie = function(connection){
    var sql = "DELETE FROM movie where codigo = ?";
    connection.query(sql, [serv.req.body.codigo], function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: "Houve algum erro ao tentar excluir o filme, tente novamente mais tarde!" });
      };
      serv.res.status(200).json({msg: "Filme excluido com sucesso!"});
    });
  };

  var callbackSuccessDelete = function(connection){
    if(serv.req.body.codigo){
      var sql = "SELECT codigo FROM movie where codigo = ?";
      connection.query(sql, [serv.req.body.codigo], function (err, result) {
        if (err) {
          serv.res.status(500).json({ error: "Houve algum erro ao tentar excluir o filme, tente novamente mais tarde!" });
        };
        if(result.length > 0){
          deleteMovie(connection);
        }else{
          serv.res.status(400).json({ error: "Não é possível excluir um filme não cadastrado!" });
        }
      });
    }else{
      registerMovie(connection);
    }
  };

  var callbackErrorDelete = function(err){
    serv.res.status(500).json({ error: messageErrorSaveMovie });
  };

  app.delete('/api/movie', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccessDelete, callbackErrorDelete);
  });

  var handleData = function(mov){
    //data:image/png;base64,
    return "data:image/" + mov.img_type + ";base64," + new Buffer(mov.img, 'binary').toString('base64');
  };

  callbackSuccessMovies = function(connection){
    var sql = "SELECT codigo, img, img_type, nome, ano, categoria, diretor, sinopse FROM movie";
    connection.query(sql, function (err, result) {
      if (err) {
        serv.res.status(500).json({ error: "Houve algum erro, não há filmes cadastrados" });
      }
      if(result.length > 0){
        result = result.map(function(mov){
          mov.img = handleData(mov);
          return mov;
        });
        serv.res.status(200).json({ movies: result });
      }else{
        serv.res.status(400).json({ error: "Não há filmes cadastrados!" });
      }
    });
  };

  callbackErrorMovies = function(err){
    serv.res.json(500, { error: "Erro ao carregar categorias" });
  };


  /**
   * ENDPOINT to return movies
   *
   * @param req {object}
   * @param res {object}
   */
  app.get('/api/movies', function(req, res) {
    serv.req = req;
    serv.res = res;
    require('../config/db')(callbackSuccessMovies, callbackErrorMovies);
  });
};
