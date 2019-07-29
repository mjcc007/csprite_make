import { ipcRenderer }  from 'electron'
import { any } from 'prop-types';
import store from '../../store'

interface ImageInfo {
  name: string;
  width: number;
  height: number;
}
interface ImageObj {
  imgObj: Object,
  imgInfo: ImageInfo
}

export default class SpriteHandle {

  private m_handleList:Array<ImageObj>
  private m_LayoutList:Array<Array<ImageObj>>
  private m_canvas:any
  private m_ctx:any
  private m_SpriteImgInfo:any;
  private m_isSuccess:boolean;

  constructor () {
    this.m_handleList = []
    this.m_LayoutList = []
    this.m_SpriteImgInfo = {
      width: 255,
      height: 0,
      imgSrc: '',
      name: 'sprite',
      positionJson: {}
    }
    this.m_canvas = window.document.createElement('canvas')
    this.m_isSuccess = false
  }

  /**
   * init canvas
   * @param width
   * @param height
   */
  private initCanvas (width, height):void {
    this.m_canvas.width = width
    this.m_canvas.height = height
    this.m_ctx = this.m_canvas.getContext('2d')
  }

  public async makeSprite (images) {
    if (this.m_isSuccess) return
    // loadImage
    for (let i= 0, len = images.length; i < len; i++) {
      await this.loadImageInfo(images[i])
    }
    // layout
    this.doLayout()
    // draw sprite
    this.drawSprite()
  }

  /**
   * load image file and convert to the image obj
   * @param imgfile
   */
  private async loadImageInfo (imgfile) {
    return new Promise((resolve, reject) => {
      let img = new Image
      img.src = `data:${imgfile.type};base64,${imgfile.buffer}`
      img.onload = () => {
        let obj:ImageObj = {
          imgObj: img,
          imgInfo: {
            name: imgfile.name.split('.')[0],
            width: img.width,
            height: img.height
          }
        }
        this.m_handleList.push(obj)
        resolve(obj)
      }
      img.onerror = (err) => {
        reject(err)
      }
    })
  }


  private doLayout ():void {
    // sort by name and height
    this.m_handleList.sort((a, b) => {
      var nameA = a.imgInfo.name.toUpperCase()
      var nameB = b.imgInfo.name.toUpperCase()
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    this.m_handleList.sort((a, b) => {
      return a.imgInfo.height - b.imgInfo.height
    })
    // get all row and total height
    let rowWidth = 0
    let rowList:Array<ImageObj> = []
    for (let i = 0, len = this.m_handleList.length; i < len; i++) {
      rowWidth += this.m_handleList[i].imgInfo.width
      if (rowWidth > this.m_SpriteImgInfo.width) {
        i = i -1
        this.m_LayoutList.push(rowList)
        this.m_SpriteImgInfo.height += Math.max.apply(Math, rowList.map((o) => {return o.imgInfo.height}))
        rowWidth = 0
        rowList = []
      } else {
        rowList.push(this.m_handleList[i])
      }
      if (i === len - 1) {
        this.m_LayoutList.push(rowList)
        this.m_SpriteImgInfo.height += Math.max.apply(Math, rowList.map((o) => {return o.imgInfo.height}))
        break
      }
    }
  }

  private drawSprite () {
    this.initCanvas(this.m_SpriteImgInfo.width, this.m_SpriteImgInfo.height)
    let curHeight = 0
    for (let row = 0, totalRows = this.m_LayoutList.length; row < totalRows; row++) {
      let curWidth = 0
      for (let column = 0, totalColumns = this.m_LayoutList[row].length; column < totalColumns; column++) {
        let curImg:ImageObj = this.m_LayoutList[row][column]
        this.m_ctx.drawImage(curImg.imgObj, curWidth, curHeight)
        this.m_SpriteImgInfo.positionJson[curImg.imgInfo.name] = {
          x: curWidth,
          y: curHeight,
          width: curImg.imgInfo.width,
          height: curImg.imgInfo.height,
          pixelRatio: 1,
          sdf: false
        }
        curWidth += curImg.imgInfo.width
      }
      curHeight += Math.max.apply(Math,  this.m_LayoutList[row].map((o) => {return o.imgInfo.height}))
    }
    this.m_SpriteImgInfo.imgSrc = this.m_canvas.toDataURL("image/png")
    this.m_isSuccess = true
    store.spriteStore.setSpriteImg(this.m_SpriteImgInfo.imgSrc)
    // ipcRenderer.send('savesprite', this.m_SpriteImgInfo)
  }
  /**
   * save the sprite
   */
  public saveResult () {
    ipcRenderer.send('savesprite', this.m_SpriteImgInfo)
  }
}
