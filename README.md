# Tap.js
mobile web tap event 
==================

A custom 'tap' event JavaScript plugin for mobile and tablet web browsers, which eliminates the 300ms delay between a physical 'tap' and the firing of a 'click' event. Uses mouse events as a fallback for browsers that don't support touch.

Setup
---------

### for global in the browser

```
<script src="tap.js"></script>
```

Next create a new Tap instance, passing the element you want to use:

```
var el = document.getElementById('my-id'),
	myTap = new Tap(el);
```

You can then start listening for 'tap' events using the regular JavaScript event listener syntax:

```
el.addEventListener('tap', onTap, false);

function onTap (e) {
	//your code
}
```

You can stop listening for tap events like so:

```
el.removeEventListener('tap', onTap, false);
```
