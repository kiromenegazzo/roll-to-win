import React from 'react';
import { render } from 'react-dom';

import { Game } from 'components/Game';

import './index.scss';

const App = () => <Game />;

render(<App />, document.getElementById('app'));
