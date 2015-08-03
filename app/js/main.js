(function(window){
  'use strict';
  
  var button  = document.getElementById('button');
  


  button.addEventListener('tap', function () {
    alert('haha');
  });

  window.addEventListener('load', function(e) {
    setTimeout(function() { window.scrollTo(0, 1); }, 1);
  }, false);

}(window));
