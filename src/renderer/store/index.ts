import { ISprite } from './interface'
import { SpriteModel } from './spritemodel'
interface IStore {
    sprite : ISprite
}

class Store {
    spriteStore:ISprite
    constructor(){
        this.spriteStore = new SpriteModel()
    }
}
export default new Store()
export {IStore, ISprite}
