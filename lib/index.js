import _B from './DOM.js';
import Form from './form';
import _Ajax from './ajax.js';

// NOTE: 28/12/2018 11:22 AM. Dom, form, tooltip, ajax and utils 1000 line

window.B = function(selector) {
  return new _B(selector);
};

window.B.Ajax = (function () {
  const ajax = new _Ajax();
  return ajax.request.bind(ajax);
}());

window.B.Form = function(id, action, method, targetEl) {
  return new Form(id, action, method, targetEl);
};
