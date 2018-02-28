app.service('messageService', function($timeout) {
  this.show = false;
  this.type = 'error' | 'success';
  this.message = 'Message';
  var timer;

  self = this;

  var clearTimer = function(){
    self.show = false;
    $timeout.cancel(timer);
  };

  this.showMessage = function(type, message){
    if (timer) {
      $timeout.cancel(timer);
    }
    this.type = type;
    this.message = message;
    this.show = true;

    timer = $timeout(clearTimer, 3*1000);

  };

});
