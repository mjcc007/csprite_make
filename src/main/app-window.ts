import { BrowserWindow, app } from 'electron';
import { resolve } from './utils/resolve';

export class AppWindow extends BrowserWindow {
  constructor() {
    super({
      width: 800,
      height: 480,
      frame: false,
      fullscreenable: false,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },

      backgroundColor: '#6f6f6f',
    });

    // this.webContents.openDevTools({ mode: 'detach' });

    this.loadURL(app.isPackaged ? `file://${resolve('../renderer/index.html')}` : `http://localhost:${process.env.PORT}`);

    this.once('ready-to-show', () => {
      this.show();
    });
  }
}
