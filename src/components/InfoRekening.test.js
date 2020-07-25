import React from 'react';
import ReactDOM from 'react-dom';
import InfoRekening from './InfoRekening';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InfoRekening />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  