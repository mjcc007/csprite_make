import React, { Component, MouseEvent} from 'react'
import { withRouter } from 'react-router'
import { Upload, Icon, Modal, Row, Col, Avatar, Input, Button } from 'antd'
import fs from 'fs';
import './index.css'
import ResultShow from './ResultShow'
const Dragger = Upload.Dragger;
// var ImageList = [];
interface IState {
  previewVisible:boolean;
  previewImage:string;
  imageList: any[];
  upLoading: boolean;
}
class CompoundBase extends Component<IState> {
  constructor(props:any, state:IState) {
    super(props, state)
  }
  public state:IState = {
    previewVisible: false,
    previewImage: '',
    imageList: [],
    upLoading: false
  }
  public handleCancel = (e:any) => {
    this.setState({
      previewVisible: false,
    })
  }
  public uploadprops:any = {
    name: 'file',
    multiple: true,
    listType:"picture-card",
    action: '',
    defaultFileList: [],
    onPreview: (file) => {
      // console.log(file)
      this.setState(
        {
          previewVisible: true,
          previewImage: file.thumbUrl,
          previewImageUid: file.uid,
          previewImgName: file.name,
        }
      )
    },
    onRemove: (file) => {
      // console.log(file)
    },
    beforeUpload: (file, fileList) => {
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          file.buffer = data.toString('base64')
          this.state.imageList.push(file)
        }
      })
      return false
    },
    onChange: (file) => {
      // console.log(file)
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={14}>
            <div className="uploadwrap">
              <Dragger {...this.uploadprops}>
                <p className="upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </div>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100px', height: '100px' }} src={this.state.previewImage} />
            </Modal>
            {/* <div className="showimglistwrap">
            </div> */}
          </Col>
          <Col span={10}>
            <ResultShow ImageList={this.state.imageList}></ResultShow>
          </Col>
        </Row>
      </div>
    )
  }
}
const Compound = withRouter(CompoundBase as any);
export default Compound
