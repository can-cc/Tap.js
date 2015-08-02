
(function(window) {
  'use strict';

  var Tap = {};
   
  var utils = {};

  Tap.options = {
    eventName: 'tap',
    fingerMaxOffset: 11
  };

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

  utils.bindTouchEvent = function(evens) {
      
  }

  var eventMat = [{
    //touchable devices
    test: ('propertyIsEnumerable' in window ||
           'hasOwnProperty' in document) && 
          (window.propertyIsEnumerable('ontouchstart') ||
           document.hasOwnProperty('ontouchstart')),  
    events: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
      }
  }, {
    //modern device agnostic web
    test: window.navigator.pointerEnabled,
    events: {
      start: 'pointerDown',
      move: 'pointermove',
      end: 'pointerup'
    }
  }];


  var handler = {

    //fire tap event and prevent click event(init fn will fake click event to this)
    tap: function(e) {
      utils.fireEvent(e, Tap.options.eventName);
      return e.preventDefault();
    },

    click: function() {
      //for unsuportted tap env
      if(!utils.fireEvent(e, Tap.options.eventName)) {
        return e.preventDefault();
      }

    }

  };

  var init = function() {
    for (var i = 0, i < eventMat.length ; i++) {
      if (eventMat[i].test) {
        touchEvents = eventMatrix[i].events;

        utils.bindTouchEvent(touchEvents);
      }
    }
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
