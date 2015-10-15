'use strict';

var path = require('path');
var fs = require('fs');
var app = require('app');
var BrowserWindow = require('browser-window');
var shel = require('shell');
var menu = require('menu');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow;

function createMainWindow() {
  const win = new BrowserWindow({
    'title': app.getName(),
    'show': false,
    'width': 800,
    'height': 600,
    'min-width': 400,
    'min-height': 200,
    'title-bar-style': 'hidden-inset',
    'web-preferences': {
      'node-integration': false,
      'web-security': false,
      'plugins': true
    }
  });

  win.loadUrl('https://asana.com/#login');
  win.on('closed', app.quit);

  return win;
}

app.on('ready', () => {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    mainWindow.show();
  });

  page.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
});