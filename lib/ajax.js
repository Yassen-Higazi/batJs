/**
 * the constructor
 *
 */
function _Ajax() {
  this.method = 'GET';
  this.type = 'json';
  this.successCb = () => {
    throw new Error('B.Ajax Success Callback is required');
  };
  this.failCb = (status)  => {
    throw new Error('request Failed wit status code: ' + status);
  };
}

_Ajax.prototype = {

  /**
   * an XHR Factory
   *
   * @return {XMLHttpRequest} the actual XHR object
   */
  createXhr() {
    const methods = [
      () => new XMLHttpRequest(),
      // eslint-disable-next-line
      () => new ActiveXObject('Msxml2.XMLHTTP'),
      // eslint-disable-next-line
      () => new ActiveXObject('Microsoft.XMLHTTP'),
    ];
    for(let i = 0, len = methods.length; i < len; i++) {
      try {
        methods[i]();
      }
      catch(e) {
        continue;
      }
      // If we reach this point, method[i] worked.
      this.createXhr = methods[i]; // Memoize the method.
      return methods[i]();
    }
    // If we reach this point, none of the methods worked.
    throw new Error('did\'nt found a usable xhr object');
  },

  /**
   *  the request method which fires the actual request
   *
   * @param {Object} reqObj the request object
   */
  request(reqObj) {
    this.config(reqObj);
    const that = this;
    const xhr = this.createXhr();
    xhr.onreadystatechange = function () {
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          const data = JSON.parse(xhr.responseText);
          that.successCb(data);
        } else {
          that.failCb(xhr.status);
        }
      }
    };
    xhr.open(this.method, this.url, true);
    xhr.send(this.data);
  },

  /**
   * set the request params
   *
   * @param {Object} {url, method, type, success, fail, data}
   */
  config({url, method, type, success, fail, data}) {
    this.url = url;
    this.type = type || this.type;
    this.failCb = fail || this.failCb;
    this.method = method || this.method;
    this.successCb = success || this.successCb;
    this.data = (this.method == 'POST') ? data : this.data;
  },

};

export default _Ajax;
