import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      showedNotification: []
    };

    this.walkOnFields = this.walkOnFields.bind(this);
    this.needToExit = this.needToExit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.createByKeyBoard = this.createByKeyBoard.bind(this);
    this.rightPad = this.rightPad.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  createByKeyBoard(e) {
    if (e.ctrlKey && e.shiftKey && e.which === 13) {
      e.preventDefault();
      let { onError, onCreate } = this.props;
      if (e.target.value === '') {
        let message = 'Це поле не може бути порожнім';
        this.showNotification('danger', message);
        onError();
        e.target.focus();
      } else {
        onCreate();
      }
    }
  }

  showNotification(type, message) {
    let { showNotification } = this.props;
    let { showedNotification } = this.state;
    if (!showedNotification.includes(message)) {
      showNotification(type, message);
      this.setState({
        showedNotification: [
          ...showedNotification,
          message
        ]
      });
      setTimeout(() => {
        if (this.updater.isMounted(this)) {
          this.setState({
            showedNotification: this.state.showedNotification.filter(note => {
              note !== message
            })
          });
        }
      }, 10000);
    } else {
      return;
    }
  }



  needToExit(e) {
    if (e.which === 27) {
      // If esc is pressed do the same that on blur event
      this.blurHandler(e);
    }
  }

  walkOnFields(e) {
    // When user press crtl + shift and any arrow, we check if exists field in
    // arrows direction, and do makeInput(id, this.props.type);
    // Also user cat preaa Tab and focus must to walk to next column or next row

    // If field is empty - do nothing
    if (e.target.value.length === 0) {
      return;
    }

    let { only } = this.props;
    let isNumberField = only === 'number';

    if (e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;
      switch (e.which) {
        case 37: {
          let productsFields = ["name", "unitOfMeasurement", "cost"];
          let columntIndex = productsFields.indexOf(type);
          if (columntIndex > 0) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(data._id, productsFields[columntIndex - 1]);
          }
          break;
        }
        case 38: {
          if (productsIndex > 0) {
            for (let i = 1; i <= productsIndex; i++) {
              let id = productsPlural[productsIndex - i]._id;
              if (editMode.productsWillRemove) {
                let isNextRemoved = editMode.productsWillRemove.includes(id);
                if (!isNextRemoved) {
                  if (isNumberField) {
                    this.rightPad(e);
                  }
                  this.props.makeInput(id, type);
                  break;
                }
              } else {
                this.props.makeInput(id, type);
                break;
              }
            }
            break;
          } else {
            break;
          }
        }
        case 39: {
          let productsFields = ["name", "unitOfMeasurement", "cost"];
          let columntIndex = productsFields.indexOf(type);
          if (columntIndex < productsFields.length - 1) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(data._id, productsFields[columntIndex + 1]);
          }
          break;
        }
        case 40: {
          if (productsPlural[productsIndex + 1]) {
            for (let i = 1; i < (productsPlural.length - productsIndex); i++) {
              let id = productsPlural[productsIndex + i]._id;
              if (editMode.productsWillRemove) {
                let isNextRemoved = editMode.productsWillRemove.includes(id);
                if (!isNextRemoved) {
                  if (isNumberField) {
                    this.rightPad(e);
                  }
                  this.props.makeInput(id, type);
                  break;
                }
              } else {
                this.props.makeInput(id, type);
                break;
              }
            }
          } else {
            break;
          }
        }
      }
    }


    // On tab pressed handler
    if (e.which === 9 && !e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;

      // Firstly try to go to the next column
      let canGoToColumn = true;
      let productsFields = ["name", "unitOfMeasurement", "cost"];
      let columntIndex = productsFields.indexOf(type);
      if (columntIndex < productsFields.length - 1) {
        if (isNumberField) {
          this.rightPad(e);
        }
        this.props.makeInput(data._id, productsFields[columntIndex + 1]);
      } else {
        canGoToColumn = false;
      }

      // If we cannot go to the next column - try to jump to the next row
      // at the first column
      if (productsPlural[productsIndex + 1] && !canGoToColumn) {
        for (let i = 1; i < (productsPlural.length - productsIndex); i++) {
          let id = productsPlural[productsIndex + i]._id;
          if (editMode.productsWillRemove) {
            let isNextRemoved = editMode.productsWillRemove.includes(id);
            if (!isNextRemoved) {
              if (isNumberField) {
                this.rightPad(e);
              }
              this.props.makeInput(id, productsFields[0]);
              return;
            }
          } else {
            this.props.makeInput(id, productsFields[0]);
            return;
          }
        }
      }
    }

    // On Shift + Tab pressed handler
    if (e.which === 9 && e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;

      // Here also try to move on columns
      let canGoToColumn = true;
      let productsFields = ["name", "unitOfMeasurement", "cost"];
      let columntIndex = productsFields.indexOf(type);
      if (columntIndex > 0) {
        if (isNumberField) {
          this.rightPad(e);
        }
        this.props.makeInput(data._id, productsFields[columntIndex - 1]);
      } else {
        canGoToColumn = false
      }

      if (productsIndex > 0 && !canGoToColumn) {
        for (let i = 1; i <= productsIndex; i++) {
          let id = productsPlural[productsIndex - i]._id;
          if (editMode.productsWillRemove) {
            let isNextRemoved = editMode.productsWillRemove.includes(id);
            if (!isNextRemoved) {
              if (isNumberField) {
                this.rightPad(e);
              }
              this.props.makeInput(id, productsFields[productsFields.length - 1]);
              return;
            }
          } else {
            this.props.makeInput(id, productsFields[productsFields.length - 1]);
            return;
          }
        }
      }
    }
  }

  changeHandler(e) {
    let {
      data, type, only, isMainField, ch, hasError, onError,
      countFrom, countTo
    } = this.props;
    let id = data._id;

    if (hasError && e.target.value.length) {
      onError(false);
    }

    switch (only) {
      case 'number': {
        let { value } = e.target;
        if (value.length) {

          let check = Number(value);
          if (isNaN(check)) {
            let message = 'Допустимі дані тільки числового типу';
            this.showNotification('warning', message);
          } else {
            let isInRange = true;

            if (countFrom !== undefined && check < countFrom) {
              let message = `Значення повинне бути більше нуля ${countFrom}`;
              this.showNotification('warning', message);
              isInRange = false;
            }

            if (countTo !== undefined && check > countTo) {
              let message = `Значення повинне бути менше ніж ${countTo}`;
              this.showNotification('warning', message);
              isInRange = false;
            }

            if (isInRange) {
              if (isMainField) {
                ch(type, value);
              } else {
                ch(id, type, value);
              }
            }
          }
        } else {
          if (isMainField) {
            ch(type, value);
          } else {
            ch(id, type, value);
          }
        }
        break;
      }
      default: {
        if (isMainField) {
          ch(type, e.target.value);
        } else {
          ch(id, type, e.target.value)
        }
      }
    }
  }

  rightPad(e) {
    // If value ending by dot or if value is integer add to end '.0' or '0'
    let { isMainField, ch, data, type } = this.props;
    let { value } = e.target;
    let needToChange = false;

    let hasDot = value.indexOf('.') !== -1;

    if (value[value.length - 1] === '.') {
      value = value + '0';
      needToChange = true;
    }
    if (Number(value) % 1 === 0 && !needToChange && !hasDot) {
      value = value + '.0';
      needToChange = true;
    }
    if (needToChange) {
      if (isMainField) {
        ch(type, value);
      } else {
        ch(data._id, type, value);
      }
    }
  }

  blurHandler(e) {
    let { onError, onBlur, only, notRequired } = this.props;
    let { value } = e.target;

    if (value.length === 0 && !notRequired) {
      let message = 'Це поле не може бути порожнім';
      this.showNotification('danger', message);
      onError();
      e.target.focus();
    } else {
      if (only === 'number') {
        this.rightPad(e);
      }
      onBlur();
    }
  }

  componentDidMount() {
    let DOMInput = findDOMNode(this);

    if (this.props.type === 'currency') {
      // If it is select get dom node 'select'
      DOMInput = DOMInput.childNodes[0];
    } else {
      // If type of input is 'text' - select it all
      DOMInput.setSelectionRange(0, DOMInput.value.length);
    }
    DOMInput.focus();
  }

  render() {
    let {
      data, type, isMainField, ch, onBlur, placeholder, className
    } = this.props;

    if (this.props.isMainField) {
      if (type === 'currency') {
        return (
          <span className="select">
            <select
              className={data.currency}
              value={data.currency}
              onChange={e => this.changeHandler(e)}
              onBlur={e => this.blurHandler(e)}
            >
              <option value="UAH" className="uah">UAH (₴)</option>
              <option value="USD" className="usd">USD ($)</option>
              <option value="EUR" className="eur">EUR (€)</option>
            </select>
          </span>
        );
      } else {
        return (
          <input
            type="text"
            className={className ? `input ${className}` : "input"}
            value={data[type]}
            placeholder={placeholder ? placeholder : null}
            onBlur={e => this.blurHandler(e)}
            onKeyDown={e => this.needToExit(e)}
            onChange={e => this.changeHandler(e)}
          />
        );
      }
    } else {
      return (
        <input
          type="text"
          className={className ? `input ${className}` : "input"}
          value={data[type]}
          placeholder={placeholder ? placeholder : null}
          onBlur={e => this.blurHandler(e)}
          onKeyDown={e => {
            this.walkOnFields(e);
            this.needToExit(e);
            this.createByKeyBoard(e);
          }}
          onChange={e => this.changeHandler(e)}
        />
      );
    }
  }
}

Input.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  ch: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  notRequired: PropTypes.bool,
  className: PropTypes.string,
  makeInput: PropTypes.func,
  only: PropTypes.string,
  countFrom: PropTypes.number,
  countTo: PropTypes.number,
  isMainField: PropTypes.bool,
  productsIndex: PropTypes.number,
  productsPlural: PropTypes.arrayOf(PropTypes.object)
}

export default Input;