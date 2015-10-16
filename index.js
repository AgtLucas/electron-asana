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
const loginUrl = 'https://asana.com/#login';

function createMainWindow() {
  const win = new BrowserWindow({
    'title': app.getName(),
    'show': false,
    'width': 1000,
    'height': 800,
    'min-width': 400,
    'min-height': 200,
    'title-bar-style': 'hidden-inset',
    'icon': path.join(__dirname, 'media', 'Icon.png'),
    'web-preferences': {
      'node-integration': false,
      'preload': path.join(__dirname, 'browser.js'),
      'web-security': false,
      'plugins': true
    }
  });

  win.loadUrl(loginUrl);
  win.on('closed', app.quit);

  return win;
}

app.on('ready', () => {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf-8'));
    mainWindow.show();
  });

  page.on('new-window', (e, url) => {
    console.log(url);
    if (url != 'https://accounts.google.com/o/oauth2/auth') {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
});