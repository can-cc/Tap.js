
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

  utils.emitEvent = function(e, eventName) {
    if (document.createEvent) {
      return e.target.dispatchEvent(utils.createEvent(eventName));
    }
  };

 //prevent multi touch
  utils.getOriginEvent = function(e) {
    if(e.originalEvent && e.orginalEvent.touches && e.originalEvent.touches.length) {
      return e.originalEvent.touches[0];
    } else if (e.touches && e.touches.length) {
      return e.touches[0];
    }
    return e;
  };

  utils.bindTouchEvent = function(deviceEvents) {
    var events = [];
    for(var key in deviceEvents) {
      events.push(key);
    }
    for(var i = 0, length = events.length; i < length; i++) {
      utils.attachEvent(document.documentElement, deviceEvents[events[i]], handler[events[i]]);    
    }
  };

  var eventMat = [{
    //touchable devices
    test: !!('ontouchstart' in window),
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


  var coord = {};

  var handler = {

    start: function(e){
      e = utils.getOriginEvent(e);

      coord.start = [e.pageX, e.pageY];
      coord.offset = [0, 0];
    },
    
    move: function(e){
      if ( !coord.start  ) {
        return false;
      }
      e = utils.getOriginEvent(e);
      coord.move = [e.pageX, e.pageY];
      
      coord.offset = [
        Math.abs(coord.start[0] - coord.move[0]),
        Math.abs(coord.start[1] - coord.move[1])
      ];
    },
 
    end: function(e){

      e = utils.getOriginEvent(e);
      if ( coord.offset[0] <  Tap.options.fingerMaxOffset && coord.offset[1] < Tap.options.fingerMaxOffset) {
        
        utils.emitEvent(e, Tap.options.eventName);

      }

      coord = {};

    },

    //fire tap event and prevent click event(init fn will fake click event to this)
    tap: function(e) {
      utils.emitEvent(e, Tap.options.eventName);
      return e.preventDefault();
    },

    click: function(e) {
      //for unsuportted tap env
      if(!utils.emitEvent(e, Tap.options.eventName)) {
        return e.preventDefault();
      }

    }

  };

  var init = function() {
    for (var i = 0, length = eventMat.length; i < length ; i++) {
      if (eventMat[i].test) {
        var touchEvents = eventMat[i].events;

        utils.bindTouchEvent(touchEvents);
        
        return false;
      }
    }
    //for not touchable device
    //return utils.attachEvent(document.documentElement, 'click', handler['tap']);
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
