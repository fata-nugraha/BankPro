import React from 'react';
import ReactDOM from 'react-dom';
import Transfer from './Transfer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Transfer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  