import React from 'react';

export const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: '0.5em 1em', fontSize: '1rem' }}>
    {children}
  </button>
);
