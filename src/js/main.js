'use strict';

import tabs from './module/tabs';
import slider from './module/slider';

const server = 'http://localhost:3000/';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    slider(server);
});