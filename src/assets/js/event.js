let event = (function() {
  let list = {};

  function on(key, fn) {
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  }

  function emit(key, ...args) {
    if (!list[key]) {
      return;
    }
    let fns = list[key];
    fns.forEach(fn => {
      fn.apply(null, args);
    });
  }

  return { on, emit };
})();

export default event;
