const fs = require('fs')
const os = require('os')
const path = require('path')
const {BrowserWindow, ipcMain, shell} = require('electron')

ipcMain.on('print-to-pdf', (event) => {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // 使用默认打印参数
  win.webContents.printToPDF({}).then(data => {
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      shell.openExternal(`file://${pdfPath}`)
      event.sender.send('wrote-pdf', pdfPath)
    })
  }).catch(error=>{
    if (error) throw error
  })
})
