/**
 * add EventListeners with cross-browser compatability.
 *
 * @param {HTMLElement} el the target html element.
 * @param {String} type the event type.
 * @param {Function} listener the listener function.
 */
export function add(el, type, listener) {
  if (window.addEventListener){
    el.addEventListener(type, listener);
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, listener);
  } else {
    el['on' + type ] = listener;
  }
}

/**
 * an extend function to inhert form a class using the classical inheritance
 *
 * @param {*} subclass the sub class
 * @param {*} superclass the super class
 */
export const extend = (subclass, superclass) => {
  const F = function() {};

  F.prototype = superclass.prototype;

  subclass.prototype = new F;
  subclass.prototype.constructor = subclass;

};

/**
 * a clone function to inhert fom an objects using prototypeal inhertance.
 *
 * @param {*} object the object to inhert form.
 * @returns
 */
export const clone = (object) => {
  const F = function() {};
  F.prototype = object;
  return new F;
};

export default {add, extend, clone};