'use strict';

var path = require('path');
var fs = require('fs');
var app = require('app');
var BrowserWindow = require('browser-window');
var shell = require('shell');
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
    'icon': path.join(__dirname, 'media', 'Icon.png'),
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
  var currentUrl = page.getUrl();

  page.on('dom-ready', () => {
    mainWindow.show();
    mainWindow.openDevTools();
  });

  page.on('new-window', (e, url) => {
    e.preventDefault();
    if (currentUrl !== 'https://asana.com/#login') {
      shell.openExternal(url);
    }
  });
});