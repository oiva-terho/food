'use strict';

import tabs from './module/tabs';
import slider from './module/slider';
import calculator from './module/calculator';

const server = 'http://localhost:3000/';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    slider(server);
    try {
        calculator();
    } catch (error) {
        console.log('Calculator error: ', error);
    }
});