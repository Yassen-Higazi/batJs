import {extend} from './utils';


/**
 * The Composite Constructor.
 *
 * @param {HTMLElement} targetEl the target HTMLElement.
 * @param {string} id the id of the element.
 * @param {string} className to set the classname proprty.
 */
function Composite(targetEl, id, className) {
  this.children = [];
  this.element.id = id;
  this.element.className = className;
  this.element.style.display = 'none';
  this.parent = targetEl || document.getElementsByTagName('body')[0];
}

Composite.prototype = {

  /**
   * creates a fieldSet and adds it to the composite.
   *
   * @param {*} {id, className} the id of the fieldSet and the classname
   * @return {FieldSet} return the fieldSet instance which is also a composite.
   */
  createFieldSet({id, className}) {
    let fieldset = new FieldSet(this.element, id, className);
    this.children.push(fieldset);
    return fieldset;
  },


  /**
   * creates an InputField it takes an object with the proprties:
   * 
   * type: the type of the inputField.
   * id: the id of the inputField.
   * name: the name proprty of the inputField.
   * requird: a bool value for wether the field is required or not.
   * classname: the classname of the inputField.
   * label: a bool value for wether to create a label for the input or not.
   * labelText: the text for the label.
   * regExp: a Regular Expression for validation.
   *
   * @param {*} {type, id, name, required, className, label, labelText, regExp}
   * @return {InputField} an InputField instance which extends the Field class
   */
  createInputField({type, id, name, required, className, label, labelText, regExp}) {
    const field = new InputField(
      this.element,
      type,
      id,
      name,
      required,
      className,
      label,
      labelText,
      regExp
    );
    this.children.push(field);
    return field;
  },

  /**
   * retrive a child from the form children by it's id.
   *
   * @param {string} id the id of the inctance to retrive
   * @return {*} the child with the suplide id or undefind.
   */
  getInctanceById(id) {
    let inctance;
    if (this.element.id === id) {
      inctance = this;
    } else {
      for (let child of this.children) {
        inctance = child.getInctanceById(id);
        if (inctance) return inctance;
      }
    }
    return inctance;
  },

  /**
   * add add the valid css class to the element if valid else add invalid
   *
   */
  validate() {
    for (let child of this.children) {
      child.validate();
    }
  },

  /**
   * check if the all the field in the composite is valid.
   *
   * @return {bool} true if all the field is valid other wise returns false.
   */
  isValid() {
    const resalt = [],
      valid = {};
    for (let child of this.children) {
      if (!valid[child.element.id]) {
        let isvalid = child.isValid();
        valid[child.element.id] = isvalid;
      }
      resalt.push(valid[child.element.id]);
    }
    return resalt.every((el) => el == true);
  },

  /**
   * render the form by calling the render method on all the children.
   *
   */
  render() {
    this.element.style.display = '';
    for(let child in this.children) {
      this.children[child].render();
    }
  },

  /**
   * unmount all the children elements from the DOM.
   *
   */
  unmount() {
    for (let child of this.children) {
      child.unmount();
    }
    this.element.style.display = 'none';
  },

};

/**
 * Form class constuctor it extends the Composite class.
 * 
 * it takes an object with the proparties:
 * id: the form id.
 * action: the form action.
 * method: the form method.
 * classname: the form classname.
 * targetEl: the target Element to render the form with in.
 *
 * @param {*} {id, action, method, className, targetEl}
 */
function Form({id, action, method, className, targetEl}) {
  this.element = document.createElement('form');
  Composite.call(this, targetEl, id, className);
  this.element.action = action;
  this.element.method = method;
  this.parent.appendChild(this.element);
}

extend(Form, Composite);

/**
 * the FieldSet constructor it extends the Composite class.
 *
 * @param {HTMLElement} targetEl the target HTMLElement
 * @param {string} id the id of the fieldSet.
 * @param {string} className the classname of the fieldSet.
 */
function FieldSet(targetEl, id, className) {
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  Composite.call(this, targetEl, id, className);
  this.parent.appendChild(this.element);
}

