import BaseInput from './baseInput'
//import TextInput from './textInput'
//import FileInput from './fileInput'
//import Radio from './radio'
//import Switch from './switch'
import Util from './util'

const BaseToggle = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    formGroup: {
      autoCreate: true
    }
  }

  const Selector = {
    LABEL: 'label'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseToggle extends BaseInput {

    constructor(element, config, inputType, outerClass) {
      super(element, Default, config)
      this.$element.after(this.config.template)
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      this.inputType = inputType
      this.outerClass = outerClass
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      return this.$element.parent().parent()
    }

    rejectWithoutRequiredStructure() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      Util.assert(this.$element.parent().prop('tagName') === 'label', `${component} parent element should be <label>.`)
      Util.assert(this.outerElement().hasClass(this.outerClass), `${component} grandparent element should have class .${this.outerClass}.`)
    }

    // ------------------------------------------------------------------------
    // protected

    addFocusListener() {
      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$formGroup.find(Selector.LABEL).hover(() => {
        this.addFormGroupFocus()
      }, () => {
        this.removeFormGroupFocus()
      })
    }

    addChangeListener() {
      this.$element.change(() => {
        this.$element.blur()
      })
    }

    // ------------------------------------------------------------------------
    // private
  }

  return BaseToggle

})(jQuery)

export default BaseToggle