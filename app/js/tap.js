
(function(window) {
  'use strict';

  var Tap = {};
   
  var utils = {};

  Tap.options = {
    eventName: 'tap'
  }

  utils.createEvent = function(name) {
    if (document.createEvent) {
      var event = window.document.createEvent('HTMLEvents');

      event.initEvent(name, true, true);

      return event;
    }
  }; 
  
  utils.attachEvent = function(element, eventName, callback) {
    if ('addEventListener' in window) {
      return element.addEventListener(eventName, callback, false);
    }
  };

  utils.fireEvent = function(e, eventName) {
    if (document.createEvent) {
      return e.target.dispatchEvent(utils.createEvent(eventName));
    }
  };

  utils.getOriginEvent = function(e) {
    if(e.originalEvent && e.orginalEvent.touches && e.originalEvent.touches.length) {
      return e.originalEvent.touches[0];
    } else if (e.touches && e.touches.length) {
      return e.touches[0];
    }
    return e;
  };

  var eventMat = [{

  }];


  var handler = {

    tap: function(e) {
      utils.fireEvent(e, Tap.options.eventName);
      return e.preventDefault();
    }
  };

  var init = function() {
    return utils.attachEvent(document.documentElement, 'click', handler['tap']);
  };

  utils.attachEvent(window, 'load', init);

  if (typeof define === 'function' && define.amd) {
    define(function(){
     init();
     return Tap;
    });
  } else {
    window.Tap = Tap;
  }


}(window));
