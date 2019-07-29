import { observable, action } from 'mobx'
import {ISprite} from '../interface'

export class SpriteModel implements ISprite {
  /**
   * 生成的雪碧图的base64字符串
   * @type {string}
   * @memberof SpriteModel
   */
  @observable
  spriteResultImg: string = ''

  /**
   * 用于生成雪碧图的小图标列表
   *
   */
  @observable
  imageList: any[]

  /** ****************** actions **************** */
  @action
  setSpriteImg = (img: string) => {
    this.spriteResultImg = img
  }

  @action
  setIconList = (icons: any[]) => {
    this.imageList = icons
  }
}

