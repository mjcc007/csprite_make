import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import store, {IStore, ISprite} from '../../../store'
import { Upload, Icon, Row, Col, Button} from 'antd'
import SpriteHandle from '../../../utils/spritehandle/SpriteHandle'
import Zmage from 'react-zmage'
import './index.css'
import { any } from 'prop-types';

const Dragger = Upload.Dragger;
export interface IShowResultPros {
  ImageList: any[],
  // sprite?: ISprite
}
export interface IShowResultState {
  // imageList:Array<any>;
  spriteHandle:SpriteHandle;
}

// @inject((store : IStore) => ({
//   sprite: store.sprite
// }))
const sprite = store.spriteStore

@observer
class CResultShow extends Component<IShowResultPros, IShowResultState> {
  constructor(props: IShowResultPros, state: IShowResultState) {
    super(props, state)
  }
  public static props:IShowResultPros = {
    ImageList: []
  }

  public state:IShowResultState = {
    spriteHandle: null
  }
  public handleExperiment = (e:any) => {
    this.state.spriteHandle.makeSprite(this.props.ImageList)
  }
  public handleSave = (e:any) => {
    this.state.spriteHandle.saveResult()
  }
  componentDidMount() {
    this.state.spriteHandle = new SpriteHandle()
  }

  render() {
    return (
      <div className="rightwrap">
      <Row>
        <Col>
          <div className="preview">
            <Zmage src={sprite.spriteResultImg} alt="生成预览" backdrop="linear-gradient(90deg, rgba(146,147,138,0.6) 0%, rgba(74,74,74,0.6) 100%)"/>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="control">
          <Button.Group>
            <Button onClick={this.handleExperiment}>
              <Icon type="experiment" />
              生成
            </Button>
            <Button onClick={this.handleSave}>
              下载
              <Icon type="download" />
            </Button>
          </Button.Group>
        </div>
      </Row>
      </div>
    )
  }
}
// const ResultShow = withRouter(CResultShow as any);
export default CResultShow

