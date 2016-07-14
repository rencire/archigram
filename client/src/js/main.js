import 'babel-polyfill';

import 'stylesheets/main';

import './global.js';

import BoardView from './views/boardView.js';
import ControlView from './views/controlView.js';

var bv = new BoardView();
new ControlView();


