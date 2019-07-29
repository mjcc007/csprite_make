import {BrowserWindow, ipcMain, IpcMain, dialog } from 'electron'
import fs from 'fs'
export default class WindowHandle {
  public curMainWindow:BrowserWindow;
  public ipcmain:IpcMain;

  constructor (mainwindow) {
    this.curMainWindow = mainwindow
    this.ipcmain = ipcMain;
  }
  AddListener ():void {
    this.ipcmain.on('close', () => {
      this.curMainWindow.close()
    })
    this.ipcmain.on('window-mini', () => {
      this.curMainWindow.minimize()
    })
    this.ipcmain.on('savesprite', (event, sprite) => {
      var imgData = sprite.imgSrc
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = Buffer.from(base64Data, 'base64');

      var spriteJson = JSON.stringify(sprite.positionJson)
      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (dir) => {
        // eslint-disable-next-line no-undef
        fs.writeFile(`${dir}/sprite.png`, dataBuffer, (err) => {
          if (err) {
            dialog.showMessageBox({
              type: 'info',
              message: '保存失败',
            })
          }
          return
        })
        fs.writeFile(`${dir}/sprite.json`, spriteJson, (err) => {
          if (!err) {
            dialog.showMessageBox({
              type: 'info',
              message: '保存成功',
            })
          }
          return
        })
      })
    })
  }
}
