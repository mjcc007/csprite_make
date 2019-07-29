import { app, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

export async function addDevToolsExtensions(devtoolsDir: string) {
  if (!app.isPackaged) {
    try {
      const devtools = fs.readdirSync(path.join(process.cwd(), devtoolsDir));
      devtools.forEach(devtool => BrowserWindow.addDevToolsExtension(path.join(process.cwd(), devtoolsDir, devtool)));
    } catch (error) {
      console.error(error);
    }
  }
}

export async function removeAllDevToolsExtensions() {
  if (!app.isPackaged) {
    try {
      const devToolsExtensions = BrowserWindow.getDevToolsExtensions() as Record<string,{ name: string; version: string }>;
      Object.keys(devToolsExtensions).forEach(key => {
        BrowserWindow.removeDevToolsExtension(devToolsExtensions[key].name);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
