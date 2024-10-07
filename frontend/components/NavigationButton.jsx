import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const NavigationButton = ({ children = 'Button', to = '#' }) => {
  return (
    <Link href={to} className='bg-primary font-medium text-white rounded px-3 py-2 hover:bg-primary-dark'>
      {children}
    </Link>
  );
};

NavigationButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

export default NavigationButton;