extend(FieldSet, Composite);

/**
 * The Field class constructor.
 *
 * @param {HTMLElement} targetEl the target element to put the field within
 * @param {string} id the id of the field.
 * @param {string} name the name proprty of the field.
 * @param {bool} required for the isRequird proprty.
 * @param {string} className the classname of the field.
 * @param {bool} label wether to create a label or not.
 * @param {string} labelText the label text.
 */
function Field(targetEl, id, name, required, className, label, labelText) {
  // Wrapper for each Field
  if (this.element.type && this.element.type != 'submit') {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'input-field';
    this.wrapper.appendChild(this.element);
  }

  // Field proprties
  this.element.style.display = 'none';
  this.element.id = id;
  this.element.name = name || id;
  this.element.className = className || '';
  this.element.isRequired = required || false;
  this.parent = targetEl;

  // Label
  if (label) {
    this.label = document.createElement('label');
    this.label.htmlFor = this.element.id;
    this.label.innerText = labelText;
    this.wrapper.appendChild(this.label);
  }

  // append
  this.parent.appendChild(this.wrapper || this.element);

}

Field.prototype = {

  /**
   * a Setter for the value of the Field.
   *
   * @param {string} val the value to be set.
   */
  set value(val) {
    this.element.value = val;
  },

  /** 
   *  a getter for the value of the Field.
   * 
   * @return {string} the value of the Field.
   * 
  */
  get value() {
    return this.element.value;
  },

  /**
   * return this Field if the id matched the element id.
   *
   * @param {string} id
   * @return {InputField} the Field with the id equals to the suplied id.
   */
  getInctanceById(id) {
    if (this.element.id === id) {
      return this;
    }
  },

  /**
   * add add the valid css class to the element if valid else add invalid
   *
   */
  validate() {
    if (this.isValid()) {
      this.element.classList.remove('invalid');
      this.element.classList.add('valid');
    } else {
      this.element.classList.remove('valid');
      this.element.classList.add('invalid');
    }
  },

  /**
   * checks if the field is valid using the regExp.
   *
   * @return {bool} true if the value of the form is valid else returns false.
   */
  isValid() {
    // console.log(this);
    if (this.element.type && this.element.type == 'submit') {
      return true;
    } else {
      return this.regExp.test(this.value);
    }
  },

  /**
   * render the field by setting the display to block.
   *
   */
  render() {
    this.element.style.display = '';
    if (this.wrapper) this.wrapper.style.display = '';
  },

  /**
   * unmount the element from the DOM.
   *
   */
  unmount() {
    if (this.wrapper) {
      this.wrapper.style.display = 'none';
    } else {
      this.element.style.display = 'none';
    }
  },


};


/**
 * the InputField class constructor it extends the Field class and it takes an
 * object the same proporties of the Field class + the type param:
 *
 * @param {HTMLElement} targetEl the target element to put the field within.
 * @param {string} type the type of the inputField.
 * @param {string} id the id of the field.
 * @param {string} name the name proprty of the field.
 * @param {bool} required for the isRequird proprty.
 * @param {string} className the classname of the field.
 * @param {bool} label wether to create a label or not.
 * @param {string} labelText the label text.
 * @param {RegExp} regExp a regular expression for validateion.
 */
function InputField(targetEl, type, id, name, required, className, label, labelText, regExp) {
  // validation regex pattrens
  const pattrens = {
    password: /[_@a-zA-Z0-9]{8,}/,
    tel: /^\d{11}$/,
    email: /^([a-z0-9_]+)@([a-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    url: /^(https?:\/\/)([\w\d]+)/
  };
  this.element = document.createElement('input');
  this.element.type = type;
  this.element.style.display = 'none';
  if (regExp) {
    this.regExp = regExp;
  } else {
    this.regExp = pattrens[this.element.type];
  }
  Field.call(this, targetEl, id, name, required, className, label, labelText);
}

extend(InputField, Field);

export default Form;
