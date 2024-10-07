import React from 'react'
import PropTypes from 'prop-types';

const Title = ({children}) => {
  return (
    <h2 className="text-2xl font-semibold mb-4">
      {children}
    </h2>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title
