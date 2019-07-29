import * as React from 'react';
import './index.css'
import { ipcRenderer }  from 'electron'

export default class MainHeaderNav extends React.Component {
  public handleclose = (e:any) => {
    console.log('close')
    ipcRenderer.send('close')
  }
  public handlemini = (e:any) => {
    ipcRenderer.send('window-mini')
  }
  render() {
    return (
      <div>
        <div id="mainheadwrap">
          <div className="headernavbutton">
            <div className="setting">
              <i  className="iconfont icon-shezhi"></i>
            </div>
            <div className="min" onClick={this.handlemini}>
              <i className="iconfont icon-zuixiaohua"></i>
            </div>
            <div className="close" onClick={this.handleclose}>
              <i className="iconfont icon-cuowuguanbishibai"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
