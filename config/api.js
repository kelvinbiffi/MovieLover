module.exports = function(app){
  require('../api/register')(app);
  require('../api/login')(app);
  require('../api/movies')(app);
  require('../api/categorias')(app);
};
