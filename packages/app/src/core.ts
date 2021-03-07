/**
 * Created by Jaron Long on 2021/3/7
 */
import { checkRoute } from '@test/lib'

export class CoreA {
  public async fetch() {
    return new Promise(resolve => {
      resolve(checkRoute([], new Promise(resolve1 => {
        resolve1('')
      })))
    })
  }
}

export default new CoreA()
