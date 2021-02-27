import React from 'react';

import './Input.css';

const input = (props) => {
  let inputElement = null;
  let Invalid;

  if (props.invalid && props.shouldValidate && props.touched) {
    Invalid = 'Invalid'
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <div><input
        id={props.label}
        className={`form-control ${Invalid}`}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
        {props.invalid && props.shouldValidate && props.touched? <span className="error-message"><small>{props.errorMsg}</small></span>: null}</div>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={`form-control ${Invalid}`}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select
          className={`form-control ${Invalid}`}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={`form-control ${Invalid}`}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={'Input'}>
      <label className="form-label" htmlFor={props.label}>{props.label}</label>
      {inputElement}
    </div>
  );

};

export default input;