import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  render() {
    let {
      type, name, value, placeholder, validationError, onChange, onBlur
    } = this.props;
    return (
      <div className="controls">
        <input
          type={type}
          name={name}
          className="input username-input"
          onBlur={e => onBlur ? onBlur(e) : null}
          onChange={e => onChange(e)}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validationError: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

export default TextInput;