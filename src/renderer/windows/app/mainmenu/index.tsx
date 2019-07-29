import * as React from 'react';
import { createHashHistory } from 'history'
import './index.css';
import MotionMenu from 'react-motion-menu'
import { Tooltip } from 'antd'

class MainMenu extends React.Component {
  constructor(props: any) {
    super(props)
  }
  public goToCompound = (e:any) => {
    createHashHistory().push('/app/compound')
  }
  public goToSplit = (e:any) => {
    createHashHistory().push('/app/split')
  }
  public goToGithub = (e:any) => {
  }
  render() {
    return (
      <div>
        <MotionMenu type="vertical" margin={40}>
          <div className="cbutton">
            <i className="iconfont icon-menu" />
          </div>

            <div className="cbutton" onClick={this.goToCompound}>
              <Tooltip placement="right" title='合成编辑'>
                <i className="iconfont icon-shengchengyingshewenjian" />
              </Tooltip>
            </div>

          <div className="cbutton" onClick={this.goToSplit}>
            <Tooltip placement="right" title='分解'>
              <i className="iconfont icon-fenkai" />
            </Tooltip>
          </div>
          <div className="cbutton" onClick={this.goToGithub}>
            <Tooltip placement="right" title='github'>
              <i className="iconfont icon-github" />
            </Tooltip>
          </div>
        </MotionMenu>
      </div>
    )
  }
}
export default MainMenu;
