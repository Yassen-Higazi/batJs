import TooltipManager from './tooltip';
import {add} from './utils';


/**
 * The constructor
 *
 * @param {string} selector a string which can be any valid css selector
 * @return {_B} _B instence for chaining.
 */
function _B(selector) {
  this.elements = document.querySelectorAll(selector);
  return this;
}

_B.prototype = (function (){
  
  const tooltip = TooltipManager();

  let hidden = false;

  return {

    /**
     *  a method for looping over all the elements and appling fn
     *
     * @param {Function} fn a callback function to be applied on all the elements
     * @return {_B} _B instence for chaining.
     */
    each(fn) {
      let returnVals = [];
      for(let i = 0, l = this.elements.length; i < l; i++) {
        returnVals.push(fn.call(this, this.elements[i]));
      }
      return returnVals || this;
    },

    /**
     * set any css properties on the elements
     *
     * @param {Object} styleObj an object which contain the css Properties to be applied
     * @return {_B} _B instence for chaining.
     */
    style(styleObj) {
      if (typeof styleObj !== 'object' || Array.isArray(styleObj)) {
        throw new Error('style: expected an object {property: value}');
      }
      for (let prop in styleObj){
        this.each((el) => {
          el.style[prop] = styleObj[prop];
        });
      }
      return this;
    },

    /**
     * add clsName to the classList of the elements
     *
     * @param {string} clsName the actucal className
     * @return {_B} _B instence for chaining.
     */
    addClass(clsName) {
      this.each((el) => {
        el.classList.add(clsName);
      });
      return this;
    },

    /**
     * toggle clsName on and off the classList
     *
     * @param {string} clsName the actual className
     * @return {_B} _B instence for chaining.
     */
    toggleClass(clsName) {
      this.each((el) => {
        el.classList.toggle(clsName);
      });
      return this;
    },

    /**
     * removes clsName form the classList
     *
     * @param {string} clsName the actual className
     * @return {_B} _B instence for chaining.
     */
    removeClass(clsName) {
      this.each((el) => {
        el.classList.remove(clsName);
      });
      return this;
    },

    /**
     * sets the className proprty.
     *
     * @param {string} clsName the actual className.
     * @return {_B} _B instence for chaining.
     */
    setClassName(clsName) {
      this.each((el) => {
        el.ClassName = clsName;
      });
      return this;
    },

    /**
     *  add an EventListener to the elements
     *
     * @param {string} type the event type for which the elements should listen to.
     * @param {Function} listener the listener function.
     * @return {_B} _B instence for chaining.
     */
    addEvent(type, listener) {

      this.each((el) => {
        add(el, type, listener);
      });
      return this;
    },

    /**
     * remove EventListerners.
     *
     * @param {string} type the event type which should be removed from the element.
     * @param {Function} listener the listener function.
     * @return {_B} _B instence for chaining.
     */
    removeEvent(type, listener) {
      this.each((el) => {
        el.removeEventListener(type, listener);
      });
      return this;
    },

    /**
     * set Elements Attributes.
     *
     * @param {Object} attrs an object {atter: value}.
     * @return {_B} _B instence for chaining.
     */
    attr(attrs) {
      for (let atter in attrs) {
        this.each((el) => {
          el.setAttribute(atter, attrs[atter]);
        });
      }
      return this;
    },

    /**
     * returns the attribute (attrName) Value
     *
     * @param {string} attrName the name of the attribute
     * @return {Array} Array of values of the attribute from all the elements
     */
    getAttr(attrName) {
      return this.each((el) => {
        return el.getAttribute(attrName);
      });
    },

    /**
     *  append child in the elements
     *
     * @param {HTMLElement} child the child Node to be appended.
     * @return {_B} _B instence for chaining.
     */
    appendChild(child) {
      this.each((el) => {
        el.appendChild(child);
      });
      return this;
    },

    /**
     * remove child from the elements
     *
     * @param {HTMLElement} child the child Node to be removed.
     * @return {_B} _B instence for chaining.
     */
    removeChild(child) {
      this.each((el) => {
        el.removeChild(child);
      });
      return this;
    },

    /**
     * set the innerText property if text is string else get innerText.
     *
     * @param {string} text the text to be added to the innerText prop.
     * @return {_B} _B instence for chaining.
     */
    text(text) {
      let resault = [];
      this.each((el) => {
        if (text && typeof text === 'string') {
          el.innerText = text;
        } else {
          resault.push(el.innerText);
        }
      });
      if (resault.length == 0) return this;
      return resault;
    },

    /**
     * set the innerHTML property if html is string else get innerHTML.
     *
     * @param {string} html the text to added to the innerHTML prop.
     * @return {_B} _B instence for chaining.
     */
    html(html) {
      let resault = [];
      this.each((el) => {
        if (html && typeof html === 'string') {
          el.innerHTML = html;
        } else {
          resault.push(el.innerHTML);
        }
      });
      if (resault.length == 0) return this;
      return resault;
    },

    /**
     * hide the elements by setting there display property to none.
     *
     * @return {_B} _B instence for chaining.
     */
    hide() {
      if (!hidden) {
        hidden = true;
        this.style({display: 'none'});
      }
      return this;
    },

    /**
     * show hidden elements by setting there display property to it's default.
     *
     * @return {_B} _B instence for chaining.
     */
    show() {
      if (hidden) {
        hidden = false;
        this.style({display: ''});
      }
      return this;
    },

    /**
     * Toggle elements visiblity by calling hide or show
     *
     */
    toggleVisiblity() {
      if (hidden) {
        this.show();
      } else {
        this.hide();
      }
      return this;
    },

    /**
     * hide the elements with a fade effect.
     *
     * @param {*} [{duration=1000, delay=0}={}] options, fade duration and delay (both in ms).
     * @return {_B} _B instence for chaining.
     */
    fadeOut({duration=1000, delay=0}={}) {
      if (!hidden) {
        this.style({
          transition: `opacity ${duration}ms ease ${delay}ms`,
          opacity: 0,
        });
        setTimeout(() => this.hide(), duration + delay);
        hidden = true;
      }
      return this;
    },

    /**
     * show the elements with a fade effect.
     *
     * @param {*} [{duration=1000, delay=0}={}] options, fade duration and delay (both in ms).
     * @return {_B} _B instence for chaining.
     */
    fadeIn({duration=1000, delay=0}={}) {
      if (hidden) {
        this.style({
          transition: `opacity ${duration}ms ease ${delay}ms`,
          display: '',
          opacity: 1,
        });
        hidden = false;
      }
      return this;
    },

    /**
     * toggle elements visiblity by calling fadeIn or fadeOute.
     *
     * @param {*} [options={}] fade options, fade duration and delay (both in ms).
     */
    fadeToggle(options) {
      if (hidden) {
        this.fadeIn(options);
      } else {
        this.fadeOut(options);
      }
      return this;
    },
   
    /**
     * hide the elements with a Slide effect.
     *
     * @param {*} [{duration=1000, delay=0}={}] options, fade duration and delay (both in ms).
     * @return {_B} _B instence for chaining.
     */
    slideDown({duration=1000, delay=0}={}) {
      if (!hidden) {
        this.style({
          transition: `height ${duration}ms ease ${delay}ms`,
          height: 0,
          overflow: 'hidden',
        });
        setTimeout(() => this.hide(), duration + delay);
        hidden = true;
      }
      return this;
    },

    /**
     * show the elements with a Slide effect.
     *
     * @param {*} [{duration=1000, delay=0}={}] options, fade duration and delay (both in ms).
     * @return {_B} _B instence for chaining.
     */
    slideUp({duration=1000, delay=0}={}) {
      if (hidden) {
        this.style({
          transition: `height ${duration}ms ease ${delay}ms`,
          display: '',
          height: '',
          overflow: '',
        });
        hidden = false;
      }
      return this;
    },

    /**
     * toggle elements visiblity by calling fadeIn or fadeOute.
     *
     * @param {*} [options={}] fade options, fade duration and delay (both in ms).
     */
    slideToggle(options) {
      if (hidden) {
        // requestAnimationFrame(this.slideUp.bind(this,options))
        this.slideUp(options);
      } else {
        // requestAnimationFrame(this.slideDown.bind(this,options))
        this.slideDown(options);
      }
      return this;
    },

    /**
     * create a tooltip for the elements
     * 
     * options are: 
     *  1- position: which can be either top, bottom, left or right (default: top),
     *  2- dist: which set it's distence form the element (default: 0),
     *  3- className: which set the className property of the tooltip (default: tooltip),
     *  4- delay: which set the delay time for the tooltip to show up (deflault: 800).
     *
     * @param {Object} [options={}] the tooltip options.
     * @return {_B} _B instence for chaining.
     */
    tooltip(options={}) {
      this.each((el) => {
        tooltip.createTooltip(el, options);
      });
      return this;
    },

  };

}());


export default _B;
