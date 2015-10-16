'use strict';

const ipc = require('ipc');

ipc.on('log-in', () => {
  document.querySelector('.button--oath').click(function() {
    console.log('OK!');
  });
});