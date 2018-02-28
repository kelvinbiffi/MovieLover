module.exports = function(success, error){
  var mysql = require('mysql');

  var connection = mysql.createConnection({
    host     : process.env.db_host,
    user     : process.env.user_name,
    password : process.env.user_pass,
    database : process.env.db
  });

  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
        success(connection);
    } else {
        console.log("Error connecting database ... nn");
        error(err);
    }
  });

};
