app.service('movieService', function($window, $http, messageService, spinnerService) {
  this.openAddMovie = false;
  this.openDeleteMovie = false;
  this.openMovieDetails = false;
  this.hasMovies = false;
  this.orderMovies = 'nome';

  this.validData = function(){
    if (this.movie.img.indexOf("base64") == -1) {
      messageService.showMessage('error', "Selecione uma imagem para o filme!");
      return false;
    }else if(this.movie.nome == "" ||
    this.movie.ano == "" ||
    this.movie.categoria == "" ||
    this.movie.diretor == "" ||
    this.movie.sinopse == ""){
      messageService.showMessage('error', "Preencha todas as informações sobre o filme!");
      return false;
    }else if(isNaN(this.movie.ano) ||
    isNaN(this.movie.categoria)){
      messageService.showMessage('error', "O Ano do filme deve ser um valor numérico!");
      return false;
    }

    return true;
  };

  this.movies = [];

  this.movie = {
    codigo: null,
    img: null,
    nome: "",
    ano: "",
    categoria: "",
    diretor: "",
    sinopse: ""
  };

  this.clearMovie = function(){
    this.movie = {
      codigo: null,
      img: "/images/no_image.png",
      nome: "",
      ano: "",
      categoria: "",
      diretor: "",
      sinopse: ""
    };
  };

  this.categorias = [];
  var self = this;

  this.getMovies = function(){
    $http({
          url: '/api/movies', // No need of IP address
          method: 'GET',
          data: {},
          headers: {'Content-Type': 'application/json'}
    }).then(function (success){
      console.log("Get movies successfully: ", success);
      self.movies = [];
      console.log(success.data.movies,"GET");
      self.movies = success.data.movies;
      self.hasMovies = true;
      spinnerService.hideSpinner();
    },function (error){
      console.error("Get movies error: ", error);
      spinnerService.hideSpinner();
    });
  };

  this.getCategorias = function(){
    $http({
          url: '/api/categorias', // No need of IP address
          method: 'GET',
          data: {},
          headers: {'Content-Type': 'application/json'}
    }).then(function (success){
      console.log("Get categorias successfully: ", success);
      self.categorias = success.data.categorias;
      self.getMovies();
    },function (error){
      console.error("Get categoria error: ", error);
      spinnerService.hideSpinner();
    });
  };

  this.closeMovieDetails = function(){
    this.openMovieDetails = false;
  };

});
