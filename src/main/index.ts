import { app } from 'electron';
import { AppWindow } from './app-window';
import WindowHandle from './ipcEvents/WindowEventHandle'
import { addDevToolsExtensions } from './devToolsExtension';
export let appWindow: AppWindow | null = null;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
  app.on('second-instance', onSecondInstance);
  app.on('activate', onActivate);
  app.once('window-all-closed', app.quit);
  app.once('ready', onReady);
}

function onActivate() {
  if (appWindow === null) {
    appWindow = new AppWindow();
  }
}

function onSecondInstance() {
  if (appWindow) {
    if (appWindow.isMinimized()) appWindow.restore();

    appWindow.focus();
  }
}

function onReady() {
  appWindow = new AppWindow();
  new WindowHandle(appWindow).AddListener()
  addDevToolsExtensions('devtools');
}
