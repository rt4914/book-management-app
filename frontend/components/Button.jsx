import React from 'react';
import PropTypes from 'prop-types';

const ButtonTypes = {
  DEFAULT: 'DEFAULT',
  DELETE: 'DELETE',
};

const Button = ({ children, onClick, type, buttonType = ButtonTypes.DEFAULT, className = '' }) => {
  const buttonClasses = {
    [ButtonTypes.DELETE]: 'bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    [ButtonTypes.DEFAULT]: 'bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  };

  const classes = buttonClasses[buttonType] || buttonClasses[ButtonTypes.DEFAULT];

  return (
    <button type={type} onClick={onClick} className={`${classes} ${className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
  className: PropTypes.string,
};

export default Button;
export { ButtonTypes };
