import {add as addEvent} from './utils';

const TooltipManager = function() {

  let tooltipInstance = null;

  /**
   * Tooltip constructor
   *
   */
  function Tooltip() {
    this.element = document.createElement('div');
    this.element.style.display = 'none';
    this.element.style.position = 'absolute';
    this.element.style.top = 0;
    this.element.style.left = 0;
    document.getElementsByTagName('body')[0].appendChild(this.element);
    this.delayTimeout = null;
  }

  Tooltip.prototype = {

    /**
     *  starts the timeout for showing the tooltip.
     *
     * @param {HTMLElement} targetEl the target HTML element
     * @param {String} [position='top'] the tooltip position
     * @param {number} [dist=0] the tooltip distance from the target element
     * @param {number} [delay=800] the delay time for showing the tooltip
     */
    startDelay(targetEl, position='top', dist=0, delay=800) {
      const that = this;
      const {x, y} = this.position(targetEl, position, dist);
      this.delay = delay;
      this.element.innerText = targetEl.getAttribute('data-tooltip') ||
        'you did\'t set data-tooltip atteribute';
      this.delayTimeout = setTimeout(() => {
        that.show(x, y);
      }, this.delay);
    },

    /**
     *  calculate the position of the tooltip.
     *
     * @param {HTMLElement} targetEl the target HTML element
     * @param {String} position the tooltip position
     * @param {Number} dist the tooltip distance form the target element
     * @return {Object} {x, y} the x and y offsets of the tooltip
     */
    position(targetEl, position, dist) {
      let x = targetEl.offsetLeft;
      let y = targetEl.offsetTop;
      const height = targetEl.clientHeight;
      const width = targetEl.clientWidth;
      switch (position) {
      case 'bottom':
        y += (height + dist);
        break;
      case 'left':
        x -= (width + dist);
        break;
      case 'right':
        x += (width + dist);
        break;
      default:
        y -= (height + dist);

      }

      return {x, y};
    },

    /**
     * show the tooltip.
     *
     * @param {Number} x the left offset of the tooltip
     * @param {Number} y the right offset of the tooltip
     */
    show(x, y) {
      clearTimeout(this.delayTimeout);
      this.element.style.top = y + 'px';
      this.element.style.left = x + 'px';
      this.element.style.display = 'block';
    },

    /**
     * hide the tooltip
     *
     */
    hide() {
      clearTimeout(this.delayTimeout);
      this.element.style.display = 'none';
    },

  };

  /**
   * returns the stored tooltipInstance or create a new one and store it.
   *
   * @return {Tooltip} the tooltip object inctence.
   */
  function getTooltip() {
    if (tooltipInstance === null) {
      tooltipInstance = new Tooltip();
    }
    return tooltipInstance;
  }

  return {

    /**
     * create the tooltip and add the mouseover and mouseout EventListeners
     * note: the tooltip text should be supplied on the target element using 
     * data-tooltip atteribute
     *
     * @param {HTMLElement} targetEl the target HTML element
     * @param {Object} {position, dist, classes, delay} the tooltip options.
     */
    createTooltip(targetEl, {position, dist, classes, delay}) {
      const tooltip = getTooltip();
      tooltip.element.className = classes || 'tooltip';

      const mouseoverHandler = () => {
        // requestAnimationFrame(tooltip.startDelay.bind(tooltip, targetEl, position, dist, delay));
        tooltip.startDelay(targetEl, position, dist, delay);
      };

      const mouseoutHandler = () => {
        // requestAnimationFrame(tooltip.hide.bind(tooltip));
        tooltip.hide();
      };

      addEvent(targetEl, 'mouseover', mouseoverHandler);
      addEvent(targetEl, 'mouseout', mouseoutHandler);
    },

  };

};


export default TooltipManager;
