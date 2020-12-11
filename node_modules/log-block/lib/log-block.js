(function() {
  var isNode = typeof module !== 'undefined' && this.module !== module;

  var _patchIsArray = function(arr) {
    return toString.call(arr) === '[object Array]';
  };

  var isArray = Array.isArray || _patchIsArray;

  var isObject = function(obj) {
    return typeof obj === 'function' || typeof obj === 'object' && Boolean(obj);
  };

  var stringify = function(args) {
    for (var j = 0; j < args.length; j++) {
      if (isObject(args[j])) {
        args[j] = JSON.stringify(args[j]);
      }
    }
  };

  var log = function() {
    var args = [].slice.call(arguments);
    // See if any of the params are arrays
    var hasArrays = args.some(function(arg) {
      return isArray(arg);
    });

    // Log a blank line first
    console.log();
    if (hasArrays) {
      // If there are arrays, log each separately
      for (var i = 0; i < args.length; i++) {
        // Stringify any objects in the array
        stringify(args[i]);
        console.log.apply(console, ['   '].concat(args[i]));
      }
    } else {
      // If there are no arrays, stringify the args and log
      stringify(args);
      console.log.apply(console, ['   '].concat(args));
    }
    // Log a blank line at the end too
    console.log();
  };

  // Not really necessary to export this; just doing it so it can be tested easier.
  log.isArray = _patchIsArray;

  /* istanbul ignore else */
  if (isNode) {
    module.exports = log;
  } else {
    window.logBlock = log;
  }
})();
